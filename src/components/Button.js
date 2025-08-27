import React from 'react';

/**
 * A reusable button component.
 * @param {object} props - The component props.
 * @param {string} props.children - The button label or content.
 * @param {function} props.onClick - Function to call on button click.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {boolean} [props.disabled] - Optional disabled state.
 */
const Button = ({ children, onClick, className, disabled }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);

export default Button;