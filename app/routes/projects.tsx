import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { useEffect } from 'react';
import {
    Outlet,
} from "@remix-run/react";

export default function Container() {
    const navigate = useNavigate();

    const handleKeyPress = (e: any) => {
        if (e.key == 'Escape') navigate("/");
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => { window.removeEventListener("keydown", handleKeyPress); };
    }, []);

    return (
        <div className='absolute h-screen w-screen'>
            <div className="absolute h-screen w-screen bg-white bg-opacity-50 backdrop-grayscale cursor-alias" onClick={() => navigate("/")}></div>
            <div className="absolute left-1/2 -translate-x-1/2 rounded-md mt-0 lg:mt-[2.5vh] 
                            h-screen lg:h-[95vh] border-2 border-neutral-250 bg-white 
                            w-screen 3xl:w-[1400px] 2xl:w-[1200px] xl:w-[1000px] lg:w-[800px] md:w-[600px] cursor-default">
                <div className="bg-white overflow-y-scroll h-full p-10 md:p-8">
                    <Outlet />
                </div>
                <p className="fixed right-3 top-3 md:-right-8 md:top-2 hover:text-yellow-500 cursor-pointer font-bold">
                    <Link to="/">&#10005;</Link>
                </p>
            </div>
        </div>
    )
}