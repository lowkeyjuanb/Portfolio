import TitleSquare from "../components/titleSquare";
import htmlSymbol from '../assets/html-lg.svg'
import cssSymbol from '../assets/css-lg.svg'
import jsSymbol from '../assets/js-lg.svg'
import reactSymbol from '../assets/react-lg.svg'
import LogoDisplay from "../components/logoDisplay";
export default function SkillsSc() {
    return (
        <section className="w-full flex flex-col items-center my-10">
            <TitleSquare titleSquare="SKILLS"/>
            
                <div className="flex flex-col items-start w-full my-10">
                    <h1 className="text-2xl font-semibold p-6 text-left">
                        USING NOW:
                    </h1>
                    <div className="flex flex-row items-center">
                    <LogoDisplay lgName = "HTML5" lgSrc={htmlSymbol}/>
                    <LogoDisplay lgName = "REACT" lgSrc={reactSymbol}/>
                    <LogoDisplay lgName = "CSS" lgSrc={cssSymbol}/>
                    <LogoDisplay lgName = "JAVASCRIPT" lgSrc={jsSymbol}/>
                    </div>
                    <h1 className="text-2xl font-semibold p-6 text-left">
                        LEARNING:
                    </h1>

                    <h1 className="text-2xl font-semibold p-6 text-left">
                        OTHER SKILLS:
                    </h1>

                </div>
            
        </section>
    );
    }
    