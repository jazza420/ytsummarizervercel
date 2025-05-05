import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { cn } from '@/lib/utils'
import "./globals2.css";

const inter = Inter({ subsets: ["latin"] });

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
}) 



export const metadata: Metadata = {
  title: "ShortGenerator",
  description: "Generate shorts with AI"
  // icons: Metadata.Icon()
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        {/* <body className={inter.className}>{children}</body> */}
        <body 
          className={cn(
            'antialiased',
            fontHeading.variable,
            fontBody.variable
          )}
        >
        {children}
        </body>
    </html>
  );
}
