import '../styles/globals.css';
import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <script 
          src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
          type="text/javascript" 
          charSet="UTF-8" 
          data-domain-script='09087120-0ab7-4372-87e7-a71caa5182b4'/> 
        <script type="text/javascript"> 
          function OptanonWrapper() { } 
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`}}></script>
      </Head>
      <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      <Component {...pageProps} />
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default MyApp;
