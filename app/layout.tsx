import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SavePoint",
  description: "Save links and text across devices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={false}
            toastOptions={{
              className: "bg-primary text-primary-foreground",
              style: {
                backgroundColor: "#1e293b",
                color: "#fff",
              },
            }}
          />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
