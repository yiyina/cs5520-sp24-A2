# CS5520 Mobile Application - Assignment 2
Welcome to your Personal Activity Tracker!

Begin your journey to a healthier lifestyle, with the ultimate activity-logging app that makes tracking your workouts and routines a breeze. Start by easily logging in with your email or phone number and dive into a world of meticulous activity tracking.

## How to Run:
1. Clone the repository to your local computer:
   ```
   git clone <repository_url>
   ```
2. Navigate to the downloaded folder:
   ```
   cd <repository_folder>
   ```
3. Install dependencies using npm:
   ```
   npm install
   ```
4. Start the Expo development server:
   ```
   npx expo start
   ```
5. If you have an Android or iOS simulator installed on your computer, you can open it by pressing 'a' for Android or 'i' for iOS in the terminal where Expo is running. Alternatively, you can download the Expo Go app from the App Store or Google Play Store on your mobile device and scan the QR code displayed in the terminal to open the app.
   
6. You should have your own Firebase Cloud Firestore account:
   Register your account in: [https://console.firebase.google.com/](https://console.firebase.google.com/)

7. Set your .env file (put it under your project main directory)

## Screen 1: Start Screen
This is the first screen with a login function that the user sees when starting the app.
1. Email (xxx@xxx.com) and Phone number (10 digits, no letters) should be valid.
   
<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/fdc8b365-5691-49dd-b176-fd83d3cf6696" alt="image" style="transform: scale(0.5);">

## Screen 2: All Activities & Special Activities
These two screens are shown in a bottom tab navigator and both show a list of activity entries. An entry will be automatically marked as special if the type of activity is Running or Weight Training and the duration is more than 60 min.

<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/5a36c8d9-33bf-4c5f-8700-b8a2c48dcef7" alt="image" style="transform: scale(0.5);">
<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/b729594a-14d9-469f-9179-c462d83d11f6" alt="image" style="transform: scale(0.5);">

## Screen 3: Add An Activity
From both All Activities and Special Activities screens, you can navigate to the Add An Activity screen by pressing on the "Add" button on the top right of the screen. 

<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/cb5ac124-598a-4e3b-aa60-4980d85a8a35" alt="image" style="transform: scale(0.5);">
<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/06d8b144-8972-4ba0-8660-3f1c1a534435" alt="image" style="transform: scale(0.5);">
Saving a new entry successfully should update the data array and takes user back to the previous screen.

## Screen 4: Edit An Activity
**Reuse** Add An Activity component to create this screen. The fields from the Add screen should be populated when user comes to the edit screen. Changing any of the values and pressing the Save button should update the Firestore database and the lists on both screens accordingly.

<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/d20a1294-6e4a-4270-8b6b-0cc7a0d49dc0" alt="image" style="transform: scale(0.5);">
When editing a special entry, the user sees a checkbox in addition to all the components from the Add screen. Selecting this checkbox and pressing the Save button makes the item not marked a special anymore and should remove the item from the list on the special screen.

<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/06d8b144-8972-4ba0-8660-3f1c1a534435" alt="image" style="transform: scale(0.5);">
![image](https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/c998e497-c102-4753-87f9-72cc0b92b06d)

User can delete an entry by pressing on the trash icon on the top right of the Edit screen.

<img src="https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/06d8b144-8972-4ba0-8660-3f1c1a534435" alt="image" style="transform: scale(0.5);">
![image](https://github.com/yiyina/cs5520-sp24-A2/assets/55360195/d3f8c371-8535-4341-b7a4-beb006a41d3b)

