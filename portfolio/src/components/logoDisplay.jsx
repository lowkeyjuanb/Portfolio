export default function logoDisplay({ lgSrc, lgName }) {
    return (
      <section className="flex flex-col text-center items-center justify-center">
        <img src={lgSrc} alt={lgName} className="w-12 h-12" />
        <h1 className="text-center text-xl">{lgName}</h1>
      </section>
    );
  }