import githubSymbol from '../assets/github-symbol.svg';
import linkedinSymbol from '../assets/linkedin-symbol.svg';
import mailSymbol from '../assets/mail-symbol.svg';
import arrowSymbol from '../assets/arrow-symbol.svg';

export default function HomeSc() {
  const handleArrowClick = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center gradient-bg pt-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      <div className="gradient-container text-[#f1f1f1]">
        <div className="g1"></div>
        <h2 className="text-4xl sm:text-5xl justify-center font-extralight text-container">
          Hi, I'm Juan.
        </h2>
        <h1 className="text-5xl sm:text-6xl justify-center text-container">
          I'm a software developer.
        </h1>
        <div className="flex gap-4 justify-center mt-8 text-container">
          <a href="mailto:this.is.juanb@gmail.com" className="text-lg">
            <img
                src={mailSymbol}
                alt="Mail Icon"
                className="w-9 h-9 filter invert opacity-80"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/juandediosbarrera/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            <img
              src={linkedinSymbol}
              alt="Linkedin Icon"
              className="w-9 h-9 filter invert opacity-80"
            />
          </a>
          <a
            href="https://github.com/lowkeyjuanb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg"
          >
            <img
              src={githubSymbol}
              alt="Github Icon"
              className="w-9 h-9 filter invert opacity-80"
            />
          </a>
        </div>
      </div>
      
      {/* Bouncing Arrow */}
      <div className="flex flex-col justify-center pt-60 gap-5 text-white text-container">
        View selected projects
        <img
          src={arrowSymbol}
          alt="arrow"
          className="h-8 filter invert animate-bounce cursor-pointer"
          onClick={handleArrowClick}
        />
      </div>
    </section>
  );
}
