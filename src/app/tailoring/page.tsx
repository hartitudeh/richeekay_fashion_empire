'use client';

import React from 'react';
import { CustomTailoringStudio } from '../../components/CustomTailoringStudio';
import styled from 'styled-components';

const PageHeader = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 70px 24px;
  text-align: center;

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.2rem;
    color: #ffffff;
    margin-bottom: 12px;

    span {
      color: #d4af37;
    }
  }

  p {
    font-size: 1.05rem;
    color: #cccccc;
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
        <p>Experience custom-made African and Western clothing crafted by master artisans to fit your exact body dimensions.</p>
      </PageHeader>

      <CustomTailoringStudio />
    </>
  );
}
