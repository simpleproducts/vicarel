import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import Head from "next/head";
import { ThemeProvider } from "@/lib/theme-context";
import { CursorProvider } from "@/lib/cursor-context";
import Shell from "@/components/Shell";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Victoria Carelli — Photographer, Graphic Designer & Art Director</title>
        <meta
          name="description"
          content="Victoria Carelli — fotógrafa, diseñadora gráfica y directora de arte. Estudio independiente en Buenos Aires."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${grotesk.variable} ${instrument.variable} font-sans`}>
        <CursorProvider>
          <Shell>
            <Component {...pageProps} />
          </Shell>
        </CursorProvider>
      </div>
    </ThemeProvider>
  );
}
