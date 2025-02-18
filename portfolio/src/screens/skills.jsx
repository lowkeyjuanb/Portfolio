import TitleSquare from "../components/titleSquare";
import htmlSymbol from '../assets/html-lg.svg'
import cssSymbol from '../assets/css-lg.svg'
import jsSymbol from '../assets/js-lg.svg'
import reactSymbol from '../assets/react-lg.svg'
import githubSymbol from '../assets/github-symbol.svg'
import nodeSymbol from '../assets/node-lg.svg'
import cplusSymbol from '../assets/cplusplus-lg.svg'
import mySqlSymbol from '../assets/mysql-lg.svg'
import espSymbol from '../assets/esp-lg.svg'
import engSymbol from '../assets/en-lg.svg'
import LogoDisplay from "../components/logoDisplay";
export default function SkillsSc() {
    return (
        <section className="w-full flex flex-col items-center my-10 px-10">
            <TitleSquare titleSquare="SKILLS"/>
            
                <div className="flex flex-col items-left w-full my-10">
                    <h1 className="text-2xl font-semibold p-6 text-left self-start">
                        USING NOW:
                    </h1>
                    <div className="flex flex-row gap-32">
                    <LogoDisplay lgName = "HTML5" lgSrc={htmlSymbol}/>
                    <LogoDisplay lgName = "REACT" lgSrc={reactSymbol}/>
                    <LogoDisplay lgName = "CSS" lgSrc={cssSymbol}/>
                    <LogoDisplay lgName = "JAVASCRIPT" lgSrc={jsSymbol}/>
                    <LogoDisplay lgName = "GIT" lgSrc={githubSymbol}/>
                    </div>
                    <h1 className="text-2xl font-semibold p-6 text-left">
                        LEARNING:
                    </h1>
                    <div className="flex flex-row gap-32">
                    <LogoDisplay lgName = "NODEJS" lgSrc={nodeSymbol}/>
                    <LogoDisplay lgName = "C++" lgSrc={cplusSymbol}/>
                    <LogoDisplay lgName = "MYSQL" lgSrc={mySqlSymbol}/>
                    </div>
                    <h1 className="text-2xl font-semibold p-6 text-left">
                        OTHER SKILLS:
                    </h1>
                    <div className="flex flex-row gap-32">
                    <LogoDisplay lgName = "ESPAÑOL" lgSrc={espSymbol}/>
                    <LogoDisplay lgName = "ENGLISH" lgSrc={engSymbol}/>
                    </div>
                </div>
            
        </section>
    );
    }
    