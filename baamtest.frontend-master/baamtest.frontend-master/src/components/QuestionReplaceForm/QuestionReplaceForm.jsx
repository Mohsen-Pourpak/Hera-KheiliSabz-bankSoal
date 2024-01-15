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

export default function ReplaceQuestion({onSubmit, questions}) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [error, setError] = useState();

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
            onChange={(e) => setFrom(e.target.value)}
          >
            {
							questions.map((_, i) => {
								return <MenuItem value={i + 1}>{i + 1}</MenuItem>
							})
						}
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
            onChange={(e) => setTo(e.target.value)}
          >
            {
							questions.map((_, i) => {
								return <MenuItem value={i + 1}>{i + 1}</MenuItem>
							})
						}
          </Select>
        </div>
        {/* <FilterBoxTextField
          title="سوال شماره"
          value={from ? String(from) : ""}
          onChange={(e) => setFrom(e.target.value)}
        />
        <FilterBoxTextField
          title="جابجا شود با سوال"
          value={to ? String(to) : ""}
          onChange={(e) => setTo(e.target.value)}
        /> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
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
