import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
// import AuthInitializer from "@/components/auth/AuthInitializer";
import { ConfirmProvider } from '@/components/providers/confirm-provider';
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dubai Finance | Executive Dashboard",
  description: "Premium Wealth Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storage = localStorage.getItem('theme-storage');
                  const theme = storage ? JSON.parse(storage).state.theme : 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        {/* <AuthInitializer> */}
        <ThemeProvider>
          <ConfirmProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                duration: 3000,
              }}
            />
          </ConfirmProvider>
        </ThemeProvider>
        {/* </AuthInitializer> */}
      </body>
    </html>
  );
}
