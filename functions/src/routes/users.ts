import * as express from "express";
import * as UserController from "../controllers/users";
import * as admin from "firebase-admin";

const router: express.IRouter = express.Router();

router.post("/:userId", async (request: express.Request, response: express.Response) => {
  let data = request.body;
  data.createdAt = admin.firestore.Timestamp.fromDate(new Date());
  const ref = await UserController.createUser(request.params.userId, data);

  return response.send({
    message: "Add new user",
    ref: ref
  });
});

router.get("/:userId", async (request: express.Request, response: express.Response) => {
  const data = await UserController.getUser(request.params.userId);

  return response.send(data);
});

router.put("/:userId", async (request: express.Request, response: express.Response) => {
  let data = request.body;
  data.updatedAt = admin.firestore.Timestamp.fromDate(new Date());
  const updated = await UserController.updateUser(request.params.userId, data);

  return response.send({
    message: "Update user",
    userId: request.params.userId,
    updatedTime: updated
  });
});

router.delete("/:userId", async (request: express.Request, response: express.Response) => {
  let deleted = await UserController.deleteUser(request.params.userId);

  return response.send({
    message: "Delete user",
    userId: request.params.userId,
    deletedTime: deleted
  });
})

export default router;