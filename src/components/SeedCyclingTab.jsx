const SeedCyclingTab = () => {
  return (
    <div className="text-white p-6">
      <h2 className="text-3xl font-playfair mb-4">What is Seed Cycling?</h2>
      <p className="mb-4 text-base font-open-sans">
        Seed cycling is a natural approach to balance hormones by consuming
        specific seeds during different phases of the menstrual cycle.
      </p>

      <h3 className="text-2xl font-playfair mb-3">How It Works</h3>
      <p className="mb-4 text-base font-open-sans">
        During the Follicular Phase, consume flaxseeds and pumpkin seeds. In the
        Luteal Phase, switch to sesame and sunflower seeds.
      </p>

      <h3 className="text-2xl font-playfair mb-3">Seed Preparation Tips</h3>
      <ul className="list-disc list-inside mb-4 text-base font-open-sans">
        <li>Grind seeds fresh to enhance absorption.</li>
        <li>Store in a cool, dark place.</li>
        <li>Add to smoothies, salads, or yogurt.</li>
      </ul>

      <h3 className="text-2xl font-playfair mb-3">Benefits</h3>
      <ul className="list-disc list-inside mb-4 text-base font-open-sans">
        <li>Helps regulate hormones.</li>
        <li>Reduces PMS symptoms.</li>
        <li>Supports reproductive health.</li>
      </ul>

      {/* Static cycle chart can be added here if desired */}
    </div>
  );
};

export default SeedCyclingTab;
