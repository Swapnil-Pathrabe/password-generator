const Checkbox = ({ title, onChange, checked }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox;
