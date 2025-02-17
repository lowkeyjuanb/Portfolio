export default function TitleSquare({titleSquare}) {
    return (
      <section className="text-center">
        <h1 className="text-2xl font-semibold border-4 border-black p-6 text-center w-72">
            {titleSquare}
        </h1>
      </section>
    );
  }