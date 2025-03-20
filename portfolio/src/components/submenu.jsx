import { useState } from "react";
function ButtonForSubmenu({ buttonName, targetId, onClick }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    if (onClick) onClick(); // Close menu on mobile
  };

  const buttonStyle =
    buttonName === "Contact"
      ? "bg-gradient-to-b from-purple-700 to-blue-900 text-white"
      : "text-[#f1f1f1]";

  return (
    <button className={`p-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default function Submenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center bg-black bg-opacity-50 shadow-md p-4 max-w-[1200px] mx-auto rounded-b">
        {/* Title or Logo */}
        <div className="text-white text-lg font-bold">My Portfolio</div>
        {/* Hamburger Icon */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4">
          <ButtonForSubmenu buttonName="Home" targetId="home" />
          <ButtonForSubmenu buttonName="Portfolio" targetId="portfolio" />
          <ButtonForSubmenu buttonName="About" targetId="about" />
          <ButtonForSubmenu buttonName="Skills" targetId="skills" />
          <ButtonForSubmenu buttonName="Contact" targetId="contact" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col bg-black bg-opacity-80 p-4 gap-4 lg:hidden">
          <ButtonForSubmenu buttonName="Home" targetId="home" onClick={() => setIsOpen(false)} />
          <ButtonForSubmenu buttonName="Portfolio" targetId="portfolio" onClick={() => setIsOpen(false)} />
          <ButtonForSubmenu buttonName="About" targetId="about" onClick={() => setIsOpen(false)} />
          <ButtonForSubmenu buttonName="Skills" targetId="skills" onClick={() => setIsOpen(false)} />
          <ButtonForSubmenu buttonName="Contact" targetId="contact" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </section>
  );
}
