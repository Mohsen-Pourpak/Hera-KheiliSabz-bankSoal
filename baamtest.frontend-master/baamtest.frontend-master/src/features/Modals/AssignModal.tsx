import { Box, Button, Dialog } from "@material-ui/core";
import { SubdirectoryArrowLeft } from "@material-ui/icons";
import React, { useState } from "react";
import { NormalInput } from "../../components/Form/TextField";

export default function AssignModal({
  onClose,
  open,
  onAssign,
  onSearch,
  userSearched,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: (username: string) => void;
  onAssign: () => void;
  userSearched?: any;
}) {
  const [username, setUsername] = useState("");

  return (
    <Dialog
      maxWidth="xs"
      onBackdropClick={onClose}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box
        display="grid"
        gridTemplateRows="auto 1fr"
        p={2}
        width={400}
        height={400}
        style={{
          background: "rgb(61 130 164 / 30%)",
        }}
      >
        <Box display="flex">
          <NormalInput
            placeholder="نام کاربری را وارد کنید"
            onChange={e => setUsername(e.target.value)}
            style={{ flexGrow: 1, marginLeft: 10 }}
          />
          <Button
            disabled={Boolean(username.length < 10)}
            onClick={() => onSearch(username)}
            variant="contained"
            color="primary"
          >
            جست و جو
          </Button>
        </Box>
        {userSearched && (
          <Box display="flex" flexDirection="column">
            <Box
              mt={2}
              display="flex"
              padding={2}
              bgcolor="white"
              borderRadius={8}
            >
              <SubdirectoryArrowLeft style={{ fill: "#fe5f55" }} />
              <div
                style={{
                  color: "#3d82a4",
                  fontWeight: "bold",
                  fontSize: 18,
                  padding: "0 17px",
                  textAlign: "center",
                }}
              >
                {userSearched.fullName}
              </div>
            </Box>
            <div style={{ flexGrow: 1 }} />
            <Button
              disabled={Boolean(username.length < 10)}
              onClick={onAssign}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{
                height: 46,
                textTransform: "none",
                fontSize: "1rem",
                textAlign: "center",
                background: "#fe5f55",
                fontFamily: "Dana",
              }}
            >
              ثبت نهایی
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
