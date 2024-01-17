import tinycolor from "tinycolor2";

const primary = "#228B22";
const secondary = "#FF0000";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";
const inherit = "#fff";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
  direction: "rtl",
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate - 5)
        .toHexString(),
      contrastText: "#FFFFFF",
    },
    inherit: {
      main: inherit,
      light: tinycolor(inherit)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(inherit)
        .darken(darkenRate)
        .toHexString(),
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      // primary: "#4A4A4A",
      primary: "#000000",
      secondary: "#6E6E6E",
      hint: "#4d4f5c",
    },
    background: {
      default: "#f6f6f6",
      light: "#eff5fa",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#FFD700",
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#eff5fa !important",
          "&:focus": {
            backgroundColor: "#eff5fa",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#eff5fa",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
      },
      head: {
        fontSize: "0.95rem",
        textAlign: "right",
        fontFamily: "Dana",
      },
      body: {
        fontSize: "0.95rem",
        textAlign: "right",
        fontFamily: "Dana",
      },
    },
    MuiTypography: {
      root: {
        fontFamily: "Dana !important",
      },
    },
    MuiListItemText: {
      root: {
        textAlign: "right",
      },
    },
    MUIDataTable: {
      responsiveStacked: {
        overflowX: "hidden !important",
      },
    },
  },
};
