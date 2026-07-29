"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Type, Maximize, Minimize, ExternalLink } from "lucide-react";

interface Cue {
  start: number;
  end: number;
  text: string;
}

export default function SceneVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const timeDisplayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const cuesRef = useRef<Cue[]>([]);
  const playIntentRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Parse VTT time to seconds
  const parseTime = (timeStr: string) => {
    const parts = timeStr.trim().split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseFloat(parts[2].replace(',', '.'));
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  // Fetch and parse captions
  useEffect(() => {
    fetch('/ideathon.vtt')
      .then(res => res.text())
      .then(text => {
        const parsedCues: Cue[] = [];
        const blocks = text.split(/\n\s*\n/);

        blocks.forEach(block => {
          const lines = block.split('\n').map(l => l.trim()).filter(l => l);
          const timeLine = lines.find(l => l.includes('-->'));

          if (timeLine) {
            const [startStr, endStr] = timeLine.split('-->');
            const start = parseTime(startStr);
            const end = parseTime(endStr);

            const textIndex = lines.indexOf(timeLine) + 1;
            const textContent = lines.slice(textIndex).join(' ');

            if (textContent) {
              parsedCues.push({ start, end, text: textContent });
            }
          }
        });
        cuesRef.current = parsedCues;
      })
      .catch(err => console.error("Failed to load captions:", err));
  }, []);

  // Format time
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Safe play that handles the promise properly
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    playIntentRef.current = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently handle - browser blocked or interrupted
        playIntentRef.current = false;
      });
    }
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      safePlay();
    } else {
      playIntentRef.current = false;
      video.pause();
    }
  }, [safePlay]);

  // Update progress bar & captions via refs (NO state updates = NO re-renders)
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const total = video.duration;

    // Update progress bar directly via DOM
    if (progressRef.current && !isNaN(total) && total > 0) {
      progressRef.current.value = String((current / total) * 100);
    }

    // Update time display directly via DOM
    if (timeDisplayRef.current) {
      timeDisplayRef.current.textContent = formatTime(current);
    }

    // Update captions directly via DOM
    if (captionRef.current) {
      const activeCue = cuesRef.current.find(c => current >= c.start && current <= c.end);
      captionRef.current.textContent = activeCue ? activeCue.text : "";
      captionRef.current.style.display = activeCue ? "inline" : "none";
    }
  }, []);

  // Handle video loaded metadata
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  }, []);

  // Seek video
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const seekTime = (Number(e.target.value) / 100) * video.duration;
    video.currentTime = seekTime;
  }, []);

  // Auto-resume when browser stalls or waits for data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleWaiting = () => {
      // Video is buffering - don't change state, just wait
    };

    const handleCanPlay = () => {
      // If we intended to play and the video is paused, resume
      if (playIntentRef.current && video.paused) {
        safePlay();
      }
    };

    const handleStalled = () => {
      // Network stall - the video will auto-resume when data arrives
    };

    const handleError = (e: Event) => {
      console.warn("Video error:", e);
    };

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("error", handleError);
    };
  }, [safePlay]);

  // Block wheel events from bubbling up (prevents accidental slide navigation)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blockWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    container.addEventListener("wheel", blockWheel, { passive: true });
    return () => container.removeEventListener("wheel", blockWheel);
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  }, [isMuted, volume]);

  // Change volume
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle Spacebar to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && document.activeElement?.tagName !== "BUTTON" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        e.stopPropagation();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [togglePlay]);

  return (
    <SceneWrapper>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black text-blue-700 uppercase tracking-widest drop-shadow-sm" style={{ WebkitTextStroke: '1.5px #000' }}>
            How to Use &amp; Submit to Portal
          </h2>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black relative group flex flex-col"
        >
          <video
            ref={videoRef}
            className="w-full aspect-video object-contain bg-black cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => { setIsPlaying(true); playIntentRef.current = true; }}
            onPause={() => { setIsPlaying(false); }}
            onEnded={() => { setIsPlaying(false); playIntentRef.current = false; }}
            playsInline
            preload="auto"
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/skillizee-io.firebasestorage.app/o/Video%2Fwalkthrough_with_voiceover.mp4?alt=media&token=b5bec032-2e1a-4182-acef-d94f26667491"
              type="video/mp4"
            />
          </video>

          {/* Custom Captions Overlay */}
          {captionsEnabled && (
            <div className="absolute bottom-24 left-0 right-0 flex justify-center px-8 pointer-events-none z-10 transition-all">
              <span
                ref={captionRef}
                className="bg-black/70 text-white px-4 py-2 rounded-lg text-lg md:text-xl font-medium tracking-wide text-center drop-shadow-md backdrop-blur-sm"
                style={{ display: "none" }}
              />
            </div>
          )}

          {/* Custom Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 z-20 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>

            {/* Seek Bar */}
            <div className="w-full flex items-center mb-3">
              <input
                ref={progressRef}
                type="range"
                min="0"
                max="100"
                defaultValue="0"
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-white">

              <div className="flex items-center gap-5">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="hover:text-blue-400 transition-colors focus:outline-none"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2 group/volume">
                  <button
                    onClick={toggleMute}
                    className="hover:text-blue-400 transition-colors focus:outline-none"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all duration-300 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Timestamps */}
                <div className="text-sm font-semibold tracking-wider opacity-90 font-mono">
                  <span ref={timeDisplayRef}>0:00</span> <span className="opacity-50">/</span> {duration}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Captions Toggle */}
                <button
                  onClick={() => setCaptionsEnabled(!captionsEnabled)}
                  className={`flex items-center gap-1.5 font-bold text-sm px-2.5 py-1.5 rounded-lg transition-all focus:outline-none ${captionsEnabled ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-white/20 text-white/70 hover:bg-white/30'}`}
                  title={captionsEnabled ? "Turn off Captions" : "Turn on Captions"}
                >
                  <Type size={16} />
                  <span>CC</span>
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-blue-400 transition-colors focus:outline-none ml-2"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Redirect Button to Student Portal */}
        <motion.a
          href="https://skillizee.io/ccws/student"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-3 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-blue-500/30 border border-blue-400/30 transition-all duration-300 group cursor-pointer z-30"
        >
          <span>Submit to Student Portal</span>
          <ExternalLink size={22} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.a>
      </div>
    </SceneWrapper>
  );
}
