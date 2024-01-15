import React from "react";

interface TextFieldProps {
  value?: string;
  placeholder?: string;
  rows?: number;
  faNum?: boolean;
  style?: React.CSSProperties;
  onChange: (e: object) => void;
  onKeyPress: (e: object) => void;
  resize?: boolean;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  rows,
  style,
  faNum,
  onKeyPress,
  resize,
}: TextFieldProps) => {
  return (
    <textarea
      value={value}
      rows={rows}
      className={faNum ? "danaFaNum" : ""}
      autoComplete="new-password"
      style={{
        ...style,
        width: "calc(100% - 10px)",
        border: "none",
        outline: "none",
        padding: "3px 5px 0",
        fontSize: 16,
        resize: resize ? "block" : "none",
      }}
      placeholder={placeholder}
      onChange={el => onChange(el)}
      onKeyPress={onKeyPress}
    />
  );
};

export default Textarea;
