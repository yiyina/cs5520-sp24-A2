import { firebase } from "@react-native-firebase/database";

const firestore = firebase.firestore();


const FirestoreService = {
    async addActivity(newActivity) {
        try {
            const documentRef = await firestore.collection('activities').add(newActivity);
            console.log('Activity added with ID: ', documentRef.id);
            return documentRef.id; // 返回新添加的活动的 ID
        } catch (error) {
            console.error("Error adding activity: ", error);
            throw error; // 向调用者抛出错误
        }
    },
  
    async getActivities() {
        try {
            const snapshot = await firestore.collection('activities').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error getting activities: ", error);
            throw error;
        }
    },
  
    async updateActivity(activityId, updatedActivity) {
        try {
            await firestore.collection('activities').doc(activityId).update(updatedActivity);
            console.log('Activity updated with ID: ', activityId);
        } catch (error) {
            console.error("Error updating activity: ", error);
            throw error;
        }
    },
  
    async deleteActivity(activityId) {
        try {
            await firestore.collection('activities').doc(activityId).delete();
            console.log('Activity deleted with ID: ', activityId);
        } catch (error) {
            console.error("Error deleting activity: ", error);
            throw error;
        }
    }
};

export default FirestoreService;