'use client';

import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiHelpCircle, FiMessageSquare, FiScissors, FiTruck, FiShield, FiCreditCard } from 'react-icons/fi';
import styled from 'styled-components';

interface FaqItem {
  id: string;
  category: 'tailoring' | 'shipping' | 'wigs' | 'payments';
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'tailoring',
    categoryLabel: 'Bespoke Tailoring',
    question: 'How do I order custom-fitted Aso-Ebi or Senator outfits online?',
    answer: 'Simply select "Custom Fit" when choosing your size on any tailoring item, or click "Book Custom Fitting" in our navigation bar. You can enter your exact bust, waist, hip, and length measurements into our online studio. Our master couture tailors in Lagos will craft your ensemble to perfection.'
  },
  {
    id: 'faq-2',
    category: 'shipping',
    categoryLabel: 'Orders & Delivery',
    question: 'How fast is your delivery within Nigeria and internationally?',
    answer: 'Deliveries within Lagos are completed in 24–48 hours. Nationwide delivery across Nigeria takes 2–3 business days. International orders to the USA, UK, Canada, Europe, and UAE are shipped via DHL Express and arrive in 3–5 business days, fully tracked with signature delivery.'
  },
  {
    id: 'faq-3',
    category: 'wigs',
    categoryLabel: 'Virgin Wigs',
    question: 'Are your wigs 100% human virgin hair with HD invisible lace?',
    answer: 'Yes! Every RICHEEKAY wig is crafted using 100% unprocessed virgin human hair sourced from single donors. Our 30" HD Lace frontals feature pre-plucked hair lines and ultra-thin Swiss HD lace that melts completely into all skin complexions with zero glue visible.'
  },
  {
    id: 'faq-4',
    category: 'payments',
    categoryLabel: 'Payments & Returns',
    question: 'What currencies and payment methods do you accept?',
    answer: 'We accept payments in Nigerian Naira (NGN), US Dollars (USD), and British Pounds (GBP). You can pay securely using Visa, Mastercard, Verve, Paystack, Flutterwave, Stripe, or direct Bank Transfer. Currency can be switched anytime using the navbar dropdown.'
  },
  {
    id: 'faq-5',
    category: 'tailoring',
    categoryLabel: 'Bespoke Tailoring',
    question: 'Can I request emergency 24-hour rush tailoring for an event?',
    answer: 'Yes! We offer 24-hour VIP Rush Processing for urgent wedding or red-carpet engagements. Simply click "Chat Direct on WhatsApp VIP Line" or contact our AI Concierge for instant priority dispatch.'
  },
  {
    id: 'faq-6',
    category: 'payments',
    categoryLabel: 'Payments & Returns',
    question: 'What is your return or alteration policy for custom pieces?',
    answer: 'Ready-to-wear items can be exchanged within 7 days of delivery in unworn condition with tags intact. Custom-tailored pieces undergo rigorous quality checks prior to dispatch and include complimentary alteration support if minor fit adjustments are required.'
  },
  {
    id: 'faq-7',
    category: 'shipping',
    categoryLabel: 'Orders & Delivery',
    question: 'How do I track my order once it has been dispatched?',
    answer: 'You will receive an instant SMS and email with your tracking number upon dispatch. You can also click "Track Order" in our navigation bar or user dashboard to view real-time stage updates from fabric cutting to gold box packaging.'
  },
  {
    id: 'faq-8',
    category: 'tailoring',
    categoryLabel: 'Bespoke Tailoring',
    question: 'Do you offer corporate Senator suits for executive women or bridal parties?',
    answer: 'Absolutely! We specialize in custom group tailoring for bridal trains, corporate executive suites, and Aso-Ebi groups. We provide fabric swatches, custom color matching, and bulk group discounts.'
  }
];

const Section = styled.section`
  padding: 90px 24px;
  background: #0a0a0a;
  border-top: 1px solid rgba(212, 175, 55, 0.2);

  .inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;

    span {
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2.8rem;
      color: #ffffff;
      margin-top: 8px;
    }

    .divider {
      width: 70px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #d4af37 100%);
      margin: 14px auto 0;
    }
  }
`;

const SearchContainer = styled.div`
  max-width: 650px;
  margin: 0 auto 36px;
  position: relative;

  input {
    width: 100%;
    padding: 16px 20px 16px 52px;
    background: #141414;
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 30px;
    color: #ffffff;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

    &:focus {
      border-color: #d4af37;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    }

    &::placeholder {
      color: #888888;
    }
  }

  .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #d4af37;
    font-size: 1.2rem;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;

  button {
    padding: 10px 20px;
    background: #141414;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #cccccc;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #d4af37;
      color: #ffffff;
    }

    &.active {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      border-color: #d4af37;
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }
  }
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccordionCard = styled.div<{ $isOpen: boolean }>`
  background: #141414;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#d4af37' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${({ $isOpen }) => ($isOpen ? '0 6px 25px rgba(212, 175, 55, 0.2)' : 'none')};

  .card-header {
    padding: 22px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    cursor: pointer;
    background: ${({ $isOpen }) => ($isOpen ? 'rgba(212, 175, 55, 0.05)' : 'transparent')};

    .question-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.15rem;
      color: ${({ $isOpen }) => ($isOpen ? '#f4e798' : '#ffffff')};
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;

      .badge {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.68rem;
        background: rgba(212, 175, 55, 0.15);
        border: 1px solid rgba(212, 175, 55, 0.4);
        color: #d4af37;
        padding: 3px 8px;
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
      }
    }

    .toggle-icon {
      color: #d4af37;
      font-size: 1.4rem;
      transition: transform 0.3s ease;
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
      flex-shrink: 0;
    }
  }

  .card-body {
    max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: ${({ $isOpen }) => ($isOpen ? '0 24px 24px' : '0 24px')};

    p {
      font-size: 0.93rem;
      color: #dddddd;
      line-height: 1.7;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 16px;
    }
  }
`;

const ConciergeBanner = styled.div`
  margin-top: 50px;
  background: linear-gradient(135deg, #181818 0%, #101010 100%);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 8px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  .text-info {
    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      color: #ffffff;
      margin-bottom: 6px;
    }
    p {
      font-size: 0.88rem;
      color: #aaaaaa;
    }
  }

  .cta-btn {
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 14px 28px;
    border-radius: 30px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
    transition: all 0.3s ease;
    flex-shrink: 0;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.5);
    }
  }
`;

export const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="faq">
      <div className="inner">
        <div className="header">
          <span>HELP & VIP CONCIERGE</span>
          <h2>Frequently Asked Questions</h2>
          <div className="divider" />
        </div>

        {/* Live Search */}
        <SearchContainer>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search questions (e.g. shipping, custom fit, wigs, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        {/* Category Pills */}
        <FilterTabs>
          <button
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => setActiveCategory('all')}
          >
            All Questions
          </button>
          <button
            className={activeCategory === 'tailoring' ? 'active' : ''}
            onClick={() => setActiveCategory('tailoring')}
          >
            Bespoke Tailoring
          </button>
          <button
            className={activeCategory === 'shipping' ? 'active' : ''}
            onClick={() => setActiveCategory('shipping')}
          >
            Orders & Shipping
          </button>
          <button
            className={activeCategory === 'wigs' ? 'active' : ''}
            onClick={() => setActiveCategory('wigs')}
          >
            Virgin Wigs
          </button>
          <button
            className={activeCategory === 'payments' ? 'active' : ''}
            onClick={() => setActiveCategory('payments')}
          >
            Payments & Returns
          </button>
        </FilterTabs>

        {/* Accordion Cards */}
        <AccordionList>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <AccordionCard key={faq.id} $isOpen={isOpen}>
                  <div className="card-header" onClick={() => toggleAccordion(faq.id)}>
                    <div className="question-title">
                      <span className="badge">{faq.categoryLabel}</span>
                      {faq.question}
                    </div>
                    <FiChevronDown className="toggle-icon" />
                  </div>
                  <div className="card-body">
                    <p>{faq.answer}</p>
                  </div>
                </AccordionCard>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888888' }}>
              <FiHelpCircle style={{ fontSize: '2.5rem', color: '#d4af37', marginBottom: '12px' }} />
              <p style={{ fontSize: '1rem', color: '#cccccc' }}>
                No questions found matching "{searchQuery}".
              </p>
            </div>
          )}
        </AccordionList>

        {/* Direct WhatsApp Escalation Banner */}
        <ConciergeBanner>
          <div className="text-info">
            <h4>Still Have Questions?</h4>
            <p>Our VIP Styling Concierge is online to assist with custom fittings, order status & urgent deliveries.</p>
          </div>
          <a
            href="https://wa.me/2348000000000?text=Hello%20RICHEEKAY%20VIP%20Concierge,%20I%20have%20a%20question%20about%20my%20order."
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
          >
            <FiMessageSquare /> CHAT DIRECT ON WHATSAPP
          </a>
        </ConciergeBanner>
      </div>
    </Section>
  );
};
