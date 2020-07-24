import * as React from "react";
import {
  Dialog,
  Button,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { QRCode } from "react-qr-svg";
import Product from "../types/product";
import Axios from "axios";
import { user_store } from "../stores/user";
import { observer } from "mobx-react";
interface Props {
  open: boolean;
  orders: Array<Product>;
  onClose: () => void;
}

function displayPrice(product: string, quantity: number) {
  switch (product) {
    case "เสื้อชอป":
      return 360 * quantity;
    case "เสื้อกาวน์":
      return 340 * quantity;
    case "เสื้อโปโล":
      return 300 * quantity;
  }
}

const SummaryDialog = observer((props: Props) => {
  const [confirm, setConfirm] = React.useState(false);
  const [orderId, setOrderId] = React.useState("order.id");
  const [total, setTotal] = React.useState(0);

  const handleClose = () => {
    props.onClose();
    setConfirm(false);
  };

  React.useEffect(() => {
    async function postOrders() {
      if (confirm) {
        const responseData = await Axios.post(
          `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/orders/${user_store.userId}`,
          {
            orders: props.orders,
            status: "unpaid",
          }
        ).then((response) => response.data);
        setOrderId(responseData.ref);
      }
    }

    postOrders();
  }, [confirm]);

  React.useEffect(() => {
    async function getTotal() {
      let prices = await props.orders.map((order, index) => {
        let price = displayPrice(order.product, order.amount);
        return price || 0;
      });

      let totalPrice = await prices.reduce((acc, curr) => acc + curr);
      setTotal(totalPrice);
    }

    getTotal();
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogContent>
        {!confirm ? (
          <Box p={2}>
            <h2>สรุปคำสั่งซื้อ</h2>
            <Box>
              <ul>
                {props.orders.map((order, index) => (
                  <li>
                    {order.product} ขนาด {order.size} จำนวน {order.amount} ตัว
                    ราคา {displayPrice(order.product, order.amount)} บาท
                  </li>
                ))}
              </ul>
              <p>รวมทั้งหมด : {total} บาท</p>
            </Box>
            <em>กรุณาตรวจสอบรายการก่อนยืนยันการสั่งซื้อ</em>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            <h2>QR Code สำหรับรับสินค้าที่สั่งที่สโมสรนักศึกษา</h2>
            <QRCode
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
              style={{ width: 256 }}
              value={JSON.stringify({
                orderId: orderId,
                userId: user_store.userId,
              })}
            />
            <em>กรุณาถ่ายภาพหน้าจอเพื่อ checkout ให้กับหน้าร้าน</em>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {!confirm ? (
          <>
            <Button onClick={handleClose}>ยกเลิก</Button>
            <Button
              color="primary"
              onClick={() => {
                setConfirm(true);
              }}
            >
              ยืนยัน
            </Button>
          </>
        ) : (
          <Button onClick={handleClose}>ปิด</Button>
        )}
      </DialogActions>
    </Dialog>
  );
});

export default SummaryDialog;
