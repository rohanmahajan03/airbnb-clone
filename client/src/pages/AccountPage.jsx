import { useContext } from "react";
import { UserContext } from "../UserContext.jsx"
import { Navigate } from "react-router-dom";

export default function AccountPage(){
    const {ready, user} = useContext(UserContext);

    if (!ready){
        return "Loading...";
    }
    if(ready && !user){
        return <Navigate to={'/login'} />
    }
    return(
        <div> {user.name}'s Account</div>
    )
}