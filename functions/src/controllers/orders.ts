import admin from '../firebase.utils';

const db = admin.firestore();

export async function getOrders(userId: string) {
  let orders = await db.collection("users")
    .doc(userId)
    .collection("orders")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        let data = doc.data();
        data.id = doc.id;
        return data;
      })
    );

  return orders;
}

export async function createOrder(userId: string, data: Object) {
  const ref = await db.collection("users").doc(userId).collection("orders").add(data);
  return ref.id;
}

export async function updateOrder(userId: string, orderId: string, data: Object) {
  const ref = await db.collection("users").doc(userId).collection("orders").doc(orderId).update(data);
  return ref.writeTime;
}

export async function deleteOrder(userId: string, orderId: string) {
  const ref = await db.collection("users").doc(userId).collection("orders").doc(orderId).delete();
  return ref.writeTime;
}
