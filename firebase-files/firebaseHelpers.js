import { firestore } from "./firebaseSetup";
import { collection, addDoc, getDocs, query, orderBy, updateDoc, deleteDoc, doc } from "firebase/firestore";

const FirestoreService = {
    async addActivity(newActivity) {
        try {
            const docRef = await addDoc(collection(firestore, 'activities'), newActivity);
            console.log('Activity added with ID: ', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("Error adding activity: ", error);
            throw error; 
        }
    },
  
    async getActivities() {
        try {
            const snapshot = await getDocs(query(collection(firestore, 'activities'), orderBy('date', 'asc')));
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error getting activities: ", error);
            throw error;
        }
    },
  
    async updateActivity(activityId, updatedActivity) {
        try {
            const activityDocRef = doc(firestore, 'activities', activityId);
            await updateDoc(activityDocRef, updatedActivity);
            console.log('Activity updated with ID: ', activityId);
        } catch (error) {
            console.error("Error updating activity: ", error);
            throw error;
        }
    },
  
    async deleteActivity(activityId) {
        try {
            const activityDocRef = doc(firestore, 'activities', activityId);
            await deleteDoc(activityDocRef);
            console.log('Activity deleted with ID: ', activityId);
        } catch (error) {
            console.error("Error deleting activity: ", error);
            throw error;
        }
    }
};

export default FirestoreService;