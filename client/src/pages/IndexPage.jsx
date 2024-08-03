import { Link, Route } from "react-router-dom"
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage(){
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data]);
        });
    }, []);

    return(
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <div>
                    <div className="bg-gray-200 mb-2 rounded-2xl flex">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl aspect-square object-cover w-full h-full" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                        )}
                    </div>
                    <h2 className="font-bold text-m truncate leading-5 "> {place.title} </h2>
                    <h3 className=" leading-5 text-gray-500">{place.address}</h3>
                    <div className="mt-2">
                        <span className="font-bold"> ${place.price}</span> per day 
                    </div>
                </div>
            ))}
        </div>
    );
}