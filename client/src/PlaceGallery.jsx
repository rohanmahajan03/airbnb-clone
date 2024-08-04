import { useState } from "react";

export default function PlaceGallery({place}){


    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos){
        return (
            <div className="absolute inset-0 text-white min-h-screen">
                <div className="p-8 grid bg-black gap-4">
                    <div className="items-center">
                        <h2 className="text-3xl text-center">All Photos of {place.title}</h2>
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
                    {place?.photos?.length > 0 && (
                        place.photos.map(photo => (
                            <div className="flex justify-center" key={photo}>
                                <img className="w-full h-full"src={"http://localhost:4000/uploads/" + photo} alt="" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }

    return(
            <div className="relative">
                <div className="grid gap-x-4 gap-y-2 md:grid-cols-[2fr_1fr] grid-cols-1 rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img className="aspect-square object-cover w-full h-full" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        {place.photos?.[1] && (
                            <img className="aspect-square object-cover w-full h-full" src={"http://localhost:4000/uploads/" + place.photos[1]} alt="" />
                        )}
                        {place.photos?.[2] && (
                            <div className="overflow-hidden">
                                <img className="aspect-square top-2 relative object-cover w-full h-full" src={"http://localhost:4000/uploads/" + place.photos[2]} alt="" />
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
    );
}