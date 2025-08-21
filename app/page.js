import Hero from "../components/Hero";
import Trending from "../components/Trending";
import CanvasStory from "../components/CanvasStory";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <Trending />
      <CanvasStory />
    </main>
  );
}
