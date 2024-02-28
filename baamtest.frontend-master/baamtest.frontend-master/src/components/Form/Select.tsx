import { Input, Select } from "@material-ui/core";
import React from "react";

export default function CustomSelect({
  label,
  children,
  value,
  onChange,
  disabled,
}: {
  label?: string;
  children?: React.ReactNode;
  value?: any;
  onChange?: (v: any) => void;
  disabled?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "2em",
        display: "flex",
        alignItems: "stretch",
        margin: "5px 0",
      }}
    >
      <label
        htmlFor="my-select"
        style={{
          padding: "4px 8px",
          background: "#CBF2CF",
          borderRadius: 16,
          color: "#000",
          display: "flex",
          alignItems: "center",
          width: 150,
        }}
      >
        {label}
      </label>
      <Select
        id="my-select"
        input={<Input disableUnderline />}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        style={{ flex: 1 }}
        disabled={disabled}
      >
        {children}
      </Select>
    </div>
  );
}
