// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL,getStorage, ref, uploadBytes} from 'firebase/storage'
import { toast } from "react-hot-toast";
const firebaseConfig = {
  apiKey: "AIzaSyDroNZjmScJzQrA-pTYQRTki_DJ9gyhil8",
  authDomain: "authtesting-4f0fe.firebaseapp.com",
  projectId: "authtesting-4f0fe",
  storageBucket: "authtesting-4f0fe.appspot.com",
  messagingSenderId: "10103236740",
  appId: "1:10103236740:web:1ceb17ea1496505ae6bad1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage();

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  setLoading(true);
  const snaphot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  await updateProfile(currentUser, { photoURL });
  setLoading(false);
  toast.success("File Uploaded sucessfully");
  window.location.reload();
}
