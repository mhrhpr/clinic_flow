import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ClinicFlow", template: "%s · ClinicFlow" },
  description: "Clinic operations and patient workflow platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
