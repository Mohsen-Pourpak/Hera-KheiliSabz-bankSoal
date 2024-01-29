import React, { useEffect, useState } from "react";
import { Box, Button, Dialog } from "@material-ui/core";
import styled from "styled-components";

import ImageSimple from "../../images/test/kheilisabz1-edited.jpg";
import ImageFantasy from "../../images/test/kheilisabz2-edited.jpg";
import ImageNastaliq from "../../images/test/kheilisabz3-edited.jpg";


interface PrintBackgroundProps {
  active: boolean;
}
const PrintBackground = styled.img<PrintBackgroundProps>`
  width: 150px;
  padding: 8px;
  border-radius: 16px;
  cursor: pointer;
  transition: all ease 300ms;
  border: ${({ active }) => (active ? "2px solid #fe5f55" : "none")};
`;

export default function ChangeBackgroundModal({
  onClose,
  open,
  onSubmit,
  prevSelected,
}: {
  open: boolean;
  onClose: () => void;
  prevSelected: number;
  onSubmit: (selected: number) => void;
}) {
  const [selected, setSelected] = useState(prevSelected);

  useEffect(() => {
    setSelected(prevSelected);
  }, [prevSelected]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box textAlign="center">
        <Box m={2} p={2} display="flex">
          <PrintBackground
            src={ImageSimple}
            active={selected === 0}
            onClick={() => setSelected(0)}
            alt="Simple"
          />
          <PrintBackground
            src={ImageFantasy}
            active={selected === 1}
            onClick={() => setSelected(1)}
            alt="Fantasy"
          />
          <PrintBackground
            src={ImageNastaliq}
            active={selected === 2}
            onClick={() => setSelected(2)}
            alt="Nastaliq"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "1em 0" }}
          onClick={() => onSubmit(selected)}
        >
          ثبت
        </Button>
      </Box>
    </Dialog>
  );
}
