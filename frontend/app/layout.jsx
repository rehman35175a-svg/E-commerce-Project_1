import Script from "next/script";
import { headers } from "next/headers";
import Header from "./components/commonLayouts/header";
import Footer from "./components/commonLayouts/footer";

export const metadata = {
  title: "GreatKart | One of the Biggest Online Shopping Platform",
  description: "One of the Biggest Online Shopping Platform",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  shrinkToFit: "no",
};

const HIDDEN_ROUTES = ["/signin", "/register"];

export default async  function RootLayout({ children }) {
  const headersList = await  headers();
  const pathname = headersList.get("x-pathname") || "";

  const hideHeaderFooter = HIDDEN_ROUTES.includes(pathname);

  return (
    <html lang="en">
      <head>
        <Script src="/js/jquery-2.0.0.min.js" strategy="afterInteractive" />
        <Script src="/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/script.js" strategy="afterInteractive" />
        <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="/fonts/fontawesome/css/all.min.css" type="text/css" rel="stylesheet" />
        <link href="/css/ui.css" rel="stylesheet" type="text/css" />
        <link href="/css/responsive.css" rel="stylesheet" media="only screen and (max-width: 1200px)" />
      </head>
      <body>
        {!hideHeaderFooter && <Header />}

        {children}

        {!hideHeaderFooter && <Footer />}
      </body>
    </html>
  );
}