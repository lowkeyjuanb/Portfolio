import githubSymbol from '../assets/github-symbol.svg'
import linkedinSymbol from '../assets/linkedin-symbol.svg'
import mailSymbol from '../assets/mail-symbol.svg'
export default function HomeSc() {
return (
    <section className="w-full min-h-screen flex items-center justify-center pb-48 px-10">
        <div> 
            <p class = "text-3xl">
                Juan Barrera
            </p>
            <h1 class = "text-6xl">
                SOFTWARE DEVELOPER
            </h1>
            <div className="flex gap-4 justify-center mt-8">
                <img src={mailSymbol} alt="Mail Icon" className="w-9 h-9" />
                <img src={githubSymbol} alt="Github Icon" className="w-9 h-9" />
                <img src={linkedinSymbol} alt="Linkedin Icon" className="w-9 h-9" />
            </div>
        </div>
        
    </section>
);
}
