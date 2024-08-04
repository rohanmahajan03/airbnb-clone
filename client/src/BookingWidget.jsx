import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        setFullName(user.name);
    }, [user])

    let numberOfDays = 0;
    if (checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function submitBooking(){
        const response = await axios.post('/bookings', {checkIn, checkOut, name:fullName, 
            phone, place:place._id, price:numberOfDays * place.price});
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white p-4 rounded-2xl text-center flex flex-col gap-2">
            <div className="text-xl">
                <span className="font-semibold mr-1"> Price: </span> ${place.price} / Day
            </div>
            <div className="mt-2">
                <div className=" bg-gray-100 p-1 rounded-2xl flex justify-center">
                    <label className="font-semibold">Check-In Date:</label>
                    <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} className=" bg-gray-100 cursor-pointer ml-2" type="date" />
                </div>   
                <div className=" mt-2 bg-gray-100 p-1 rounded-2xl flex justify-center">
                    <label className="font-semibold">Check-Out Date:</label>
                    <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} className=" bg-gray-100 cursor-pointer ml-2" type="date" />
                </div>
                {numberOfDays > 0 && (
                    <div className="mt-4 flex flex-col">
                        <label className="text-left ml-2 -mb-1">Your Full Name:</label>
                        <input value={fullName} onChange={ev => setFullName(ev.target.value)} className=" bg-white cursor-text px-2" type="text" />   
                        <label className="text-left ml-2 -mb-1">Your Phone Number:</label>
                        <input value={phone} onChange={ev => setPhone(ev.target.value)} className=" bg-white cursor-text px-2" type="tel" /> 
                    </div>
                )}

            </div>          
            <button onClick={submitBooking} className="mt-2 bg-primary text-white rounded-2xl py-2 px-3">
                Reserve Now
                {numberOfDays > 0 && (
                    <span className=""> (${numberOfDays * place.price})</span>
                )}
            </button>
        </div>
    )
}