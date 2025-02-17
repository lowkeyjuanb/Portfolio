import githubSymbol from '../assets/github-symbol.svg'
import linkedinSymbol from '../assets/linkedin-symbol.svg'
import mailSymbol from '../assets/mail-symbol.svg'
export default function HomeSc() {
return (
    <section className="w-full min-h-screen flex items-center justify-center pb-60">
        <div> 
            <p class = "text-4xl">
                Hello, my name is Juan Barrera and...
            </p>
            <h1 class = "text-8xl">
                I'M A SOFTWARE DEVELOPER
            </h1>
            <div className="flex gap-4 justify-center mt-8">
                <img src={mailSymbol} alt="Mail Icon" className="w-12 h-12" />
                <img src={githubSymbol} alt="Github Icon" className="w-12 h-12" />
                <img src={linkedinSymbol} alt="Linkedin Icon" className="w-12 h-12" />
            </div>
        </div>
        
    </section>
);
}
