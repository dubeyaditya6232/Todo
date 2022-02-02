import { setDoc,doc} from 'firebase/firestore'
import { db } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../useContext';

function Login() {
    const navigate = useNavigate();
    const { user, googleSignIn } = useAuth();

    const login = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                const result = await googleSignIn();
                const data={
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    createdAt:result.user.metadata.creationTime,
                    phoneNumber:result.user.phoneNumber,
                    lastLogin:result.user.metadata.lastSignInTime
                }
                const docRef = doc(db, "Users", result.user.uid);
                await setDoc(docRef, data)
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch(err => { console.log("error in adding users first time login",err) });
            }
            else{
                navigate("/home");
            }
            
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container">
            <h3>You are not logged in</h3>
            <button onClick={(e) => login(e)}>Login</button>
            </div>
        </>
    );
}


export default Login;