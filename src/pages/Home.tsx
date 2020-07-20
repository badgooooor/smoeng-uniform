import * as React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, makeStyles, colors } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Layout from "../containers/Layout";
import { user_store } from "../stores/user";
import { observer } from "mobx-react";

const GownSizeImage = require("../assets/images/size_gown.jpg");
const ShopSizeImage = require("../assets/images/size_shop.jpg");
const PoloSizeImage = require("../assets/images/size_polo.jpg");

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
  },
  catalogImage: {
    width: "400px",
    margin: "auto"
  }
}));

const Home = observer(() => {
  const classes = useStyles();

  return (
    <Layout>
      <>
        {
          user_store.displayName &&
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
              <Link to="/orders" style={{ textDecoration: "none" }}>
                <Box className={classes.quickMenu} component="button">
                  <ShoppingCartIcon />
                  <p>ดูการสั่งซื้อ</p>
                </Box>
              </Link>
            </Grid>
          </Grid>
        }
        <Box padding="20px">
          <h2>ไซส์ของเสื้อ</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <h4>เสื้อช๊อป</h4>
              <img className={classes.catalogImage} src={ShopSizeImage} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <h4>เสื้อกาวน์</h4>
              <img className={classes.catalogImage} src={GownSizeImage} />
            </Grid>
            <Grid item xs={12}>
              <h4>เสื้อโปโล</h4>
              <img className={classes.catalogImage} src={PoloSizeImage} />
            </Grid>
          </Grid>
        </Box>
      </>

    </Layout>
  );
})

export default Home;
