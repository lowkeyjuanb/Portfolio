import { useState } from "react";

export default function Footer() {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <footer className="flex flex-col w-full py-10 bg-black text-white">
      <div className="flex flex-row justify-center items-center gap-5 lg:gap-10">
        {/* The return to top button */}
        {scrolling && (
          <button
            onClick={scrollToTop}
            className="flex lg:text-lg text-xs p-3 bg-gradient-to-b from-purple-700 to-blue-900 rounded-full text-white hover:bg-blue-700 transition duration-300"
          >
            ↑ Return to the top ↑
          </button>
        )}
        <a href="mailto:this.is.juanb@gmail.com" className="lg:text-lg text-xs">
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/juandediosbarrera/"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:text-lg text-xs"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/lowkeyjuanb"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:text-lg text-xs"
        >
          GitHub
        </a>
      </div>

      <div className="text-center mt-4 text-sm">
        <p>© 2025 Juan de Dios Barrera. All rights reserved.</p>
      </div>
    </footer>
  );
}
