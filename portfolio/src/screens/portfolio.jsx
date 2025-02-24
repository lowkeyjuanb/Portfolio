import { useState, useEffect } from 'react';
import iphoneMockUp from '../assets/iphone.svg';
import weeiiHs from '../assets/weeii-hs.png';
import weeiiLoc from '../assets/weeii-loc.png';
import weeiiStore from '../assets/weeii-store.png'
import weeiiLogo from '../assets/weeii-logo.svg'

import TitleSquare from "../components/titleSquare";

export default function PortfolioSc() {
    const screenshots = [weeiiHs, weeiiLoc, weeiiStore]; // Add more images if needed
    const [currentImage, setCurrentImage] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true); // Start fade-out

            setTimeout(() => {
                setCurrentImage(prev => (prev + 1) % screenshots.length);
                setIsFading(false); // Fade-in after image change
            }, 500); // Matches fade duration

        }, 5000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full flex flex-col items-center my-10 px-10">
            <TitleSquare titleSquare="PORTFOLIO"/>
            
            {/* iPhone frame container */}
            <div className="relative w-[300px] h-[600px] flex justify-center items-center">
                {/* Changing Screenshot with Fade Effect */}
                <img 
                    src={screenshots[currentImage]} 
                    alt="App Screenshot" 
                    className={`absolute object-contain rounded-[60px] px-4 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                />
                {/* iPhone mockup */}
                <img 
                    src={iphoneMockUp} 
                    alt="iPhone Mockup" 
                    className="absolute w-full h-full"
                />
            </div>
            <div>
                <img src={weeiiLogo} alt='Weeii Logo' className='h-12 m-5'></img>
            </div>
            <div className="flex flex-row gap-6 py-10">
                <div className="bg-gray-500 h-60 w-96"></div>
                <div className="bg-gray-500 h-60 w-96"></div>
            </div>
        </section>
    );
}
