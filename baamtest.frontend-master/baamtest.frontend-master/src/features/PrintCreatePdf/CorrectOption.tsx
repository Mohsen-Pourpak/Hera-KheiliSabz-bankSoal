import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<OptionProps>`
  display: flex;
  gap: 5px;
  align-items: center;
  direction: ${({ keyOnly }) => (keyOnly ? "ltr" : "rtl")};
`;

interface OptionProps {
  isActive?: boolean;
  keyOnly?: boolean;
}

const Option = styled.span<OptionProps>`
  border: 1px solid black;
  border-radius: 5px;
  color: ${props => (props.isActive ? "#fff" : "#000")};
  background-color: ${props => (props.isActive ? "#006400" : "white")};
  width: ${props => (props.keyOnly ? "16px" : "20px")};
  height: ${props => (props.keyOnly ? "16px" : "20px")};
  line-height: ${props => (props.keyOnly ? "16px" : "20px")};
  text-align: center;
  font-size: ${props => (props.keyOnly ? "10px" : "12pt")};
`;

export default function CorrectOption({
  option,
  keyOnly,
}: {
  option: number;
  keyOnly?: boolean;
}) {
  return (
    <Wrapper keyOnly={keyOnly}>
      {[1, 2, 3, 4].map(x => (
        <Option isActive={option === x} keyOnly={keyOnly}>
          {x}
        </Option>
      ))}
    </Wrapper>
  );
}
