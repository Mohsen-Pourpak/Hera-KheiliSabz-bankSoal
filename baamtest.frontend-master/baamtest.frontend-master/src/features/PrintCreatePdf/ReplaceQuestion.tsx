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
// import { FilterBoxTextField } from "../../components/Form/TextField";

export default function ReplaceQuestion({
  onSubmit,
  questions,
}: {
  onSubmit: (from: number, to: number) => void;
  questions: any[];
}) {
  const [from, setFrom] = useState<number>();
  const [to, setTo] = useState<number>();
  const [error, setError] = useState<string>();

  const handleSubmit = () => {
    if (from && to && !isNaN(Number(from)) && !isNaN(Number(to))) {
      onSubmit(from - 1, to - 1);

      setFrom(undefined);
      setTo(undefined);
      setError(undefined);
    } else {
      setFrom(undefined);
      setTo(undefined);
      setError("لطفا دوباره وارد کنید");
    }
  };

  const renderMenuItem = (items: any[]) =>
    items.map((_, i) => <MenuItem value={i + 1}>{i + 1}</MenuItem>);

  return (
    <FilterBox title="جابجایی سوال">
      <Box
        height={210}
        display="flex"
        flexDirection="column"
        width="100%"
        mb="10px"
      >
        {error && <Typography>{error}</Typography>}
        <div>
          <p>سوال شماره</p>
          <Select
            style={{ marginTop: "auto" }}
            className="inputContainer"
            input={<Input disableUnderline />}
            value={from || ""}
            fullWidth
            onChange={(e: any) => setFrom(e.target.value)}
          >
            {renderMenuItem(questions)}
          </Select>
        </div>
        <div>
          <p>جابجا شود با سوال</p>
          <Select
            style={{ marginTop: "auto" }}
            className="inputContainer"
            input={<Input disableUnderline />}
            value={to || ""}
            fullWidth
            onChange={(e: any) => setTo(e.target.value)}
          >
            {renderMenuItem(questions)}
          </Select>
        </div>
        {/* <FilterBoxTextField
          title="سوال شماره"
          value={from ? String(from) : ""}
          onChange={(e: any) => setFrom(e.target.value)}
        />
        <FilterBoxTextField
          title="جابجا شود با سوال"
          value={to ? String(to) : ""}
          onChange={(e: any) => setTo(e.target.value)}
        /> */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#4F8EC6",
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
