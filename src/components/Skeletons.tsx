'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmerKeyframes = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #141414 25%,
    #242018 50%,
    #141414 75%
  );
  background-size: 200% 100%;
  animation: ${shimmerKeyframes} 1.6s infinite ease-in-out;
  border-radius: 4px;
`;

// --- PRODUCT CARD SKELETON ---
const ProductSkeletonContainer = styled.div`
  background: #0d0d0d;
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 6px;
  overflow: hidden;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ImageSkeleton = styled(SkeletonBase)`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
`;

const CategoryLineSkeleton = styled(SkeletonBase)`
  width: 40%;
  height: 12px;
`;

const TitleLineSkeleton = styled(SkeletonBase)`
  width: 80%;
  height: 18px;
`;

const PriceLineSkeleton = styled(SkeletonBase)`
  width: 50%;
  height: 16px;
`;

const ButtonSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 42px;
  margin-top: 4px;
`;

export const ProductCardSkeleton: React.FC = () => {
  return (
    <ProductSkeletonContainer>
      <ImageSkeleton />
      <CategoryLineSkeleton />
      <TitleLineSkeleton />
      <PriceLineSkeleton />
      <ButtonSkeleton />
    </ProductSkeletonContainer>
  );
};

// --- COLLECTION CARD SKELETON ---
const CollectionSkeletonContainer = styled.div`
  background: #0d0d0d;
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CollectionImageSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 320px;
`;

const CollectionContentSkeleton = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CollectionCardSkeleton: React.FC = () => {
  return (
    <CollectionSkeletonContainer>
      <CollectionImageSkeleton />
      <CollectionContentSkeleton>
        <CategoryLineSkeleton />
        <TitleLineSkeleton />
        <ButtonSkeleton />
      </CollectionContentSkeleton>
    </CollectionSkeletonContainer>
  );
};

// --- BLOG CARD SKELETON ---
const BlogSkeletonContainer = styled.div`
  background: #0d0d0d;
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`;

const BlogImageSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 220px;
  border-radius: 4px;
`;

export const BlogCardSkeleton: React.FC = () => {
  return (
    <BlogSkeletonContainer>
      <BlogImageSkeleton />
      <CategoryLineSkeleton />
      <TitleLineSkeleton />
      <PriceLineSkeleton />
    </BlogSkeletonContainer>
  );
};

// --- GALLERY SKELETON ---
const GallerySkeletonContainer = styled(SkeletonBase)`
  width: 100%;
  height: 340px;
  border-radius: 6px;
  border: 1px solid rgba(212, 175, 55, 0.15);
`;

export const GalleryCardSkeleton: React.FC = () => {
  return <GallerySkeletonContainer />;
};

// --- SKELETON GRID CONTAINER ---
const SkeletonGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 4}, 1fr);
  gap: 24px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonProductGrid: React.FC<{ count?: number; cols?: number }> = ({ count = 8, cols = 4 }) => {
  return (
    <SkeletonGrid $cols={cols}>
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </SkeletonGrid>
  );
};

export const SkeletonCollectionGrid: React.FC<{ count?: number; cols?: number }> = ({ count = 6, cols = 3 }) => {
  return (
    <SkeletonGrid $cols={cols}>
      {Array.from({ length: count }).map((_, idx) => (
        <CollectionCardSkeleton key={idx} />
      ))}
    </SkeletonGrid>
  );
};
