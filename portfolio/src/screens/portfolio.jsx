import FirstProject from "../components/firstProject";
import SecondProject from "../components/secondProject";

export default function PortfolioSc() {

    return (
        <section className="w-full flex flex-col items-center px-10">
            <FirstProject></FirstProject>
            <SecondProject></SecondProject>
        </section>
    );
}
