import profile from "../assets/profile.jpg";

export default function AboutSc() {
  return (
    <section className="w-full h-fit flex flex-col pt-32 px-20 bg-gradient-to-b from-black via-blue-950 to-black">
        <h1 className="text-4xl pb-5 text-center lg:text-left">
            About Me
        </h1>
        <div className="flex flex-col-reverse sm:flex-col lg:flex-row lg:gap-2 items-center justify-between">
            <div className="flex flex-col items-left text-center lg:text-left max-w-5xl lg:pb-0">
                <p className="text-sm lg:text-lg text-gray-300 mb-5 justify-left">
                    I’m a <strong>Full-Stack Developer</strong> with a deep passion for creating scalable and innovative software solutions. I graduated <strong>magna cum laude</strong> with a <strong>Bachelor's in Electronic Cybernetics Engineering</strong>, and I’m skilled in <strong>JavaScript, Python, Dart, SQL</strong>, and more. Throughout my career, I’ve collaborated with teams to design and develop applications that solve real-world problems.
                </p>
                <p className="text-sm lg:text-lg text-gray-300 justify-left">
                    My approach blends <strong>technical proficiency</strong> with a focus on delivering results. Whether it’s building user-friendly <strong>front-end interfaces</strong> or crafting optimized <strong>back-end systems</strong>, I’m committed to helping businesses succeed through tailored solutions. I thrive in dynamic environments, constantly seeking ways to <strong>learn</strong> and <strong>grow</strong>.
                </p>
            </div>
            <img
                src={profile}
                className="w-44 h-44 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl shadow-purple-500/50 my-5 sm:my-0"
                alt="Profile"
            />
        </div>
    </section>
  );
}
