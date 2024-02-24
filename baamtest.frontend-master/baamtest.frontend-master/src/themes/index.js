import defaultTheme from "./default";

import { createMuiTheme } from "@material-ui/core";

const overrides = {
  typography: {
    background: {
      default: "#000",
    },
    h1: {
      fontSize: "1rem",
    },
    h2: {
      fontSize: "0.5rem",
    },
    h3: {
      fontSize: "0.3rem",
    },
    h4: {
      fontSize: "0.275rem",
    },
    h5: {
      fontSize: "0.250rem",
    },
    h6: {
      fontSize: "0.225rem",
    },
  },
};

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};
