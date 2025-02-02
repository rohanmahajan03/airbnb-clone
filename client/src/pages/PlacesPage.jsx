import { Link, Navigate, useParams } from "react-router-dom"
import { MdOutlinePets } from "react-icons/md";
import { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";


export default function PlacesPage(){
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({data}) =>{
            setPlaces(data);
        })
    }, [])

    return(
        <div>
            <AccountNav />
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={"./new"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add a new place
                    </Link >
                    <div className="mt-4">
                        {places.length > 0 && places.map(place => (
                            <Link to={'/account/places/'+place._id} className=" cursor-pointer flex bg-gray-100 gap-4 p-4 rounded-2xl mt-4">
                                <div className=" flex w-32 h-32 bg-gray-300 shrink-0">
                                    {place.photos.length > 0 && (
                                        <img className="object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]}/>
                                    )}
                                </div>
                                <div className="grow-0 shrink">
                                    <h2 className="text-xl text-left font-bold">{place.title}</h2>
                                    <p className="text-sm mt-2 text-left">{place.description}</p>
                                </div>                               
                            </Link>
                        ))}
                    </div>
                </div>
        </div>
    );
}