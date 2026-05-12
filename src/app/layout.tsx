import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "FLUXY",

  description:
    "Swipe through emotions. Discover your hidden archetype.",

  manifest: "/manifest.json",

  themeColor: "#000000",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FLUXY",
  },

  icons: {
    apple: "/icon-192.png",
    icon: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      suppressHydrationWarning
    >
      <body
        className="
          bg-black
          text-white
          antialiased
          min-h-screen
          overflow-x-hidden
          selection:bg-white
          selection:text-black
          overscroll-none
        "
        style={{
          paddingTop:
            "env(safe-area-inset-top)",
          paddingBottom:
            "env(safe-area-inset-bottom)",
          paddingLeft:
            "env(safe-area-inset-left)",
          paddingRight:
            "env(safe-area-inset-right)",
        }}
      >
        {children}
      </body>
    </html>
  );
}