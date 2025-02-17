export default function logoDisplay({ lgSrc, lgName }) {
    return (
      <section className="text-center items-center justify-center">
        <img src={lgSrc} alt={lgName} className="w-9 h-9" />
        <h1 className="text-center">{lgName}</h1>
      </section>
    );
  }