import githubSymbol from '../assets/github-symbol.svg'
import linkedinSymbol from '../assets/linkedin-symbol.svg'
import mailSymbol from '../assets/mail-symbol.svg'
export default function HomeSc() {
return (
    <section className="w-full min-h-screen flex items-center justify-center pb-48 px-10">
        <div> 
            <h2 class = "text-3xl">
                Juan Barrera
            </h2>
            <h1 class = "text-6xl">
                SOFTWARE DEVELOPER
            </h1>
            <div className="flex gap-4 justify-center mt-8">
                <img src={mailSymbol} alt="Mail Icon" className="w-9 h-9" />
                <img src={githubSymbol} alt="Github Icon" className="w-9 h-9" />
                <img src={linkedinSymbol} alt="Linkedin Icon" className="w-9 h-9" />
            </div>
            
        <h1 className='flex justify-start text-justify'>
                IT BERRIES
        </h1>
        <p className='flex justify-start text-justify'>
        I am one of the members of a scientific club that brings together enthusiasts of the Internet and new technologies. 
        At ITberries, we design and develop websites and web applications. 
        Apart from the projects, our biggest undertaking is the Ciemna Strona UX conference, 
        which we are organizing for the sixth time. Working in a club as a Front-End Developer 
        definitely developed my skills in group work and working under time pressure. 
        If you want to know more about us, click the button below! 
        </p>
        </div>
    </section>
);
}
