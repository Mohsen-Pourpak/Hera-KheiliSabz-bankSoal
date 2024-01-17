import React from "react";
import { InputBase } from "@material-ui/core";
import styled from "styled-components";

interface TextFieldProps {
  value?: string;
  placeholder?: string;
  type?: string;
  faNum?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
  onChange: (e: object) => void;
  onKeyPress?: (e: object) => void;

  disabled?: boolean;
  onBlur?: (e: any) => void;
  max?: number;
}

export const FilterBoxTextField = ({
  onChange,
  title,
  placeholder,
  value,
  disabled,
  onBlur,
}: {
  title: string;
  placeholder?: string;
  value?: string;
  onChange: (e: any) => void;
  disabled?: boolean;
  onBlur?: (e: any) => void;
}) => {
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        marginTop: 20,
        backgroundColor: "#DEF6FF",
        color: "#000",
        minHeight: 45,
        borderRadius: 25,
        alignItems: "normal",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          color: "#000",
          alignItems: "center",
          padding: "0 15px",
          borderRadius: 25,
          justifyContent: "center",
          backgroundColor: "#7AD3FF",
        }}
      >
        {title}
      </div>
      <div style={{ flex: 1, alignItems: "center", width: "100%" }}>
        <TextField
          placeholder={placeholder}
          value={value}
          faNum={true}
          style={{
            height: 40,
            background: "transparent",
            paddingTop: 0,
            textAlign: "center",
          }}
          onChange={onChange}
          disabled={disabled}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

const TextField = ({
  value,
  onChange,
  placeholder,
  type,
  style,
  faNum,
  onKeyPress,
  maxLength,
  disabled,
  onBlur,
  max,
}: TextFieldProps) => {
  return (
    <input
      value={value}
      type={type}
      maxLength={maxLength || 500}
      className={faNum ? "danaFaNum" : ""}
      autoComplete="new-password"
      style={{
        ...style,
        width: "calc(100% - 10px)",
        border: "none",
        outline: "none",
        padding: "3px 5px 0",
        fontSize: 16,
      }}
      placeholder={placeholder}
      onChange={el => onChange(el)}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      disabled={disabled}
      max={max}
    />
  );
};

export default TextField;

export function CustomTextField({
  label,
  value,
  onChange,
  disabled,
}: {
  label?: string;
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
        htmlFor="my-input"
        style={{
          padding: "4px 8px",
          background: "#7AD3FF",
          borderRadius: 16,
          color: "white",
          display: "flex",
          alignItems: "center",
          width: 150,
        }}
      >
        {label}
      </label>
      <NormalInput
        id="my-input"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        style={{ flex: 1 }}
        inputProps={{ style: { textAlign: "center", paddingLeft: 22 } }}
        disabled={disabled}
      />
    </div>
  );
}

export const NormalInput = styled(InputBase)`
  background: white;
  padding: 0 1em;
`;

export const NumberInput = styled.input`
  width: calc(100% - 10px);
  border: none;
  outline: none;
  padding: 3px 5px 0;
  font-size: 16px;
`;
