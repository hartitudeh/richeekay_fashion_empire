'use client';

import React, { useState } from 'react';
import { FaWhatsapp, FaRobot } from 'react-icons/fa6';
import { FiX, FiSend } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import styled from 'styled-components';

const FloatingBtn = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
  color: #0a0a0a;
  border: 2px solid #f4e798;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1500;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.6);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    box-shadow: 0 12px 35px rgba(244, 231, 152, 0.8);
  }
`;

const ChatWidgetContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  bottom: 96px;
  right: 28px;
  width: 360px;
  height: 480px;
  background: #141414;
  border: 1px solid #d4af37;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
  z-index: 1500;
  display: flex;
  flex-direction: column;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '20px')});
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    right: 12px;
    left: 12px;
    width: auto;
  }

  .chat-header {
    background: #0a0a0a;
    padding: 14px 18px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.1rem;
      color: #d4af37;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button {
      background: none;
      border: none;
      color: #d4af37;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }

  .chat-messages {
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .msg {
      max-width: 85%;
      padding: 10px 14px;
      font-size: 0.82rem;
      line-height: 1.4;

      &.bot {
        background: #1f1f1f;
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: #ffffff;
        align-self: flex-start;
      }

      &.user {
        background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
        color: #0a0a0a;
        font-weight: 600;
        align-self: flex-end;
      }
    }
  }

  .prompt-chips {
    padding: 8px 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    background: #0a0a0a;

    .chip {
      background: #1f1f1f;
      border: 1px solid rgba(212, 175, 55, 0.4);
      color: #d4af37;
      font-size: 0.7rem;
      padding: 4px 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #d4af37;
        color: #0a0a0a;
      }
    }
  }

  .whatsapp-direct {
    padding: 12px 16px;
    background: #0a0a0a;
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    text-align: center;

    a {
      background: #25d366;
      color: #ffffff;
      font-weight: bold;
      font-size: 0.8rem;
      padding: 8px 16px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      justify-content: center;

      &:hover {
        background: #1ebd59;
      }
    }
  }
`;

export const AiStyleAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome to RICHEEKAY FASHION EMPIRE! I am your AI Luxury Style Consultant. What outfit or occasion can I assist you with today?'
    }
  ]);

  const handleChipClick = (promptText: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: promptText },
      {
        sender: 'bot',
        text: `For ${promptText.toLowerCase()}, I highly recommend our Royal Gold Silk Gala Evening Gown paired with Metallic Gold Stiletto Heels and 30" HD Virgin Hair. Would you like to book custom tailoring or chat directly on WhatsApp?`
      }
    ]);
  };

  return (
    <>
      <FloatingBtn onClick={() => setOpen(!open)} title="RICHEEKAY AI Style Assistant & WhatsApp">
        {open ? <FiX /> : <HiSparkles />}
      </FloatingBtn>

      <ChatWidgetContainer $open={open}>
        <div className="chat-header">
          <h4>
            <FaRobot style={{ color: '#D4AF37' }} /> AI Luxury Style Consultant
          </h4>
          <button onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`msg ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="prompt-chips">
          <div className="chip" onClick={() => handleChipClick('Outfit for Saturday Wedding')}>
            ✨ Saturday Wedding Aso-Ebi
          </div>
          <div className="chip" onClick={() => handleChipClick('Executive Corporate Suit')}>
            💼 Executive Power Suit
          </div>
          <div className="chip" onClick={() => handleChipClick('Bespoke Senator Material')}>
            ✂️ Senator Material Tailoring
          </div>
        </div>

        <div className="whatsapp-direct">
          <a
            href="https://wa.me/2348007424335?text=Hello%20RICHEEKAY%20FASHION%20EMPIRE,%20I%20would%20like%20to%20inquire%20about%20custom%20tailoring%20and%20luxury%20collections."
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp style={{ fontSize: '1.1rem' }} /> Chat Direct on WhatsApp VIP Line
          </a>
        </div>
      </ChatWidgetContainer>
    </>
  );
};
