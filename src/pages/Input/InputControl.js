// Import React library to use React components
import React from "react";

// Import the CSS module for styling the component
import styles from "./InputControl.module.css";

// Define the functional component InputControl
function InputControl(props) {
  // Props:
  // - label: An optional label for the input element
  // - Other props: Any other props passed to this component will be spread onto the input element

  return (
    // Render a div element with a CSS class from the CSS module
    <div className={styles.container}>
      {/* If the 'label' prop is provided, render a label element with the value of the 'label' prop */}
      {props.label && <label>{props.label}</label>}
      
      {/* Render an input element with all the props passed to this component */}
      <input type="text" {...props} />
    </div>
  );
}

// Export the InputControl component to be used in other parts of the application
export default InputControl;
