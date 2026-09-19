import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "کلینیک آیدا · ClinicFlow", template: "%s · کلینیک آیدا" },
  description: "سامانه مدیریت و جریان عملیاتی کلینیک آیدا",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
