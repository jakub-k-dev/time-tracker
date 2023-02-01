import { Tile } from "src/components";

type Faq = {
  question: string;
  answer: string;
};

const faq: Faq[] = [
  { question: "Random", answer: "content" },
  {
    question: "How to add entry to time table?",
    answer: "Multiple options: but basically, add it",
  },
  { question: "Shouldn't you sleep rn?", answer: "Yes, I should" },
  {
    question: "How drunk are you?",
    answer: "I'm not as think as you drunk I am",
  },
  {
    question: "CN joke?",
    answer:
      "When God said, “Let there be light!” Chuck Norris said, “Say Please.”",
  },
];

export default function FaqList() {
  return (
    <div className="flex flex-col gap-4">
      {faq.map(({ question, answer }) => (
        <Tile title={question}>{answer}</Tile>
      ))}
    </div>
  );
}
