import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background: #f7f8fa;
    margin: 0;
    padding: 0;
    color: #222;
  }
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle; 