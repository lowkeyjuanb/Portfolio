export default function AboutKeyPoints({ keyPointName, keyPointDesc }) {
  return (
    <section className="text-center">
      <h2 className="text-2xl font-semibold">{keyPointName}</h2>
      <p className="text-lg mt-2">{keyPointDesc}</p>
    </section>
  );
}