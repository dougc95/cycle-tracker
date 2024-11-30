import { useState } from "react";
import faqData from "./faq.data";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-3xl font-playfair mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-600">
            <button
              className="w-full text-left py-2 font-semibold flex justify-between items-center"
              onClick={() => toggleQuestion(index)}
            >
              {item.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="py-2 text-base font-open-sans">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
