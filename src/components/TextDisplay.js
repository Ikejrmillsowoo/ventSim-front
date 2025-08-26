import React from 'react';

/**
 * A simple component to display text.
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} [props.className] - Optional CSS class for styling.
 */
const TextDisplay = ({ text, className }) => {
  return (
    <p className={className}>
      {text}
    </p>
  );
};

export default TextDisplay;