import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";


export default function PlacesFormPage(){
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState();
    const {id} = useParams();
   
    useEffect(() => {
        if (!id){
            return;
        }
        else{
            axios.get('/places/'+id).then(response =>{
                const {data} = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setPrice(data.price);
            });
        }
    }, [id]);

    async function savePlace(ev){
        ev.preventDefault();
        console.log("ID Value: ", id)
        if(id){
            console.log("trying to save new place...")
            await axios.put("/places", {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price});

        }
        else{
            console.log("trying to create new place...");
            await axios.post("/places", {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price});
        }
        setRedirect(true);

    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }
    

    return(
        <div>
            <AccountNav/> 
            <form onSubmit={savePlace}>
                <h2 className="text-xl mt-4">Listing Title</h2>
                <p className= "text-sm text-gray-500">a short yet catchy title for your listing!</p>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="For example: My lovely apt in Parkway Gardens" />
                <h2 className="text-xl mt-4">Location</h2>
                <p className= "text-sm text-gray-500">Format as: City, State</p>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="ex: Houston, TX" />
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                <h2 className="text-xl mt-4">Description</h2>
                <p className= "text-sm text-gray-500">a brief description of your listing (a few sentences will suffice)</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                <Perks selected={perks} onChange={setPerks}></Perks>
                <h2 className="text-xl mt-4">Extra Information</h2>
                <p className= "text-sm text-gray-500">Rules that users must follow concerning your listing</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                <h2 className="text-xl mt-4">Check-In & Check Out</h2>
                <p className= "text-sm text-gray-500">add check-in and check-out times</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="mt-2">
                        <h3>Check-In Time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="ex: 10:00 AM"/>
                    </div>
                    <div className="mt-2">
                        <h3>Check-Out Time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="ex: 2:00 PM"/>
                    </div>
                    <div className="mt-2">
                        <h3>Price per day (USD)</h3>
                        <input type="text" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="ex: 10"/>
                    </div>
                </div>
                <button className="primary my-5">Submit</button>
            </form>
        </div>
    )
}