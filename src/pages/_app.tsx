import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import localFont from "@next/font/local";
import { Sriracha } from "@next/font/google";

import React from "react";
import ToastProvider from "../components/ToastProvider";

const bariol = localFont({
  src: [
    {
      path: "../assets/fonts/bariol/bariol_thin-webfont.woff2",
      weight: "100",
      style: "thin",
    },
    {
      path: "../assets/fonts/bariol/bariol_thin_italic-webfont.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/bariol/bariol_light-webfont.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "../assets/fonts/bariol/bariol_light_italic-webfont.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/bariol/bariol_regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/bariol/bariol_regular_italic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/bariol/bariol_bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/bariol/bariol_bold_italic-webfont.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-bariol",
});
const sriacha = Sriracha({
  variable: "--font-sriacha",
  weight: "400",
  subsets: ["latin"],
});
const [bariolFont, barioFallback] = bariol.style.fontFamily.split(",");
const [sriachaFont, sriachaFallback] = sriacha.style.fontFamily.split(",");

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-bariol: ${bariolFont}, ${barioFallback};
          --font-sriacha: ${sriachaFont}, ${sriachaFont};
        }
        html {
          font-family: var(--font-bariol);
        }
      `}</style>
      <SessionProvider session={session}>
        <ToastProvider>
          <main className={`${sriacha.variable}`}>
            <Component {...pageProps} />
          </main>
        </ToastProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
