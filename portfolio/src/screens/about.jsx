import AboutKeyPoints from "../components/aboutKeyPoints";
import TitleSquare from "../components/titleSquare";
export default function AboutSc() {
return (
    <section className="w-full flex flex-col items-center pt-20 px-10">
         <div className="absolute pt-32 w-[300px] bg-gradient-to-t from-black to-blue-700 blur-3xl rounded-full opacity-100 ">
        </div>
        <div className='relative'>
            <h1 className='w-full text-4xl pb-10 mt-3'>
                About me.
            </h1>
        <p className="text-lg max-w-5xl text-center">
        My passion for creating innovative solutions helps me support businesses in reaching their goals. <br/>
        I thrive in collaborative environments, bringing technical skills and a problem-solving mindset to every project I work on.
        </p>
        </div>
        <svg width="100" height="4" className="m-20">
        <rect width="100" height="4" fill="black" />
        </svg>
        <div className="flex w-full gap-10">
        <AboutKeyPoints 
            keyPointName="Development" 
            keyPointDesc="I build custom web applications, from front-end to back-end, tailored to your business needs. I work closely with you to create user-friendly and high-performing websites." 
        />

        <AboutKeyPoints 
            keyPointName="Maintenance" 
            keyPointDesc="I provide ongoing website support to ensure smooth performance, fix bugs, and keep your site secure and up-to-date as your business evolves." 
        />

        </div>
        <svg width="100" height="4" className="mt-20">
        <rect width="100" height="4" fill="black" />
        </svg>
    </section>
);
}
