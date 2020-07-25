import * as React from "react";
import Loader from "react-loader-spinner";
import { Container, Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import NavBar from "../components/NavBar";
import { observer } from "mobx-react";
import { overlay_store } from "../stores/overlay";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100vw",
  },
  body: {
    padding: "20px 10px",
  },
}));

const Layout: React.FC<Props> = observer((props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {overlay_store.semaphore === 0 ? (
        <>
          <NavBar />
          <Box className={classes.body}>{props.children}</Box>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </Box>
      )}
    </div>
  );
});
export default Layout;
