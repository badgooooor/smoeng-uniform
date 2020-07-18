import * as express from "express";
import * as OrderController from "../controllers/orders";
import * as admin from "firebase-admin";

const router: express.IRouter = express.Router();

router.get("/:userId", async (request: express.Request, response: express.Response) => {
  const data = await OrderController.getOrders(request.params.userId);
  return response.send(data);
})

router.post("/:userId", async (request: express.Request, response: express.Response) => {
  let data = request.body;
  data.createdAt = admin.firestore.Timestamp.fromDate(new Date());
  const ref = await OrderController.createOrder(request.params.userId, data);
  return response.send({
    message: "Create new user's order",
    ref: ref
  });
})

router.put("/:userId/:orderId", async (request: express.Request, response: express.Response) => {
  let data = request.body;
  data.updatedAt = admin.firestore.Timestamp.fromDate(new Date());
  const updated = await OrderController.updateOrder(request.params.userId, request.params.orderId, request.body).catch((err) => console.log(err));

  return response.send({
    message: "Update orders from id",
    userId: request.params.userId,
    orderId: request.params.orderId,
    updatedTime: updated
  });
})

router.delete("/:userId/:orderId", async (request: express.Request, response: express.Response) => {
  const deleted = await OrderController.deleteOrder(request.params.userId, request.params.orderId)
  return response.send({
    message: "Delete orders from id",
    userId: request.params.userId,
    orderId: request.params.orderId,
    deletedTime: deleted
  });
})

export default router;