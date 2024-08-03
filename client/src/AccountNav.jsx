import { Link, Navigate, useLocation, useParams } from "react-router-dom";
// import AccountNav from "../AccountNav.jsx";


export default function AccountNav(){
    const {pathname} = useLocation();
    // console.log(pathname);
    let subpage = pathname.split("/")?.[2]
    if(subpage === undefined){
        subpage = "profile";
    }
    console.log(subpage)

    function linkClasses (type=null){
        
        let classes =  'inline-flex gap-1 py-2 px-6 rounded-full'
        if (type === subpage ){
            classes += ' bg-primary text-white '
        }
        else{
            classes += ' bg-gray-200'
        }
        return classes;
    }

    return(
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')}to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                My Profile 
            </Link>
            <Link className={linkClasses('bookings')}to={'/account/bookings'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                My Bookings 
            </Link>
            <Link className={linkClasses('places')}to={'/account/places'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                My accomodations
            </Link>
        </nav>
    )
}