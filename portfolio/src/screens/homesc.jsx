import githubSymbol from '../assets/github-symbol.svg'
import linkedinSymbol from '../assets/linkedin-symbol.svg'
import mailSymbol from '../assets/mail-symbol.svg'
export default function HomeSc() {
return (
    <section className="w-screen h-screen flex flex-col justify-center gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
        <div className='gradient-container text-[#f1f1f1]'>
            <div className='g1'>
            </div>
            <h2 class = "text-5xl justify-center font-extralight text-container">
                Hi, I'm Juan.
            </h2>
            <h1 class = "text-6xl justify-center text-container">
                I'm a software developer.
            </h1>
            <div className="flex gap-4 justify-center mt-8">
                <img src={mailSymbol} alt="Mail Icon" className="w-9 h-9 filter invert opacity-80" />
                <img src={githubSymbol} alt="Github Icon" className="w-9 h-9 filter invert opacity-80" />
                <img src={linkedinSymbol} alt="Linkedin Icon" className="w-9 h-9 filter invert opacity-80" />
            </div>
        </div>
    </section>
);
}
