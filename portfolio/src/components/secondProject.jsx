import otorrinoHs from '../assets/otorrino-hs.png';
import otorrinoAbout from '../assets/otorrino-about.png';
import otorrinoServices from '../assets/otorrino-services.png';

export default function SecondProject() {
    return (
        <section className="w-full flex flex-col items-center my-10 px-10">
            {/* Gradient Circle */}
            <div className="absolute pt-36 w-[400px] bg-gradient-to-t from-black to-blue-700 blur-3xl rounded-full opacity-100 ">
            </div>
            <div className='relative'>
                <h2 className='text-gray-300'>
                    Dr. Carlo Pedroza Website · 2023
                </h2>
                <h1 className='w-full text-4xl pb-24 mt-3'>
                    Crafting and designing websites.
                </h1>
                <div className="flex flex-row gap-5">
                    <div>
                        <img src={otorrinoHs} alt="" className='rounded-md' />
                    </div>
                    <div>
                        <img src={otorrinoAbout} alt="" className='rounded-md'/>
                    </div>
                    <div>
                        <img src={otorrinoServices} alt="" className='rounded-md'/>
                    </div>
                </div>

            </div>
        </section>
    );
}


