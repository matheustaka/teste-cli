import React from 'react';
import Helmet from 'react-helmet'

export default class GaSnippet {
  render() {
    return (
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-55735548-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)}
    gtag('js', new Date());
    gtag('config', 'UA-55735548-1');
    </script>
      </Helmet>
    );
  }

}