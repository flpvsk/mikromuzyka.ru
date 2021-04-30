import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
