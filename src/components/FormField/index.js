import React from "react";
import "./index.css";


function FormField({ label, type, name, value, onChange }) {
  const CustomTag = type === "textarea" ? "textarea" : "input";

  return (
    <div>
      <label>
        {label}:
        <CustomTag type={type} value={value} name={name} onChange={onChange} className="mt-1 input" />
      </label>
    </div>
  );
}

export default FormField;
