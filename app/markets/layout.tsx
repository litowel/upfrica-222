import { Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#050505] text-white min-h-screen`}>
      <Toaster position="top-right" />
      {children}
    </div>
  );
}
