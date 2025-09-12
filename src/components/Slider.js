/**
 * A slider component to adjust a numerical setting within a range.
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the slider.
 * @param {number} props.min - The minimum value of the range.
 * @param {number} props.max - The maximum value of the range.
 * @param {number} [props.step=1] - The step increment.
 * @param {number} props.value - The current value.
 * @param {function} props.onChange - Callback function when the value changes.
 * @param {string} [props.className] - Optional CSS class for the container.
 */
const Slider = ({ label, min, max, step = 1, value, onChange, className }) => {
  return (
    <div className={`vertical-slider ${className || ''}`}>
      <label htmlFor={`${label}-slider`}>
        {label}: {value}
      </label>
      <input
        type="range"
        id={`${label}-slider`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Slider;