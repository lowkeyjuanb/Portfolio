import iphoneMockUp from '../assets/iphone.svg';
import weeiiHs from '../assets/weeii-hs.png';
import weeiiLoc from '../assets/weeii-loc.png';
import weeiiStore from '../assets/weeii-store.png'
import weeiiLogo from '../assets/weeii-logo.svg'

export default function FirstProject({}) {
    return (
      <section className="w-full flex flex-col items-center my-10 px-10">
        <h2 className='text-gray-300'>
            Weeii App · 2024 - 2025
        </h2>
        <h1 className='w-full text-4xl pb-14 mt-3'>
            Creating and optimizing features cross-platform apps.
        </h1>
        {/* <div className='absolute pt-52 px-10'>
            <img src={weeiiLogo} alt='Weeii Logo' className='w-screen opacity-50'></img>
        </div> */}
        <div className='flex flex-row gap-5'>
            {/* iPhone frame container */}
            <div className="relative w-[300px] h-[600px] flex justify-center items-center">
                {/* Changing Screenshot with Fade Effect */}
                <img 
                    src={weeiiHs} 
                    alt="Weeii HomeScreen" 
                    className={`absolute object-contain rounded-[60px] px-4`}
                />
                {/* iPhone mockup */}
                <img 
                    src={iphoneMockUp} 
                    alt="iPhone Mockup" 
                    className="absolute w-full h-full"
                />
            </div>
            <div className="relative w-[300px] h-[600px] flex justify-center items-center">
                {/* Changing Screenshot with Fade Effect */}
                <img 
                    src={weeiiLoc} 
                    alt="Weeii Location" 
                    className={`absolute object-contain rounded-[60px] px-4`}
                />
                {/* iPhone mockup */}
                <img 
                    src={iphoneMockUp} 
                    alt="iPhone Mockup" 
                    className="absolute w-full h-full"
                />
            </div>
            <div className="relative w-[300px] h-[600px] flex justify-center items-center">
                {/* Changing Screenshot with Fade Effect */}
                <img 
                    src={weeiiStore} 
                    alt="Weeii Store" 
                    className={`absolute object-contain rounded-[60px] px-4`}
                />
                {/* iPhone mockup */}
                <img 
                    src={iphoneMockUp} 
                    alt="iPhone Mockup" 
                    className="absolute w-full h-full"
                />
            </div>
        </div>
      </section>
    );
  }