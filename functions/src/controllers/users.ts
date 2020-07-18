import admin from '../firebase.utils';

const db = admin.firestore();

export async function getUser(userId: string) {
  const data = await await db.collection("users")
    .doc(userId)
    .get()
    .then((snapshot) => {
      let data = snapshot.data();
      return data;
    })

  return data;
}

export async function createUser(userId: string, data: object) {
  const ref = await db.collection("users").doc(userId).set(data);
  return ref.writeTime;
}

export async function updateUser(userId: string, data: object) {
  const ref = await db.collection("users").doc(userId).update(data);
  return ref.writeTime;
}

export async function deleteUser(userId: string) {
  const ref = await db.collection("users").doc(userId).delete();
  return ref.writeTime;
}