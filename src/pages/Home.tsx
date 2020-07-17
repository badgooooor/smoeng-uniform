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
    width: "100%",
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
      <React.Fragment>
        {
          user_store.displayName && <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Link to="/newOrder" style={{ textDecoration: "none" }}>
                <Box className={classes.quickMenu} component="button" m={1}>
                  <AddShoppingCartIcon />
                  <p>สร้าง order ใหม่</p>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.quickMenu} component="button" m={1}>
                <ShoppingCartIcon />
                <p>ดูการสั่งซื้อ</p>
              </Box>
            </Grid>
          </Grid>
        }
        {/* Add catalog here */}
      </React.Fragment>
    </Layout>
  );
})

export default Home;
