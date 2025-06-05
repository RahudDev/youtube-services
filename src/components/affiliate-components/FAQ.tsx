import React, { useState } from 'react';

const faqs = [
  {
    q: "How do I join?",
    a: "Simply sign up on our affiliate page and get your referral link instantly.",
  },
  {
    q: "When do I get paid?",
    a: "We process payouts weekly via PayPal or crypto wallets.",
  },
  {
    q: "Is there a minimum payout?",
    a: "Yes, the minimum payout is $10.",
  },
  {
    q: "How can I track my referrals?",
    a: "You will have access to a dashboard showing your traffic and earnings.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item mb-2 rounded">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.q}
                </button>
              </h2>
              <div className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}>
                <div className="accordion-body">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
