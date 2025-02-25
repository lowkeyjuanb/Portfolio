import profile from "../assets/profile.jpg";

export default function AboutSc() {
  return (
    <section className="w-full h-fit flex flex-row gap-24 justify-center items-center pt-32 px-10 bg-gradient-to-b from-black via-blue-950 to-black">
        <div className="flex flex-col items-left text-left max-w-5xl">
            <h1 className="text-4xl pb-5">
                About Me
            </h1>
            <p className="text-lg text-gray-300 mb-5 justify-left">
                I’m a <strong>Full-Stack Developer</strong> with a deep passion for creating scalable and innovative software solutions. I graduated <strong>magna cum laude</strong> with a <strong>Bachelor's in Electronic Cybernetics Engineering</strong>, and I’m skilled in <strong>JavaScript, Python, Dart, SQL</strong>, and more. Throughout my career, I’ve collaborated with teams to design and develop applications that solve real-world problems.
            </p>
            <p className="text-lg text-gray-300 justify-left">
                My approach blends <strong>technical proficiency</strong> with a focus on delivering results. Whether it’s building user-friendly <strong>front-end interfaces</strong> or crafting optimized <strong>back-end systems</strong>, I’m committed to helping businesses succeed through tailored solutions. I thrive in dynamic environments, constantly seeking ways to <strong>learn</strong> and <strong>grow</strong>.
            </p>
        </div>
        <div className="flex justify-center mt-10">
        <img
            src={profile}
            className="w-72 h-72 rounded-full object-cover shadow-2xl shadow-purple-500/50"
            alt="Profile"
        />

        </div>
    </section>
  );
}
