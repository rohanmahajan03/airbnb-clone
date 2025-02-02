import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function AccountPage(){
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logOut(){
        await axios.post('/logout');
        
        setRedirect("/");
        setUser(null);
    }

    if (!ready){
        return "Loading...";
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    
    // console.log(subpage);

    if (redirect){
        return <Navigate to={redirect}></Navigate>
    }
    return(
        <div>
            <AccountNav></AccountNav>
            {subpage === 'profile'&& (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br></br>
                    <button onClick={logOut} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places'&&(
                <PlacesPage></PlacesPage>
            )}
        </div>
    )
}