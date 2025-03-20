import FirstProject from "../components/firstProject";
import SecondProject from "../components/secondProject";

export default function PortfolioSc() {

    return (
        <section className="w-full flex flex-col items-center px-10">
            <FirstProject></FirstProject>
            <a
                href="https://apps.apple.com/us/app/weeii/id6467936370" // Replace with your desired URL
                target="_blank" // This opens the link in a new tab
                rel="noopener noreferrer" // Security measure for external links
            >
                <button
                    className="p-3 bg-gradient-to-b from-purple-700 to-blue-900 rounded-full text-white hover:bg-blue-700 transition duration-300"
                >
                    Check this app
                </button>
            </a>
            <SecondProject></SecondProject>
            <a
                href="https://carlopedrozaotorrino.com/" // Replace with your desired URL
                target="_blank" // This opens the link in a new tab
                rel="noopener noreferrer" // Security measure for external links
            >
                <button
                    className="p-3 bg-gradient-to-b from-purple-700 to-blue-900 rounded-full text-white hover:bg-blue-700 transition duration-300"
                >
                    Check this website
                </button>
            </a>
        </section>
    );
}
