import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,600&display=swap');
    
    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    html {
        font-size: 62.5%;
    }
    
    body {
        padding-left: 100px;
        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
        margin: 0;
    }
`;

export default GlobalStyle;