import React from 'react';
import { FaUserPlus, FaLink, FaDollarSign } from 'react-icons/fa';

const UserPlus = FaUserPlus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkSign = FaLink as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const DollarSign = FaDollarSign as unknown as React.FC<React.SVGProps<SVGSVGElement>>;


 const steps = [
  {
    title: "Sign Up",
    icon: <UserPlus className="text-primary mb-3 icon-size" />,
    text: "Register for our affiliate program in few minutes.",
  },
  {
    title: "Share Your Link",
    icon: <LinkSign className="text-primary mb-3 icon-size" />,
    text: "Get a unique referral link to share anywhere.",
  },
  {
    title: "Earn Commission",
    icon: <DollarSign className="text-primary mb-3 icon-size" />,
    text: "Earn lifetime commissions for every paying user.",
  },
];


const HowItWorks = () => (
  <section className="py-5 text-center">
    <div className="container">
      <h2 className="fw-bold mb-5">How It Works</h2>
      <div className="row g-4">
        {steps.map((step, i) => (
          <div key={i} className="col-md-4">
            <div className="p-4 border rounded-4 shadow-sm h-100">
              {step.icon}
              <h5 className="fw-semibold mb-2">{step.title}</h5>
              <p className="text-success">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      <style>{`
       .icon-size {
  font-size: 3rem; /* or 32px */
}

      `}</style>
  </section>
);

export default HowItWorks;
