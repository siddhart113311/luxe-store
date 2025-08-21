import { Inter, Spectral } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Luxe Store — Premium Editorial Fashion",
  description: "Modern luxury e‑commerce for premium apparel with cinematic interactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spectral.variable} antialiased bg-background text-foreground`}>
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
