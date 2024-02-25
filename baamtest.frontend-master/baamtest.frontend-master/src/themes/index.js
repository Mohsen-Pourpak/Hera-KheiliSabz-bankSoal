import defaultTheme from "./default";

import { createMuiTheme } from "@material-ui/core";

const overrides = {
  typography: {
    background: {
      default: "#000",
    },
    h1: {
      fontSize: "1.3rem",
    },
    h2: {
      fontSize: "1.1rem",
    },
    h3: {
      fontSize: "1rem",
    },
    h4: {
      fontSize: "0.9rem",
    },
    h5: {
      fontSize: "0.8rem",
    },
    h6: {
      fontSize: "0.750rem",
    },
  },
};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};
