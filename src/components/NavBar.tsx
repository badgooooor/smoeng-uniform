import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { user_store } from '../stores/user';
import { observer } from 'mobx-react';

import { signInWithGoogle, auth } from "../firebase.utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const ButtonAppBar = observer(() => {
  const classes = useStyles();
  const [loginOpen, setLoginOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            จองเสื้อวิศวะลาดกระบัง
          </Typography>
          {
            user_store.displayName ? <Typography variant="body1">
              {user_store.displayName}
            </Typography> : <Button color="inherit" onClick={signInWithGoogle}>
                Login
          </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default ButtonAppBar;