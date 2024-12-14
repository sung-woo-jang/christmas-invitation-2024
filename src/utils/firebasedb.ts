// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  push,
  get,
  child,
  query,
  limitToLast,
  remove,
} from '@firebase/database';
import { hashPassword } from '@/utils/crypto';

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

export const getMessages = async (limit?: number): Promise<Message[]> => {
  try {
    const dbRef = ref(database);
    const messagesRef = child(dbRef, 'messages');

    // limit이 있는 경우 query를 사용하여 가져올 메시지 수 제한
    const messagesQuery = limit
      ? query(messagesRef, limitToLast(limit))
      : messagesRef;

    const snapshot = await get(messagesQuery);

    if (snapshot.exists()) {
      const messages: Message[] = [];
      snapshot.forEach((childSnapshot) => {
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
    console.error('Error fetching introduce:', error);
    return [];
  }
};

export const deleteMessage = async (
  id: string,
  password: string,
): Promise<{ success: boolean; error?: any }> => {
  try {
    // 먼저 메시지를 가져와서 비밀번호 확인
    const dbRef = ref(database);
    const messageRef = child(dbRef, `messages/${id}`);
    const snapshot = await get(messageRef);

    if (!snapshot.exists()) {
      return { success: false, error: '메시지를 찾을 수 없습니다.' };
    }

    const message = snapshot.val();
    const hashedInputPassword = await hashPassword(password);
    if (message.password !== hashedInputPassword) {
      return { success: false, error: '비밀번호가 일치하지 않습니다.' };
    }

    // 비밀번호가 일치하면 메시지 삭제
    await remove(messageRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    return { success: false, error };
  }
};
