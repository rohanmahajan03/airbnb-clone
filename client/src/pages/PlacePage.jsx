import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import PlaceLocation from "../PlaceLocation";

export default function PlacePage(){
    const {id} = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/places/' + id).then(response =>{
            setPlace(response.data);
        })
    }, [id]);

    if (!place) return '';

    

    return(
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <PlaceLocation place={place}></PlaceLocation>
            <PlaceGallery place={place}></PlaceGallery>
            <div className="my-4">
                <h2 className="font-semibold text-xl">Description:</h2>
                {place.description}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-300 p-2">
                    <h2 className=" text-xl font-semibold">Additional Information:</h2>
                    <div className="text-sm">
                        {place.extraInfo}
                    </div>
                    <div className="text-center">
                        <span className="font-semibold mr-1">Check-In Time:</span> {place.checkIn} <br />
                        <span className="font-semibold mr-1">Check-Out Time: </span> {place.checkOut}
                    </div>
                </div>
                <BookingWidget place={place} />
            </div>
        </div>
    )
}