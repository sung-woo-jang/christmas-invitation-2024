// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, child } from '@firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA64MGsf13zPVkhoV8A5tcf3EiFFAzGuWk',
  authDomain: 'react-app-590b2.firebaseapp.com',
  databaseURL: 'https://react-app-590b2-default-rtdb.firebaseio.com',
  projectId: 'react-app-590b2',
  storageBucket: 'react-app-590b2.firebasestorage.app',
  messagingSenderId: '734056790170',
  appId: '1:734056790170:web:105d06376956aa1da64723',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export interface Message {
  id?: string;
  content: string;
  name: string;
  password: string;
  createdAt?: string;
}

export const saveMessage = async (
  message: Omit<Message, 'id' | 'createdAt'>,
) => {
  try {
    const messagesRef = ref(database, 'messages');
    const newMessage = {
      ...message,
      createdAt: new Date().toISOString(),
    };
    const result = await push(messagesRef, newMessage);
    return { success: true, id: result.key };
  } catch (error) {
    console.error('Error saving message:', error);
    return { success: false, error };
  }
};

export const getMessages = async (): Promise<Message[]> => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'messages'));

    if (snapshot.exists()) {
      const messages: Message[] = [];
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
        messages.push({
          id: childSnapshot.key || undefined,
          ...childSnapshot.val(),
        });
      });
      return messages.sort((a, b) =>
        (b.createdAt || '').localeCompare(a.createdAt || ''),
      );
    }
    return [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
