'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0% {
    transform: scale(0.96);
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.2);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 0 45px rgba(212, 175, 55, 0.7), 0 0 90px rgba(212, 175, 55, 0.3), inset 0 0 25px rgba(212, 175, 55, 0.4);
  }
  100% {
    transform: scale(0.96);
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.2);
  }
`;

const rotateRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateRingReverse = keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const textShimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const PreloaderOverlay = styled.div<{ $fadeOut: boolean }>`
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at center, rgba(30, 25, 15, 0.98) 0%, rgba(10, 10, 10, 1) 80%);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ $fadeOut }) => ($fadeOut ? 0 : 1)};
  visibility: ${({ $fadeOut }) => ($fadeOut ? 'hidden' : 'visible')};
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease;
  pointer-events: ${({ $fadeOut }) => ($fadeOut ? 'none' : 'auto')};
`;

const LogoContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

const OuterOrbitRing = styled.div`
  position: absolute;
  inset: -14px;
  border: 1px dashed rgba(212, 175, 55, 0.5);
  border-radius: 50%;
  animation: ${rotateRing} 12s linear infinite;
`;

const InnerOrbitRing = styled.div`
  position: absolute;
  inset: -6px;
  border: 2px solid transparent;
  border-top-color: #d4af37;
  border-bottom-color: #f4e798;
  border-radius: 50%;
  animation: ${rotateRingReverse} 3s linear infinite;
`;

const AnimatedLogoBadge = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  background: #0a0a0a;
  border: 2px solid #d4af37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  animation: ${pulseGlow} 2.4s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.8));
  }
`;

const TitleText = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.6rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin: 0 0 8px;
  background: linear-gradient(90deg, #d4af37 0%, #ffffff 50%, #d4af37 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textShimmer} 3s linear infinite;
  text-align: center;
  padding: 0 16px;
`;

const SubtitleText = styled.p`
  font-size: 0.78rem;
  color: #aaaaaa;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 24px;
  font-weight: 500;
  text-align: center;
`;

const ProgressTrack = styled.div`
  width: 220px;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, #c9a227 0%, #d4af37 50%, #f4e798 100%);
  transition: width 0.2s ease-out;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
`;

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.random() * 20 + 10;
        return Math.min(prev + diff, 100);
      });
    }, 150);

    // Hide preloader after initial load
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <PreloaderOverlay $fadeOut={fadeOut}>
      <LogoContainer>
        <OuterOrbitRing />
        <InnerOrbitRing />
        <AnimatedLogoBadge>
          <img src="/botlogo.png" alt="RICHEEKAY EMPIRE Logo" />
        </AnimatedLogoBadge>
      </LogoContainer>

      <TitleText>RICHEEKAY FASHION EMPIRE</TitleText>
      <SubtitleText>Crafting Royal Heritage & Haute Couture</SubtitleText>

      <ProgressTrack>
        <ProgressBar $progress={progress} />
      </ProgressTrack>
    </PreloaderOverlay>
  );
};
