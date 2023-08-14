// Import necessary dependencies from 'styled-components', 'devices', and 'theme'
import { createGlobalStyle } from 'styled-components';
import devices from './devices'; // Import the 'devices' object for media queries
import theme from './theme'; // Import the 'theme' object for consistent styles

// Create a global style using 'createGlobalStyle' from 'styled-components'
const GlobalStyle = createGlobalStyle`
  /* Apply styles to all elements */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background ease 0.2s;
    font-family: ${theme.fonts.secondary}; /* Set the secondary font from the 'theme' object */
  }

  /* Set the viewport width for Internet Explorer */
  @-ms-viewport {
    width: device-width;
  }

  /* Apply styles to h1 elements */
  h1 {
    margin: 0;
  }

  /* Apply styles to textarea, button, and input elements */
  textarea,
  button,
  input {
    background-color: transparent;
    border: none;
  }

  /* Apply styles to anchor elements (links) */
  a {
    font-weight: ${theme.fonts.weight.medium}; /* Set the medium font weight from the 'theme' object */
    text-decoration: none;
  }

  /* Apply styles to button elements */
  button {
    box-shadow: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    -webkit-box-shadow: none;
    /* Add transition effect to button hover */
    transition: all ease 0.4s;
    &:hover {
      ${theme.configs.hover} /* Apply the hover configuration from the 'theme' object */
    }
  }

  /* Apply styles to unordered list elements */
  ul {
    list-style: none;
  }

  /* Customize the appearance of the scrollbar */
  ::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  /* Customize the appearance of the scrollbar on tablets */
  *::-webkit-scrollbar {
    width: 0.4rem;
    @media ${devices.tablet} {
      width: 0.2rem;
    }
  }

  /* Apply styles to elements with the 'container' class */
  .container {
    margin-top: 110px;
  }
`;

// Export the GlobalStyle component to use it throughout the application
export default GlobalStyle;
