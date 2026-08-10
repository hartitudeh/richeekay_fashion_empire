'use client';

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Box, Tabs, Tab } from '@mui/material';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 80px 24px;
  max-width: 1350px;
  margin: 0 auto;

  .header {
    text-align: center;
    margin-bottom: 32px;

    span {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      letter-spacing: 3px;
      color: #d4af37;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-size: 2.6rem;
      color: #ffffff;
      margin-top: 6px;
    }

    .divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #d4af37 100%);
      margin: 14px auto 0;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedProducts: React.FC = () => {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 1:
        return products.slice(0, 6);
      case 2:
        return products.filter((p) => p.isBestSeller);
      case 3:
        return products.filter((p) => p.isNewArrival);
      case 4:
        return products.filter((p) => p.isTrending);
      case 5:
        return products.filter((p) => p.isFlashSale);
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <SectionWrapper id="featured">
      <div className="header">
        <span>Exclusive Showcase</span>
        <h2>Featured Luxury Collection</h2>
        <div className="divider" />
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Product Showcase Tabs"
        >
          <Tab label="All Products" />
          <Tab label="Latest Releases" />
          <Tab label="Best Sellers" />
          <Tab label="New Arrivals" />
          <Tab label="Trending Now" />
          <Tab label="Flash Sale Items" />
        </Tabs>
      </Box>

      <ProductGrid>
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </ProductGrid>
    </SectionWrapper>
  );
};
