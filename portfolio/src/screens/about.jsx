import AboutKeyPoints from "../components/aboutKeyPoints";
export default function AboutSc() {
return (
    <section className="w-full min-h-screen flex flex-col items-center py-20">
        <h1 className="text-2xl font-semibold border-4 border-black p-6 text-center">
            ABOUT ME
        </h1>
        <p className="mt-10 text-lg max-w-4xl text-center">
            Nulla in velit a metus rhoncus tempus. Nulla congue nulla vel sem varius finibus. 
            Sed ornare sit amet lorem sed viverra. In vel urna quis libero viverra facilisis ut ac est.
        </p>
        <svg width="100" height="4" className="m-20">
        <rect width="100" height="4" fill="black" />
        </svg>
        <div className="flex w-full gap-10">
            <AboutKeyPoints 
            keyPointName="DEVELOPMENT" 
            keyPointDesc="I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job." 
            />
            <AboutKeyPoints 
                keyPointName="MAINTENANCE" 
                keyPointDesc="I can design the site based on your needs and suggestions. I can also design the site from scratch and consult you during the job." 
            />
        </div>
        <svg width="100" height="4" className="m-20">
        <rect width="100" height="4" fill="black" />
        </svg>
    </section>
);
}
