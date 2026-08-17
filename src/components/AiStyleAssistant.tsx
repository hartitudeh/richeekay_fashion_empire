'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaRobot, FaUser } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { FiX, FiSend, FiMessageSquare, FiExternalLink, FiScissors, FiClock } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(212, 175, 55, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
`;

const bounceDots = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
`;

const FloatingBtn = styled.button<{ $open: boolean }>`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f4e798 0%, #d4af37 50%, #c9a227 100%);
  color: #0a0a0a;
  border: 2px solid #ffffff;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1500;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.7);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${pulseGlow} 2s infinite;

  &:hover {
    transform: scale(1.12) rotate(8deg);
    box-shadow: 0 15px 40px rgba(244, 231, 152, 0.9);
  }

  .badge-pulse {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #25d366;
    border: 2px solid #0a0a0a;
  }
`;

const ChatWidgetContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  bottom: 102px;
  right: 28px;
  width: 380px;
  max-width: calc(100vw - 32px);
  height: 540px;
  max-height: calc(100vh - 140px);
  background: rgba(14, 14, 14, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #d4af37;
  border-radius: 12px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95);
  z-index: 1500;
  display: flex;
  flex-direction: column;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '30px')}) scale(${({ $open }) => ($open ? 1 : 0.95)});
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  @media (max-width: 480px) {
    right: 16px;
    left: 16px;
    width: auto;
    bottom: 96px;
  }

  .chat-header {
    background: linear-gradient(90deg, #0a0a0a 0%, #1f1f1f 100%);
    padding: 14px 18px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.4);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bot-title {
      display: flex;
      align-items: center;
      gap: 10px;

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        border: 1px solid #f4e798;
      }

      h4 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.05rem;
        color: #ffffff;
        margin: 0;
        line-height: 1.2;

        span {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          color: #d4af37;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      }
    }

    button {
      background: none;
      border: none;
      color: #d4af37;
      font-size: 1.3rem;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: rotate(90deg);
        color: #ffffff;
      }
    }
  }

  .chat-messages {
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.05), transparent 70%);

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(212, 175, 55, 0.3);
      border-radius: 2px;
    }
  }

  .msg-row {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &.bot {
      align-items: flex-start;
    }

    &.user {
      align-items: flex-end;
    }
  }

  .msg-bubble {
    max-width: 86%;
    padding: 11px 15px;
    font-size: 0.85rem;
    line-height: 1.45;
    border-radius: 8px;
    white-space: pre-line;

    &.bot {
      background: #1f1f1f;
      border: 1px solid rgba(212, 175, 55, 0.35);
      color: #f8f5ef;
      border-top-left-radius: 2px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }

    &.user {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-weight: 600;
      border-top-right-radius: 2px;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }
  }

  .whatsapp-card {
    margin-top: 8px;
    background: rgba(37, 211, 102, 0.12);
    border: 1px solid #25d366;
    padding: 12px 14px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    p {
      font-size: 0.78rem;
      color: #ffffff;
      margin: 0;
      line-height: 1.3;

      strong {
        color: #25d366;
      }
    }

    a {
      background: #25d366;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.82rem;
      padding: 10px 14px;
      text-decoration: none;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);

      &:hover {
        background: #1ebd59;
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(37, 211, 102, 0.6);
      }
    }
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    background: #1f1f1f;
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 8px;
    width: fit-content;

    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #d4af37;
      animation: ${bounceDots} 1.4s infinite ease-in-out both;

      &:nth-child(1) { animation-delay: -0.32s; }
      &:nth-child(2) { animation-delay: -0.16s; }
    }
  }

  .prompt-chips {
    padding: 10px 14px;
    display: flex;
    gap: 6px;
    overflow-x: auto;
    background: #0a0a0a;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    &::-webkit-scrollbar {
      display: none;
    }

    .chip {
      white-space: nowrap;
      background: #191919;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #d4af37;
      font-size: 0.72rem;
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        background: #d4af37;
        color: #0a0a0a;
        font-weight: 600;
      }
    }
  }

  .chat-input-row {
    padding: 12px 14px;
    background: #0a0a0a;
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    display: flex;
    gap: 8px;
    align-items: center;

    input {
      flex-grow: 1;
      background: #171717;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #ffffff;
      padding: 10px 14px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: #d4af37;
      }

      &::placeholder {
        color: #777777;
      }
    }

    button {
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover:not(:disabled) {
        background: #f4e798;
        transform: scale(1.05);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  showWhatsAppBtn?: boolean;
  linkRoute?: string;
  linkText?: string;
}

export const AiStyleAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '👑 Welcome to RICHEEKAY FASHION EMPIRE!\nI am your AI Luxury Style Assistant. Ask me anything about our haute couture gowns, bespoke native tailoring, 100% virgin wigs, or express delivery timelines!'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, isTyping, open]);

  // Intelligent Response Engine
  const generateResponse = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase().trim();

    // Check for Human Concierge / Real Person Escalation triggers
    const humanTriggers = [
      'human',
      'person',
      'real person',
      'agent',
      'talk to someone',
      'speak to someone',
      'speak with someone',
      'representative',
      'whatsapp',
      'phone',
      'call',
      'manager',
      'owner',
      'customer care',
      'bridal consultation',
      'complaint'
    ];

    const needsHuman = humanTriggers.some((trigger) => q.includes(trigger));

    if (needsHuman) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `I understand you would like to speak directly with a real person! 💎\n\nOur Head Fashion Designer & Senior VIP Human Concierge Team are standing by right now on our Direct VIP WhatsApp Line to assist you personally with custom orders, bridal fittings, or urgent inquiries.`,
        showWhatsAppBtn: true
      };
    }

    // Brand Heritage, Story, Partnership, Investment & Wholesale
    if (
      q.includes('brand') ||
      q.includes('about') ||
      q.includes('partner') ||
      q.includes('invest') ||
      q.includes('wholesale') ||
      q.includes('b2b') ||
      q.includes('heritage') ||
      q.includes('story') ||
      q.includes('history') ||
      q.includes('founder') ||
      q.includes('know more') ||
      q.includes('company') ||
      q.includes('who are you')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `👑 **RICHEEKAY FASHION EMPIRE | Brand Heritage & Global Partnership**\n\nEstablished over a decade ago, RICHEEKAY is a premier luxury fashion house celebrated for redefining African elegance and haute couture across Africa, Europe, and North America.\n\n✨ **Why Partner & Champion RICHEEKAY?**\n• **Master Artisanship**: Hand-crafted Aso-Ebi velvet gowns, Senator suits, and 100% Virgin HD Lace Wigs built by master couturiers.\n• **Global Reach & Rapid Logistics**: Physical boutiques in Victoria Island (Lagos), Maitama (Abuja), and Mayfair (London), paired with 3–5 day DHL Worldwide fulfillment.\n• **B2B & Wholesale Opportunities**: We collaborate with international retail distributors, luxury boutique buyers, event planners, and fashion investors for private label manufacturing and regional franchise expansion.\n\nWe invite you to join our growing global fashion legacy!`,
        linkRoute: '/about',
        linkText: 'Read Full Brand Heritage Story'
      };
    }

    // Bespoke Tailoring & Custom Fitting
    if (q.includes('tailor') || q.includes('sew') || q.includes('custom') || q.includes('fitting') || q.includes('aso-ebi') || q.includes('senator') || q.includes('measurement')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `✂️ **RICHEEKAY Bespoke Native Tailoring**:\nWe create custom-fitted Aso-Ebi velvet gowns, Senator wear, and structured corsets with a 48-72h turnaround!\n\nYou can submit your custom measurements directly online or visit our Ateliers in Lagos, Oyo State, and Osogbo (Osun State).`,
        linkRoute: '/tailoring',
        linkText: 'Open Custom Tailoring Studio'
      };
    }

    // Shipping, Order Tracking & Delivery
    if (q.includes('delivery') || q.includes('ship') || q.includes('track') || q.includes('order') || q.includes('lagos') || q.includes('oyo') || q.includes('osogbo') || q.includes('osun') || q.includes('dhl') || q.includes('how long')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `🚚 **Express Shipping & Delivery**:\n• Lagos, Oyo State & Osogbo (Osun State): Express 24-48h Delivery\n• DHL International (USA, UK, Canada, Europe): 3-5 Days\n\nYou can track your active orders anytime using your Order ID!`,
        linkRoute: '/order-tracking',
        linkText: 'Track Your Active Order'
      };
    }

    // Product Categories & Recommendations
    if (q.includes('gown') || q.includes('dress') || q.includes('wig') || q.includes('hair') || q.includes('heel') || q.includes('shoe') || q.includes('bag') || q.includes('handbag') || q.includes('collection') || q.includes('item') || q.includes('shop') || q.includes('sell')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `👗 **Our 100% Original Haute Couture Collections**:\n• Royal Aso-Ebi Velvet Gala Gowns\n• 30" HD Lace 100% Virgin Hair Wigs\n• Hand-crafted Metallic Stiletto Heels\n• Executive Senator Suits & Handbags\n\nAll items are crafted with premium materials!`,
        linkRoute: '/shop',
        linkText: 'Explore Full Shop Catalog'
      };
    }

    // Prices & Payments
    if (q.includes('price') || q.includes('cost') || q.includes('naira') || q.includes('dollar') || q.includes('pound') || q.includes('paystack') || q.includes('card') || q.includes('transfer')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `💳 **Currency & Payment Options**:\nYou can switch store currencies anytime between NGN (₦), USD ($), and GBP (£) in the navbar!\n\nWe accept Paystack, Instant Bank Transfers, and Visa/Mastercard. Use coupon code **RICHEEKAY10** for 10% off your order!`
      };
    }

    // Store Locations & Address
    if (q.includes('store') || q.includes('location') || q.includes('address') || q.includes('where') || q.includes('visit') || q.includes('atelier') || q.includes('boutique') || q.includes('phone') || q.includes('number') || q.includes('contact')) {
      return {
        id: Date.now().toString(),
        sender: 'bot',
        text: `📍 **Visit Our Luxury Boutiques & Contact Direct Lines**:\n• 🇳🇬 **Lagos Flagship**: Plot 14 Victoria Island, Lagos (Call: 07048113372 | WhatsApp: 08084278440)\n• 🇳🇬 **Oyo State Hub**: Executive Bodija District, Ibadan, Oyo State (Call/WhatsApp: 08139212462)\n• 🇳🇬 **Osun State Atelier**: Luxury Fashion Arcade, Osogbo, Osun State (Call/WhatsApp: 07083777336)`
      };
    }

    // Default Smart Fallback Response (No WhatsApp card unless human requested)
    return {
      id: Date.now().toString(),
      sender: 'bot',
      text: `Thank you for chatting with RICHEEKAY FASHION EMPIRE! 👑\n\nI am here to assist with custom tailoring fittings, haute couture gowns, 100% virgin wigs, delivery status, and brand partnership opportunities. What would you like to explore?`
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <FloatingBtn $open={open} onClick={() => setOpen(!open)} title="RICHEEKAY AI Interactive Concierge">
        <div className="badge-pulse" />
        {open ? (
          <FiX />
        ) : (
          <img
            src="/botlogo.png"
            alt="RICHEEKAY AI Bot Logo"
            style={{
              width: '42px',
              height: '42px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
            }}
          />
        )}
      </FloatingBtn>

      <ChatWidgetContainer $open={open}>
        <div className="chat-header">
          <div className="bot-title">
            <div className="avatar" style={{ padding: '3px', background: '#0a0a0a' }}>
              <img src="/botlogo.png" alt="RICHEEKAY AI Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <h4>RICHEEKAY AI Concierge</h4>
              <span>Interactive Style Consultant</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`msg-row ${m.sender}`}>
              <div className={`msg-bubble ${m.sender}`}>{m.text}</div>

              {m.linkRoute && (
                <Link
                  href={m.linkRoute}
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    marginTop: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <FiExternalLink /> {m.linkText}
                </Link>
              )}

              {m.showWhatsAppBtn && (
                <div className="whatsapp-card">
                  <p>
                    Need a <strong>real person</strong> to answer right now? Chat directly with our Human VIP Concierge:
                  </p>
                  <a
                    href="https://wa.me/2348084278440?text=Hello%20RICHEEKAY%20VIP%20Concierge!%20I%20need%20personal%20assistance%20with%20my%20luxury%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp style={{ fontSize: '1.2rem' }} /> CHAT DIRECT ON WHATSAPP VIP LINE
                  </a>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="msg-row bot">
              <div className="typing-indicator">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Interactive Chat Text Input Bar */}
        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Ask AI a question about our brand, tailoring, or orders..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => handleSend()} disabled={!inputValue.trim() || isTyping} title="Send Message">
            <FiSend />
          </button>
        </div>
      </ChatWidgetContainer>
    </>
  );
};
