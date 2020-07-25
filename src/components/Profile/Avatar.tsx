import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box, colors } from "@material-ui/core";

interface Props {
  photoUrl: string;
  displayName: string;
  email: string;
}

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "flex-start",
      textAlign: "left",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: colors.grey[200],
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0px 10px",
    },
  },
  avatarImage: {
    flexShrink: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  profileText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1%",
  },
}));

export default function Avatar(props: Props) {
  const classes = useStyles();

  return (
    <Paper>
      <Box className={classes.profile}>
        <Box className={classes.avatar}>
          {props.photoUrl && (
            <img
              src={props.photoUrl}
              alt="profile-avatar"
              className={classes.avatarImage}
            />
          )}
        </Box>
        <Box className={classes.profileText}>
          <h4>{props.displayName || "Display name"}</h4>
          <p>{props.email || "test@gmail.com"}</p>
        </Box>
      </Box>
    </Paper>
  );
}
