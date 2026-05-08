import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "我這版",

  description:
    "把你現在的狀態，變成一個可以被看到的版本",

  manifest: "/manifest.json",

  themeColor: "#000000",

  icons: {
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh-Hant">

      <body>
        {children}
      </body>

    </html>
  );
}