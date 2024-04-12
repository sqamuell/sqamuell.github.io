import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { useEffect } from 'react';

export default function Container({ children }) {
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key == 'Escape') navigate("/");
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => { window.removeEventListener("keydown", handleKeyPress); };
    }, []);

    return (
        <Link to="/">
            <div className='absolute h-screen w-screen bg-white bg-opacity-50   backdrop-grayscale'>
                <Link>
                    <div className="absolute left-1/2 -translate-x-1/2 rounded-md mt-0 lg:mt-[2.5vh] 
                            h-screen lg:h-[95vh] border-2 border-neutral-250 bg-white 
                            w-screen 3xl:w-[1400px] 2xl:w-[1200px] xl:w-[1000px] lg:w-[800px] md:w-[600px] cursor-default">
                        {/* <p className="fixed left-3 top-2 hover:text-yellow-500 cursor-pointer font-bold hidden md:block">
                            <Link to="/">&#10005;</Link>
                        </p> */}
                        <div className="bg-white overflow-y-scroll h-full p-10 md:p-8">
                            {children}
                        </div>
                    </div>
                </Link>
            </div>
        </Link>
    )
}