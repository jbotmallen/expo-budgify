import { collection, doc, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const addBudget = async (formData, id) => {
    try {
        const userDocRef = doc(db, "budgets", id);
        
        const budgetSubcollectionRef = collection(userDocRef, "content");
        const newBudgetRef = await addDoc(budgetSubcollectionRef, {...formData, createdAt: new Date(), updatedAt: new Date()});
        
        return { success: true, data: newBudgetRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, msg: error.msg };
    }
};