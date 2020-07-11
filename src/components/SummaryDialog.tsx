import * as React from "react";
import { Dialog, Button, Box, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"

interface Product {
  product: string;
  size: string;
  amount: number;
}

interface Props {
  open: boolean;
  orders: Array<Product>;
  onClose: () => void;
}

export default function SummaryDialog(props: Props) {
  const handleClose = () => {
    props.onClose();
  }

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogContent>
        <Box p={2}>
          <h2>สรุปคำสั่งซื้อ</h2>
          <Box>
            <ul>
              {props.orders.map((order, index) => (
                <li>{order.product} ขนาด {order.size} จำนวน {order.amount} ตัว</li>
              ))}
            </ul>
          </Box>
          <em>กรุณาตรวจสอบรายการก่อนยืนยันการสั่งซื้อ</em>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          ยกเลิก
        </Button>
        <Button color="primary">
          ยืนยัน
        </Button>
      </DialogActions>
    </Dialog>
  )
}