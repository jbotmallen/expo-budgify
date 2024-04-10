import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const usersRef = collection(db, "users");