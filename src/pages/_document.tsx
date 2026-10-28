import { Html, Head, Main, NextScript } from "next/document";

// Applies the saved theme before first paint so there is no flash of the default one.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('vc-theme');if(t==='2'||t==='3')d.dataset.theme=t}catch(e){}})()`;

export default function Document() {
  return (
    <Html lang="es" data-theme="1">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
