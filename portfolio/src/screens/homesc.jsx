import githubSymbol from '../assets/github-symbol.svg'
import linkedinSymbol from '../assets/linkedin-symbol.svg'
import mailSymbol from '../assets/mail-symbol.svg'
export default function HomeSc() {
return (
    <section className="w-full max-h-full">
            <div className='py-32'>
                <h2 class = "text-3xl justify-center">
                    Juan Barrera
                </h2>
                <h1 class = "text-6xl justify-center">
                    SOFTWARE DEVELOPER
                </h1>
                <div className="flex gap-4 justify-center mt-8">
                    <img src={mailSymbol} alt="Mail Icon" className="w-9 h-9" />
                    <img src={githubSymbol} alt="Github Icon" className="w-9 h-9" />
                    <img src={linkedinSymbol} alt="Linkedin Icon" className="w-9 h-9" />
                </div>
            </div>
        <div className='bg-slate-800 text-white p-10 text-2xl'>
            <h1 className='flex justify-start text-justify font-bold'>
                IT BERRIES
            </h1>
            <div className="flex flex-row gap-6 place-items-stretch w-full">
                <div className="flex-1 text-center p-4">
                    TELNOR
                </div>
                <div className="flex-1 text-center p-4">
                    TELNOR
                </div>
                <div className="flex-1 text-center p-4">
                    TELNOR
                </div>
                <div className="flex-1 text-center p-4">
                    TELNOR
                </div>
            </div>
        </div>   
    </section>
);
}
