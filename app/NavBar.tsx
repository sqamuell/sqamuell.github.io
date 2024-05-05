import { useState } from 'react';
import { Link } from "@remix-run/react";

export default function NavBar() {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => setIsVisible(!isVisible);

    return (
        <div className="bg-opacity-80 bg-white">
            <div className='fixed left-3 top-3 text-2xl w-2'>
                <p className={`hover:text-yellow-500 cursor-pointer select-none ${isVisible ? "hidden" : "show"}`} onClick={handleClick}>&#9776;</p>
            </div>
            <div className={`transform select-none  top-0 p-4 left-0 w-auto bg-white fixed h-[97vh] m-4 mt-[1.5vh] border-2 border-neutral-250 rounded-md ease-in-out transition-all duration-300 z-30 ${isVisible ? "translate-x-0" : "-translate-x-[200%]"}`} onClick={handleClick}>
                <ul className='hover:*:*:text-yellow-500'>
                    <li className='text-sm italic pt-3'>2024</li>
                    <li><Link to="./projects/wax-flamingos" >Wax Flamingos</Link></li>
                    <li><Link to="./projects/droplets" >Droplets</Link></li>
                    <li className='text-sm italic pt-3'>2023</li>
                    <li><Link to="./projects/honeycomb" >Honeycomb</Link></li>
                    <li><Link to="./projects/water-qwop" >Water-QWOP</Link></li>
                    <li><Link to="./projects/horse-and-chariot" >Horse & Chariot</Link></li>
                    <li><Link to="./projects/hyper-hydration" >Hyper-hydration</Link></li>
                    <li className='text-sm italic pt-3'>2022</li>
                    <li><Link to="./projects/cloud-sketch" >Cloud Sketch</Link></li>
                    <li><Link to="./projects/sprawl-and-resilience" >Sprawl & Resilience</Link></li>
                    <li className='text-sm italic pt-3'>2021</li>
                    <li><Link to="./projects/cybernetic-field" >Cybernetic Field</Link></li>
                    <li><Link to="./projects/bubble-gan" >Bubble-GAN</Link></li>
                    <li className='text-sm italic pt-3'>2020</li>
                    <li><Link to="./projects/elc-carrick" >ELC: Carrick</Link></li>
                    <li><Link to="./projects/placeholder" >15-112: placeHolder</Link></li>
                    <li><Link to="./projects/collaborative-winding" >Collaborative Winding</Link></li>
                    <li className='text-sm italic pt-3'>2019</li>
                    <li><Link to="./projects/flood-museum" >Flood Museum</Link></li>
                    <li><Link to="./projects/design-fabrication" >Design Fabrication</Link></li>
                    <li><Link to="./projects/spring-garden-hostel" >Spring Garden Hostel</Link></li>
                    <li><Link to="./projects/modular-garden" >Modular Garden</Link></li>
                    <li><Link to="./projects/bathhouse" >Bathhouse</Link></li>
                    <li className='text-sm italic pt-3'>2018</li>
                    <li><Link to="./projects/hoophouse" >Hoophouse</Link></li>
                    <li><Link to="./projects/drawings">Drawings</Link></li>
                    {/* <br />
                    <br />
                    <br />
                    <br />
                    <li><Link to="./">Home</Link></li>
                    <li>About</li>
                    <li>Resume</li> */}
                </ul>
                <p className='absolute top-4 select-none  -right-7 hover:text-yellow-500 cursor-pointer font-bold' onClick={handleClick}>&#10005;</p>
            </div>
        </div >
    );
}