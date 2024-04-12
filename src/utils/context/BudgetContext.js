import { createContext, useContext } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const addBudget = async (formData, id) => {
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

    const getBudget = async (userId) => {
        try {
            // Reference the user's document within the 'budget' collection
            const userDocRef = doc(db, "budgets", userId);
            
            // Reference the 'content' subcollection within the user's document
            const contentCollectionRef = collection(userDocRef, "content");
            
            // Retrieve all documents within the 'content' subcollection
            const querySnapshot = await getDocs(contentCollectionRef);
            
            // Map over the documents to extract their data
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            return data;
         } catch (error) {
            console.error("Error getting documents: ", error);
            return { success: false, msg: error.message };
         }
    }

    return <BudgetContext.Provider value={{addBudget, getBudget}}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (context === undefined) {
        throw new Error("useBudget must be used within a BudgetProvider");
    }
    return context;
};