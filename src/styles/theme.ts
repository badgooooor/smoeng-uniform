import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ef4a3d",
      main: "#b50014",
      dark: "#7d0000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#cccccc",
      contrastText: "#000000"
    }
  },
})

export default theme;
