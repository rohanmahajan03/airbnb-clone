import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import PlaceLocation from "../PlaceLocation";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";

export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (id){
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if(foundBooking){
                    setBooking(foundBooking);
                }
            })
        }
    }, [id])

    if(!booking){
        return '';
    }

    if(redirect){
        return <Navigate to={"/account/bookings"}></Navigate>;
    }

    if (showAllPhotos){
        return (
            <div className="absolute inset-0 text-white min-h-screen">
                <div className="p-8 grid bg-black gap-4">
                    <div className="items-center">
                        <h2 className="text-3xl text-center">All Photos of {booking.place.title}</h2>
                            <button 
                                onClick={() => {
                                    setShowAllPhotos(false);
                                    window.scrollTo(0,0);
                                }} 
                                className="top-8 left-12 shadow-black shadow-sm fixed flex rounded-2xl py-2 px-3 gap-1 bg-gray-300 text-black shadow shadow-sm">                            
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                                Go Back
                            </button>
                        
                    </div>
                    {booking.place?.photos?.length > 0 && (
                        booking.place.photos.map(photo => (
                            <div className="flex justify-center" key={photo}>
                                <img className="w-full h-full"src={"http://localhost:4000/uploads/" + photo} alt="" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }


    return (
        <div className="mt-16">
            <button onClick={() => setRedirect(true)} className="z-50 shadow shadow-md fixed items-center flex p-2 -mt-12 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <p className="px-1">Go back</p>   
            </button>
            <h1 className="text-3xl">{booking.place.title}</h1>
            <PlaceLocation place={booking.place}></PlaceLocation>
            <div className="relative mt-8 bg-gray-300 text-black p-4 mb-4 rounded-2xl">
                <h2 className="text-xl -mt-2 font-semibold" >Booking Information: </h2>
                <div className="flex mt-2">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <p className="px-1">{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Days:</p>
                    </div>
                    <div className="flex px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                        </svg>
                        <p className="ml-1">{format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</p>
                    </div>
                </div>                   
                <div className="absolute bg-primary rounded-2xl text-white items-center h-full flex-col text-center top-0 right-0 py-3 px-2">
                    <p>Total Price</p>
                    <span className="py-0 text-2xl text-semibold px-1">${booking.price}</span>
                    
                </div>
            </div>



            <div className="relative">
                <div className="grid gap-x-4 gap-y-2 md:grid-cols-[2fr_1fr] grid-cols-1 rounded-2xl overflow-hidden">
                    <div>
                        {booking.place.photos?.[0] && (
                            <div>
                                <img className="aspect-square object-cover w-full h-full" src={"http://localhost:4000/uploads/" + booking.place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        {booking.place.photos?.[1] && (
                            <img className="aspect-square object-cover w-full h-full" src={"http://localhost:4000/uploads/" + booking.place.photos[1]} alt="" />
                        )}
                        {booking.place.photos?.[2] && (
                            <div className="overflow-hidden">
                                <img className="aspect-square top-2 relative object-cover w-full h-full" src={"http://localhost:4000/uploads/" + booking.place.photos[2]} alt="" />
                            </div>
                        )}
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setShowAllPhotos(true);
                        window.scrollTo(0,0);
                    }} 
                    className="items-center gap-1 flex bg-gray-200 shadow text-black absolute bottom-2 right-2 rounded-2xl px-2 py-1 text-sm">
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </button>
            </div>
        
        
        
        </div>
    )
}