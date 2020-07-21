import * as React from "react";
import Layout from "../containers/Layout";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import OrderItem from "../components/OrderItem";
import Order from "../types/order";
// import { observe } from "mobx";
// import { orders_store } from "../stores/orders";

const orders: Array<Order> = [
  {
    orders: [
      {
        product: "ชอป",
        size: "L",
        amount: 2,
      },
      {
        product: "เสื้อชอป",
        size: "L",
        amount: 1,
      },
    ],
    status: "unpaid",
  },
];

const useStyles = makeStyles((theme) => ({
  orderWrapper: {
    padding: "10px 20px",
  },
}));

const OrderList = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Box className={classes.orderWrapper}>
        <h2>รายการสั่งซื้อ</h2>
        <OrderItem />
      </Box>
    </Layout>
  );
};

export default OrderList;
