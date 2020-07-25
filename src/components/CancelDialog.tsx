import * as React from "react";
import {
  Dialog,
  Button,
  Box,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Axios from "axios";

interface Props {
  open: boolean;
  orderId: string;
  userId: string;
  onClose: () => void;
}

export default function CancelDialog(props: Props) {
  const handleClose = () => {
    props.onClose();
  };

  const handleCancel = () => {
    async function cancelOrder() {
      const cancelResponse = await Axios.put(
        `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/orders/${props.userId}/${props.orderId}`,
        {
          status: "canceled",
        }
      ).then((response) => response.data);
      console.log(cancelOrder);
    }

    cancelOrder();
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <h2>คุณต้องการยกเลิกคำสั่งซื้อใช่หรือไม่</h2>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ไม่</Button>
        <Button onClick={handleCancel}>ใช่</Button>
      </DialogActions>
    </Dialog>
  );
}
