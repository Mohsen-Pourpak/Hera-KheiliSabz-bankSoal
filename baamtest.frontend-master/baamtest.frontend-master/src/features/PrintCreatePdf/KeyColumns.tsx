import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";

import FilterBox from "../../components/FilterBox";
import { NormalInput } from "../../components/Form/TextField";

export default function QuestionHeader({
  disabled,
  onSubmit,
}: {
  disabled?: boolean;
  onSubmit: (value: number) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number>(4);
  const [error, setError] = useState<string>();

  const handleSubmit = () => {
    onSubmit(Number(selectedOption));
  };

  return (
    <FilterBox title="تعداد ستون های کلید">
      <Box display="flex" flexDirection="column" width="100%" mb="10px">
        {error && <Typography>{error}</Typography>}
        <div>
          <p>کلیدها چند ستونی باشند؟</p>
          <Select
            style={{ marginTop: "auto" }}
            className="inputContainer"
            input={<Input disableUnderline />}
            value={selectedOption}
            fullWidth
            onChange={(e: any) => {
              setSelectedOption(e.target.value);
            }}
            disabled={disabled}
          >
            {["3", "4", "5", "6"].map((q, i) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button
          disabled={!selectedOption || disabled}
          variant="contained"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#228B22",
            color: "#000",
            marginTop: "auto",
            borderRadius: 50,
            height: 40,
            boxShadow: "none",
          }}
        >
          اعمال
        </Button>
      </Box>
    </FilterBox>
  );
}
