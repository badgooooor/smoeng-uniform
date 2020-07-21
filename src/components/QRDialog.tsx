import * as React from "react";
import {
  Dialog,
  Button,
  Box,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { QRCode } from "react-qr-svg";

interface Props {
  open: boolean;
  orderId: string;
  userId: string;
  onClose: () => void;
}

export default function QRDialog(props: Props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <h2>QR Code สำหรับรับสินค้าที่สั่งที่สโมสรนักศึกษา</h2>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify({
              orderId: props.orderId,
              userId: props.userId,
            })}
          />
          <em>กรุณาถ่ายภาพหน้าจอเพื่อ checkout ให้กับหน้าร้าน</em>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ปิด</Button>
      </DialogActions>
    </Dialog>
  );
}
