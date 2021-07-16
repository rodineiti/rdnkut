import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "../src/themes/themeMain";
import { AlurakutStyles } from "../src/lib/AlurakutCommons";
import { UserContextProvider } from "../src/contexts/UserContext";
import "../src/services/firebase";

import "../node_modules/react-image-gallery/styles/css/image-gallery.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body {
    background: #CDF4EC;
    font-family: sans-serif;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width:100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}
