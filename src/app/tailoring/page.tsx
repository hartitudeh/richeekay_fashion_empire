'use client';

import React from 'react';
import { CustomTailoringStudio } from '../../components/CustomTailoringStudio';
import styled from 'styled-components';

const PageHeader = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #faf8f5 100%);
  border-bottom: 1px solid rgba(201, 162, 39, 0.25);
  padding: 70px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.2rem;
    color: #1a1a1a;
    margin-bottom: 12px;

    span {
      color: #b8860b;
    }
  }

  p {
    font-size: 1.05rem;
    color: #555555;
    max-width: 650px;
    margin: 0 auto;
  }
`;

export default function TailoringPage() {
  return (
    <>
      <PageHeader>
        <h1>
          BESPOKE HAUTE COUTURE <span>TAILORING</span>
        </h1>
        <p>Experience custom-made Gentlemen suits, Royal Agbada sets, Senator tunics, and Ladies gala gowns crafted from authentic Ankara & handwoven Ofi fabrics to fit your exact body dimensions.</p>
      </PageHeader>

      <CustomTailoringStudio />
    </>
  );
}
