import Axios from "axios";

export async function getUser(userId: string) {
  return await (
    await Axios.get(
      `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${userId}`
    )
  ).data;
}

export async function createUser(userId: string, userData: object) {
  return await (
    await Axios.post(
      `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${userId}`,
      userData
    )
  ).data;
}

export async function updateUser(userId: string, userData: object) {
  return await Axios.put(
    `https://asia-northeast1-uniform-smoeng.cloudfunctions.net/api/users/${userId}`,
    userData
  );
}
