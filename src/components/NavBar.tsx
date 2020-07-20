import * as React from "react";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { user_store } from '../stores/user';
import { observer } from 'mobx-react';

import { signInWithGoogle, auth } from "../firebase.utils";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  const ImageLink = () => {
    if (to === "/") {
      return <ListItemIcon>
        <ShoppingBasketIcon />
      </ListItemIcon>
    } else {
      return <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
    }
  }
  return (
    <li>
      <ListItem button component={CustomLink}>
        <ImageLink />
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


const ButtonAppBar = observer(() => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            user_store.displayName && <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          }

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
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItemLink to="/" primary="คำสั่งซื้อ" />
            <ListItemLink to="/profile" primary="โปรไฟล์" />
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => { user_store.clear(); }}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"ออกจากระบบ"} />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </div >
  );
});

export default ButtonAppBar;