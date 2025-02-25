import otorrinoHs from '../assets/otorrino-hs.png';
import otorrinoAbout from '../assets/otorrino-about.png';
import otorrinoServices from '../assets/otorrino-services.png';

export default function SecondProject({}) {
    return (

    <section className="w-full flex flex-col items-center my-10 px-10">
        <h2 className='text-gray-300'>
            Dr. Carlo Pedroza Website · 2023
        </h2>
        <h1 className='w-full text-4xl pb-14 mt-3'>
            Crafting and designing websites.
        </h1>
        <div className="flex flex-row gap-5">
            <div>
                <img src={otorrinoHs} alt="" />
            </div>
            <div>
                <img src={otorrinoAbout} alt="" />
            </div>
            <div>
                <img src={otorrinoServices} alt="" />
            </div>
        </div>
    </section>

    );
  }