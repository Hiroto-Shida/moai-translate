import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={mPlusRounded1c.className}>
      <Component {...pageProps} />
    </main>
  );
}
