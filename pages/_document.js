import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta name="viewport" content="inital-scale=1.0,maximum-scale=1.0,user-scalable=no;" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
