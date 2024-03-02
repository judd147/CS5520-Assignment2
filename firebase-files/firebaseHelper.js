import { collection, addDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data) {
  try {
    await addDoc(collection(database, "activities"), data)
  } catch (error) {
    console.log(error)
  }
}

export async function deletefromDB(id) {
  try {
    await deleteDoc(doc(database, "activities", id))
  } catch (error) {
    console.log(error)
  }
}

export async function updateDB(id, data) {
  try {
    await setDoc(doc(database, 'activities', id), data)
  } catch (error) {
    console.log(error)
  }
}