import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Urbanist, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HQSOFT – Nền Tảng Quản Trị Phân Phối & Bán Lẻ Hàng Đầu",
  description:
    "Số hóa toàn diện chuỗi phân phối từ nhà sản xuất đến điểm bán. Giải pháp eSales SFA, nRetail, 1CX, Executive 360 cho doanh nghiệp B2B.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${plusJakartaSans.variable} ${urbanist.variable} ${inter.variable} h-full antialiased`}>
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
