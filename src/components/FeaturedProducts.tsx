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
      color: #b8860b;
      text-transform: uppercase;
      font-weight: 600;
    }

    h2 {
      font-size: 2.6rem;
      color: #1a1a1a;
      margin-top: 6px;
    }

    .divider {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #c9a227 0%, #b8860b 100%);
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
        return products.filter((p) => p.category === 'men-wear' || p.category === 'senator-materials');
      case 2:
        return products.filter((p) => p.category === 'ankara-ofi-materials' || p.category === 'native-wear');
      case 3:
        return products.filter((p) => p.category === 'wristwatches' || p.category === 'shoes-sneakers');
      case 4:
        return products.filter((p) => p.category === 'ladies-wear' || p.category === 'bags' || p.category === 'wigs');
      case 5:
        return products.filter((p) => p.isNewArrival);
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

  const tabStyle = {
    color: '#1a1a1a',
    fontWeight: 600,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.85rem',
    textTransform: 'none' as const,
    '&.Mui-selected': {
      color: '#b8860b',
      fontWeight: 700
    },
    '&:hover': {
      color: '#b8860b'
    }
  };

  return (
    <SectionWrapper id="featured">
      <div className="header">
        <span>Exclusive Showcase</span>
        <h2>Featured Luxury Collection</h2>
        <div className="divider" />
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'rgba(201, 162, 39, 0.25)', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Product Showcase Tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#c9a227',
              height: '3px'
            }
          }}
        >
          <Tab label="All Products" sx={tabStyle} />
          <Tab label="Gentlemen Wear" sx={tabStyle} />
          <Tab label="Ankara & Ofi Fabrics" sx={tabStyle} />
          <Tab label="Timepieces & Footwear" sx={tabStyle} />
          <Tab label="Ladies Couture" sx={tabStyle} />
          <Tab label="New Arrivals" sx={tabStyle} />
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
