import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
      {faqs.map(({ question, answer }) => (
        <Disclosure as="div" key={question} className="pt-6">
          <dt>
            <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
              <span className="text-base font-semibold leading-7">
                {question}
              </span>
              <span className="ml-6 flex h-7 items-center">
                <ChevronDownIcon
                  className="group-aria-expanded:rotate-180 transition duration-500 h-6 w-6"
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel
            as="dd"
            className="transition mt-2 pr-12"
            unmount={false}
          >
            <p className="text-base leading-7 text-gray-600">{answer}</p>
          </Disclosure.Panel>
        </Disclosure>
      ))}
    </dl>
  );
}
