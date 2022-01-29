
import { useNavigate } from "react-router-dom";
import {useAuth} from '../useContext';

function Login() {
    const navigate=useNavigate();
    const { user,googleSignIn } = useAuth();

    const login=async(e)=>{
        e.preventDefault();
        try{
            if(!user)
            await googleSignIn();
            navigate("/home");
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <h3>You are not logged in</h3>
            <button onClick={(e)=>login(e)}>Login</button>
        </>
    );
}


export default Login;