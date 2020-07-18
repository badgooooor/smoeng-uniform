import * as admin from "firebase-admin"

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

export default app;