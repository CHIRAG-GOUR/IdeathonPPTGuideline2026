import type { Metadata } from "next";
import Deck from "@/components/masterclass/Deck";

export const metadata: Metadata = {
  title: "AI Masterclass – Level 2 | SkilliZee",
  description: "Think. Build. Brand. Pitch. Use AI as a team member, not as the team.",
};

export default function AIMasterclassPage() {
  return <Deck homeHref="/" />;
}
