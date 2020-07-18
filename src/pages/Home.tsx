import * as React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, makeStyles, colors } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Layout from "../containers/Layout";
import { user_store } from "../stores/user";
import { observer } from "mobx-react";

const useStyles = makeStyles((theme) => ({
  quickMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    margin: "auto",
    backgroundColor: theme.palette.secondary.dark,
    border: "none",
    outline: "none",
    "&:hover": {
      border: 'none',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    "&:clicked": {
      border: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    fontSize: "20px"
  }
}));

const Home = observer(() => {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Link to="/newOrder" style={{ textDecoration: "none" }}>
            <Box className={classes.quickMenu} component="button">
              <AddShoppingCartIcon />
              <p>สร้าง order ใหม่</p>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/#" style={{ textDecoration: "none" }}>
            <Box className={classes.quickMenu} component="button">
              <ShoppingCartIcon />
              <p>ดูการสั่งซื้อ</p>
            </Box>
          </Link>
        </Grid>
      </Grid>

    </Layout>
  );
})

export default Home;
