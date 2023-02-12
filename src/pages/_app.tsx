import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import localFont from "@next/font/local";
import { Sriracha } from "@next/font/google";

const wotfard = localFont({
  src: [
    {
      path: "../assets/fonts/wotfard-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-wotfard",
});
const sriacha = Sriracha({
  variable: "--font-sriacha",
  weight: "400",
  subsets: ["latin"],
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`${wotfard.variable} ${sriacha.variable} h-full`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
