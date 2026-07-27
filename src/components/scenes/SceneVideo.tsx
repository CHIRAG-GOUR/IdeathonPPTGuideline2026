"use client";

import { motion } from "framer-motion";
import SceneWrapper from "../SceneWrapper";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Type, Maximize, Minimize } from "lucide-react";

interface Cue {
  start: number;
  end: number;
  text: string;
}

export default function SceneVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [cues, setCues] = useState<Cue[]>([]);

  // Parse VTT time to seconds
  const parseTime = (timeStr: string) => {
    const parts = timeStr.trim().split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseFloat(parts[2].replace(',', '.')); // Handle both . and , formats just in case
      return hours * 3600 + minutes * 60 + seconds;
    }
    return 0;
  };

  // Fetch and parse captions manually to guarantee they display over custom controls
  useEffect(() => {
    fetch('/ideathon.vtt')
      .then(res => res.text())
      .then(text => {
        const parsedCues: Cue[] = [];
        // Split by double newline to get blocks
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
        setCues(parsedCues);
      })
      .catch(err => console.error("Failed to load captions:", err));
  }, []);

  // Format time (seconds to M:SS)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update progress bar & current time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (!isNaN(total) && total > 0) {
        setProgress((current / total) * 100);
      }
      setCurrentTime(formatTime(current));
      setCurrentTimeSec(current);
    }
  };

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  // Seek video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (Number(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
      setCurrentTimeSec(seekTime);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted && volume === 0) {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  // Change volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Determine active caption
  const activeCue = cues.find(c => currentTimeSec >= c.start && currentTimeSec <= c.end);
  const activeCaption = activeCue ? activeCue.text : "";

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
            onEnded={() => setIsPlaying(false)}
            playsInline
          >
            <source 
              src="https://firebasestorage.googleapis.com/v0/b/skillizee-io.firebasestorage.app/o/Video%2Fwalkthrough_with_voiceover.mp4?alt=media&token=066815b9-5ac2-4fd3-8040-e24d7c8d0ae7" 
              type="video/mp4" 
            />
            {/* Native track removed as we are rendering custom captions to guarantee visibility */}
          </video>

          {/* Custom Captions Overlay */}
          {captionsEnabled && activeCaption && (
            <div className="absolute bottom-24 left-0 right-0 flex justify-center px-8 pointer-events-none z-10 transition-all">
              <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-lg md:text-xl font-medium tracking-wide text-center drop-shadow-md backdrop-blur-sm">
                {activeCaption}
              </span>
            </div>
          )}

          {/* Custom Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 z-20 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            
            {/* Seek Bar */}
            <div className="w-full flex items-center mb-3">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress}
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
                  {currentTime} <span className="opacity-50">/</span> {duration}
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
      </div>
    </SceneWrapper>
  );
}
