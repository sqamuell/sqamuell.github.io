import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from 'react';
import {
    Outlet,
} from "@remix-run/react";

export default function Container() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const handleKeyPress = (e: any) => {
        if (e.key == 'Escape') exit();
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => { window.removeEventListener("keydown", handleKeyPress); };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    }, []);

    function exit() {
        setIsVisible(false);
        setTimeout(() => {
            navigate("/");
        }, 500);
    }

    return (
        <div className='absolute h-screen w-screen overflow-clip'>
            {/* THE BACKGROUND FILTER */}
            <div className={`absolute h-screen w-screen bg-white bg-opacity-10 backdrop-grayscale cursor-alias`} onClick={() => exit()}></div>
            {/* THE ANIMATED BOX */}
            <div className={`absolute left-1/2 -translate-x-1/2 rounded-md mt-0 md:mt-[2.5vh] transition-all ease-out duration-500 ${isVisible ? "translate-y-0" : "translate-y-[100vh]"}
                            h-screen lg:h-[95vh] border-2 border-neutral-250 bg-white 
                            w-screen 3xl:w-[1400px] 2xl:w-[1200px] xl:w-[1000px] lg:w-[800px] md:w-[600px] cursor-default`}>
                {/* THE CONTENT */}
                <div className="bg-white overflow-y-scroll h-full p-10 md:p-8">
                    <Outlet />
                </div>
                {/* THE X */}
                <p className="fixed right-3 top-3 md:-right-8 md:top-2 hover:text-yellow-500 cursor-pointer font-bold" onClick={() => exit()}>&#10005;
                </p>
            </div>
        </div>
    )
}