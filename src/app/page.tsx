'use client';

import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { CollectionsShowcase } from '../components/CollectionsShowcase';
import { CustomTailoringStudio } from '../components/CustomTailoringStudio';
import { HomeSections } from '../components/HomeSections';
import { FaqSection } from '../components/FaqSection';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <CategoryCarousel />
      <FeaturedProducts />
      <CollectionsShowcase />
      <CustomTailoringStudio />
      <HomeSections />
      <FaqSection />
    </>
  );
}
