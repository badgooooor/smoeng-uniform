import * as React from "react";
import { createStyles, makeStyles, Theme, fade } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.secondary.dark,
      height: "50px",
      width: "100%",
      textAlign: "center",
      alignItems: "center",

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    text: {
      flexGrow: 1,
      color: fade(theme.palette.secondary.contrastText, 0.5),
    },
  }),
);

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.text}>สโมสรนักศึกษาวิศวกรรมศาสตร์ สจล. 2020</Box>
    </Box>
  )
}