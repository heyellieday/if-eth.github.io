import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import stylesheet from "../styles/application.scss";
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body>
          <App>
            <Header>
            <Title>
              ⧫ if-eth
            </Title>
            </Header>
            <Main />
          </App>
          <NextScript />
        </body>
      </html>
    );
  }
}
