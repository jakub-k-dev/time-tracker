import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLayoutEffect, useRef, useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
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
    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
      {faqs.map((faqItem) => (
        <FaqItem {...faqItem} key={faqItem.question} />
      ))}
    </dl>
  );
}

type FaqItemProps = {
  question: string;
  answer: string;
};

function FaqItem({ answer, question }: FaqItemProps) {
  const [height, setHeight] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    answerRef.current &&
      setHeight(answerRef.current.getBoundingClientRect().height + 16);
  }, [isOpen]);

  return (
    <Disclosure as="div" key={question} className="pt-6">
      <dt>
        <Disclosure.Button
          className="group flex w-full items-start justify-between text-left text-gray-900"
          onClick={() => setIsOpen((a) => !a)}
        >
          <span className="text-base font-semibold leading-7">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            <ChevronDownIcon
              className="group-aria-expanded:rotate-180 transition duration-500 h-6 w-6"
              aria-hidden="true"
            />
          </span>
        </Disclosure.Button>
      </dt>
      <div
        style={{ height: isOpen ? height : 0 }}
        className="transition-all duration-500 overflow-hidden"
      >
        <Disclosure.Panel
          ref={answerRef}
          as="dd"
          className="my-2 pr-12"
          unmount={false}
        >
          <p className="text-base leading-7 text-gray-600">{answer}</p>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
}
