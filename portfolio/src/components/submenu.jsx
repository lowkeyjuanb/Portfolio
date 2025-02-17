function ButtonForSubmenu({ buttonName, targetId }) {
    const handleClick = () => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    };
  
    return <button className="text-[#f1f1f1]" onClick={handleClick}>{buttonName}</button>;
  }
  
  export default function Submenu() {
    return (
        <section className="w-full bg-[#0B0B0B] shadow-md ">
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
  