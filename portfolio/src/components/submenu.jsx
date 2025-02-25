function ButtonForSubmenu({ buttonName, targetId }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Add a conditional check for "Contact" button
  const buttonStyle = buttonName === "Contact" 
    ? "bg-gradient-to-b from-purple-700 to-blue-900 text-white" // White background, black text for Contact
    : "text-[#f1f1f1]"; // Default text color for other buttons

  return (
    <button className={`p-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default function Submenu() {
  return (
    <section className="w-full fixed top-0 left-0 z-50">
      <div className="flex shadow-md rounded-b w-fit justify-center gap-4 p-5 max-w-[1200px] mx-auto bg-black bg-opacity-50">
        <ButtonForSubmenu buttonName="Home" targetId="home" />
        <ButtonForSubmenu buttonName="Portfolio" targetId="portfolio" />
        <ButtonForSubmenu buttonName="About" targetId="about" />
        <ButtonForSubmenu buttonName="Skills" targetId="skills" />
        <ButtonForSubmenu buttonName="Contact" targetId="contact" />
      </div>
    </section>
  );
}
