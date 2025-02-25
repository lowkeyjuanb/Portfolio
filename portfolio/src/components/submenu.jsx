function ButtonForSubmenu({ buttonName, targetId }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  // Add a conditional check for "Contact" button
  const buttonStyle = buttonName === "Contact" 
    ? "bg-[#8824E0] text-white" // White background, black text for Contact
    : "text-[#f1f1f1]"; // Default text color for other buttons

  return (
    <button className={`p-2 px-4 rounded ${buttonStyle}`} onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default function Submenu() {
  return (
    <section className="w-full bg-black shadow-md rounded-b fixed top-0 left-0 z-50 justify-end">
      <div className="flex justify-end gap-4 p-5">
        <ButtonForSubmenu buttonName="Home" targetId="home" />
        <ButtonForSubmenu buttonName="Portfolio" targetId="portfolio" />
        <ButtonForSubmenu buttonName="About" targetId="about" />
        <ButtonForSubmenu buttonName="Skills" targetId="skills" />
        <ButtonForSubmenu buttonName="Contact" targetId="contact" />
      </div>
    </section>
  );
}
