import { Link, useParams } from "react-router-dom"
import { MdOutlinePets } from "react-icons/md";
import { useState } from "react";
import Perks from "../Perks";
export default function PlacesPage(){
    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    function addPhotoByLink(){
        
    }

    return(
        <div>
            {action !== "new" &&(
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={"./new"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add a new place
                    </Link>
                </div>
            )}
            {action === "new" && (
                <div> 
                    <form action="">
                        <h2 className="text-xl mt-4">Listing Title</h2>
                        <p className= "text-sm text-gray-500">a short yet catchy title for your listing!</p>
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="For example: My lovely apt in Parkway Gardens" />
                        <h2 className="text-xl mt-4">Address</h2>
                        <p className= "text-sm text-gray-500">address of your listing</p>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                        <h2 className="text-xl mt-4">Photos</h2>
                        <p className= "text-sm text-gray-500">the more the merrier!</p>
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add photo using a link ...'} />
                            <button className="bg-gray-200 mt-2 h-10 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="flex gap-3 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                Upload
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-xl mt-4">Description</h2>
                        <p className= "text-sm text-gray-500">a brief description of your listing (a few sentences will suffice)</p>
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                        <Perks selected={perks} onChange={setPerks}></Perks>
                        <h2 className="text-xl mt-4">Extra Information</h2>
                        <p className= "text-sm text-gray-500">Rules that users must follow concerning your listing</p>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        <h2 className="text-xl mt-4">Check-In & Check Out</h2>
                        <p className= "text-sm text-gray-500">add check-in and check-out times</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                            <div className="mt-2">
                                <h3>Check-In Time</h3>
                                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="ie: 10:00 AM"/>
                            </div>
                            <div className="mt-2">
                                <h3>Check-Out Time</h3>
                                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="ie: 2:00 PM"/>
                            </div>
                        </div>
                        <button className="primary my-5">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}