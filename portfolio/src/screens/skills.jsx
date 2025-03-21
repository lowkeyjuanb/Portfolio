import TitleSquare from "../components/titleSquare";
import htmlSymbol from '../assets/html-lg.svg'
import cssSymbol from '../assets/css-lg.svg'
import jsSymbol from '../assets/js-lg.svg'
import reactSymbol from '../assets/react-lg.svg'
import githubSymbol from '../assets/github-symbol.svg'
import nodeSymbol from '../assets/node-lg.svg'
import mySqlSymbol from '../assets/mysql-lg.svg'
import flutterSymbol from '../assets/flutter-lg.svg'
import swiftSymbol from '../assets/swift-lg.svg'
import espSymbol from '../assets/esp-lg.svg'
import engSymbol from '../assets/en-lg.svg'
import LogoDisplay from "../components/logoDisplay";
export default function SkillsSc() {
    return (
        <section className="w-full flex flex-col items-center pt-20 sm:py-40 px-10">
            <div className="absolute pt-32 w-[300px] bg-gradient-to-t from-black to-blue-700 blur-3xl rounded-full opacity-100 ">
            </div>
            <div className='relative'>
                <h1 className='w-full text-4xl pb-10 mt-3'>
                    Skills
                </h1>
            </div>
            <div className="flex flex-col items-center w-full mb-10 p-6 gap-10 lg:gap-20">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-32">
                <LogoDisplay lgName = "HTML5" lgSrc={htmlSymbol}/>
                <LogoDisplay lgName = "REACT" lgSrc={reactSymbol}/>
                <LogoDisplay lgName = "CSS" lgSrc={cssSymbol}/>
                <LogoDisplay lgName = "JAVASCRIPT" lgSrc={jsSymbol}/>
                <LogoDisplay lgName = "GIT" lgSrc={githubSymbol}/>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-32">
                <LogoDisplay lgName = "NODEJS" lgSrc={nodeSymbol}/>
                <LogoDisplay lgName = "MYSQL" lgSrc={mySqlSymbol}/>
                <LogoDisplay lgName = "FLUTTER" lgSrc={flutterSymbol}/>
                <LogoDisplay lgName = "SWIFT" lgSrc={swiftSymbol}/>
                </div>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-32">
                    <div className="flex flex-col text-center items-center justify-center">
                        <img src={espSymbol} alt="Español" className="w-12 h-12" />
                        <h1 className="text-center text-xl">SPANISH</h1>
                    </div>
                    <div className="flex flex-col text-center items-center justify-center">
                        <img src={engSymbol} alt="English" className="w-12 h-12" />
                        <h1 className="text-center text-xl">ENGLISH</h1>
                    </div>
                </div>
            </div>
        </section>
    );
    }
    