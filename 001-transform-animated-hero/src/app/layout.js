import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope-VariableFont_wght.ttf",
  display: "swap",
});

export const metadata = {
  title: "Transform",
  description: "Transform Animated Hero Section",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-white uppercase text-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
