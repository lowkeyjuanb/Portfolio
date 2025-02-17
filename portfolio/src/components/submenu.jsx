function ButtonForSubmenu({ buttonName, targetId }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Add a conditional check for "Contact" button
  const buttonStyle = buttonName === "Contact" 
    ? "bg-white text-black" // White background, black text for Contact
    : "text-[#f1f1f1]"; // Default text color for other buttons

  return (
    <button className={`p-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default function Submenu() {
  return (
      <section className="w-full bg-[#0B0B0B] shadow-md rounded-b">
          <div className="flex justify-end gap-4 p-3 px-5">
              <ButtonForSubmenu buttonName="Home" targetId="home" />
              <ButtonForSubmenu buttonName="About Me" targetId="about" />
              <ButtonForSubmenu buttonName="Skills" targetId="skills" />
              <ButtonForSubmenu buttonName="Portfolio" targetId="portfolio" />
              <ButtonForSubmenu buttonName="Contact" targetId="contact" />
          </div>
    </section>
  );
}
