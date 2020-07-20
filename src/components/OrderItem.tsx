import * as React from "react";
import { Grid, Paper, Box, makeStyles, IconButton } from "@material-ui/core";
import Product from "../types/product";

import CropFreeIcon from '@material-ui/icons/CropFree';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  order: Array<any>;
  index: number;
}

function displayStatus(status) {
  switch (status) {
    case "unpaid":
      return "ยังไม่จ่าย";
    case "ready":
      return "สินค้าพร้อมรับ";
    case "completed":
      return "การสั่งซื้อสำเร็จ";
    default:
      return "";
  }
};

const useStyles = makeStyles((theme) => ({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
}));

export default function OrderItem(props: Props) {
  const classes = useStyles();

  return <Grid item xs={12} sm={6}>
    <Paper>
      <Box padding="10px 20px">
        <Box className={classes.head}>
          <h4>{props.index + 1}</h4>
          <Box>
            <IconButton onClick={() => {
              console.log("Show QR")
            }}>
              <CropFreeIcon />
            </IconButton>
            <IconButton onClick={() => {
              console.log("Delete")
            }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {props.order.orders.map((item, index) =>
          <li>{item.product} ขนาด {item.size} จำนวน {item.amount} ตัว</li>
        )}
        <p>สถานะ : {displayStatus(props.order.status)}</p>
      </Box>
    </Paper>
  </Grid>
}