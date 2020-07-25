import * as React from "react";
import { Grid, Paper, Box, makeStyles, IconButton } from "@material-ui/core";
import Product from "../types/product";

import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import { observer } from "mobx-react";
import { user_store } from "../stores/user";
import QRDialog from "./QRDialog";
import CancelDialog from "./CancelDialog";
import { overlay_store } from "../stores/overlay";

function displayStatus(status: string) {
  switch (status) {
    case "unpaid":
      return "ยังไม่ชำระเงิน";
    case "canceled":
      return "ยกเลิกคำสั่งซื้อ";
    case "paid":
      return "ชำระเงินแล้ว";
    default:
      return "";
  }
}

const useStyles = makeStyles((theme) => ({
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const OrderItem = observer(() => {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [qrOrder, setQrOrder] = React.useState("");
  const [qrOpen, setQrOpen] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [cancelOrder, setCancelOrder] = React.useState("");

  async function getOrders() {
    const newData = (
      await Axios.get(
        `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/orders/${user_store.userId}`
      )
    ).data;
    setOrders(newData);
    console.log(newData);
  }

  React.useEffect(() => {
    overlay_store.add();
    getOrders();
    overlay_store.subtract();
  }, []);

  React.useEffect(() => {
    overlay_store.add();
    if (cancelOpen === false) {
      getOrders();
    }
    overlay_store.subtract();
  }, [cancelOpen]);

  return (
    <>
      <Grid container spacing={2}>
        {orders.map((orderItem, index) => (
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box padding="10px 20px">
                <Box className={classes.head}>
                  <h4>{index + 1}</h4>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setQrOrder(orderItem.id);
                        setQrOpen(true);
                      }}
                    >
                      <CropFreeIcon />
                    </IconButton>
                    {orderItem.status !== "paid" && (
                      <IconButton
                        onClick={() => {
                          setCancelOrder(orderItem.id);
                          setCancelOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                {orderItem.orders.map((item: Product, index: any) => (
                  <li>
                    {item.product} ขนาด {item.size} จำนวน {item.amount} ตัว
                  </li>
                ))}
                <p>สถานะ : {displayStatus(orderItem.status)}</p>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <QRDialog
        open={qrOpen}
        userId={user_store.userId}
        orderId={qrOrder}
        onClose={() => {
          setQrOpen(false);
        }}
      />
      <CancelDialog
        open={cancelOpen}
        userId={user_store.userId}
        orderId={cancelOrder}
        onClose={() => {
          setCancelOpen(false);
        }}
      />
    </>
  );
});

export default OrderItem;
