import { database } from "../firebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

const userCollection = collection(database, "Users-Info");
const auth = getAuth()

class userDataService {
    addUser = async (dataName,dataContact,dataEmail) => {
        return setDoc(doc(database, "users", auth.currentUser.uid), {
          name: dataName,
          contact: dataContact,
          email: dataEmail,
        })
    };
    

    getUser = (setEmailID,setUsers) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const docRef = doc(database, "users", auth.currentUser.uid);
              console.log(auth.currentUser.email)
              setEmailID(auth.currentUser.email)
              getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                  setUsers({ ...doc.data(), id: doc.id });
                } else {
                  console.log("No such document!");
                }
              });
            }
          });
    };
}

const dbInstance = collection(database, "TodoList");
class todoDataService {
  addTodos = (data,completed) => {
    return addDoc(dbInstance, {
      todoid: data.id,
      task: data.task,
      userId: auth.currentUser.uid,
      isCompleted: completed
    });
  };

  updateTodo = (id,data,completed) => {
    const todoDoc = doc(dbInstance, id);
    if (data.task == "" || completed==null) {
      toast.error("Please enter Data to Textfield")
      return;
    }
    const increaseage = { task: data.task, isCompleted: completed };
    // console.log(id)
    updateDoc(todoDoc, increaseage).then(() => {
      toast.success("Upadted SuccessFully")
    }).catch((err) => {
      toast.error("Please enter Data to Textfield")
    })
  };

  deleteTodo = (id) => {
    const todoDoc = doc(dbInstance, id);
    deleteDoc(todoDoc).then(() => {
      toast.success("successfully deleted")
    })
  };

//   getAllTodos = () => {
//     return getDocs(todoCollectionRef);
//   };

  getTodos = (setUsers) => {
    const dbInstance = collection(database, "TodoList");
    const data =  getDocs(dbInstance);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
}
export default new userDataService();
todoDataService = new todoDataService();
export {todoDataService};