import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Fraunces } from "next/font/google";
import Head from "next/head";
import { LangProvider } from "@/lib/lang-context";
import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LangProvider>
      <Head>
        <title>Victoria Carelli — Photographer, Graphic Designer & Art Director</title>
        <meta
          name="description"
          content="Victoria Carelli — fotógrafa, diseñadora gráfica y directora de arte. Estudio independiente en Buenos Aires."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} ${fraunces.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </LangProvider>
  );
}
