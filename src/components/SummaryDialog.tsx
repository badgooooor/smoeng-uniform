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

interface Props {
  open: boolean;
  orders: Array<Product>;
  onClose: () => void;
}

export default function SummaryDialog(props: Props) {
  const [confirm, setConfirm] = React.useState(false);
  const [orderId, setOrderId] = React.useState("order.id");

  const handleClose = () => {
    props.onClose();
    setConfirm(false);
  };

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
                  </li>
                ))}
              </ul>
            </Box>
            <em>กรุณาตรวจสอบรายการก่อนยืนยันการสั่งซื้อ</em>
          </Box>
        ) : (
          <Box>
            <h2>QR Code สำหรับรับสินค้าที่สั่งที่สโมสรนักศึกษา</h2>
            <QRCode
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
              style={{ width: 256 }}
              value={orderId}
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
}
