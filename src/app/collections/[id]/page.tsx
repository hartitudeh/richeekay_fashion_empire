'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { COLLECTIONS_DATA, PRODUCTS_DATA, Product } from '../../../data/productsData';
import { useShop } from '../../../context/ShopContext';
import { Dialog, DialogContent } from '@mui/material';
import { FiArrowRight, FiArrowLeft, FiShoppingBag, FiEye, FiCheckCircle, FiX, FiAward, FiMaximize2 } from 'react-icons/fi';
import styled from 'styled-components';

const CollectionHero = styled.div<{ $bgImage: string }>`
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: flex-end;
  padding: 60px 24px;
  border-bottom: 1px solid #d4af37;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.4) 0%,
        rgba(10, 10, 10, 0.95) 100%
      ),
      url('${({ $bgImage }) => $bgImage}');
    background-size: cover;
    background-position: center;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #d4af37;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 24px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(-4px);
        color: #ffffff;
      }
    }

    .tag-badge {
      display: inline-block;
      background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
      color: #0a0a0a;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2px;
      padding: 6px 16px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 3.4rem;
      color: #ffffff;
      margin-bottom: 12px;
      line-height: 1.15;

      @media (max-width: 768px) {
        font-size: 2.2rem;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: #f4e798;
      margin-bottom: 20px;
      font-weight: 300;
    }

    .season-text {
      font-size: 0.85rem;
      color: #aaaaaa;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
`;

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding: 60px 24px;

  .section-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 28px;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 2px;
      background: #d4af37;
    }

    span {
      color: #d4af37;
    }
  }
`;

const DesignerNoteBox = styled.div`
  background: rgba(212, 175, 55, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-left: 4px solid #d4af37;
  padding: 28px 32px;
  margin-bottom: 50px;
  border-radius: 4px;

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    color: #d4af37;
    font-size: 1.3rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    font-size: 1rem;
    color: #e0e0e0;
    line-height: 1.7;
    font-style: italic;
    margin: 0;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .story-card {
    background: #141414;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 6px;

    p {
      font-size: 0.95rem;
      color: #cccccc;
      line-height: 1.8;
      margin: 0;
    }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 70px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryCard = styled.div`
  position: relative;
  height: 380px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 10, 0.6);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d4af37;
    font-size: 1.8rem;
    transition: opacity 0.3s ease;
  }

  &:hover {
    img {
      transform: scale(1.08);
    }
    .overlay {
      opacity: 1;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 70px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: #141414;
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d4af37;
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
  }

  .img-wrapper {
    position: relative;
    height: 320px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  &:hover .img-wrapper img {
    transform: scale(1.06);
  }

  .info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.15rem;
      color: #ffffff;
      margin-bottom: 6px;
    }

    .price {
      color: #d4af37;
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 16px;
    }

    .btn-row {
      display: flex;
      gap: 10px;
      margin-top: auto;

      button {
        flex: 1;
        padding: 10px 12px;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s ease;

        &.bag-btn {
          background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
          color: #0a0a0a;
          border: none;

          &:hover {
            box-shadow: 0 0 14px rgba(212, 175, 55, 0.6);
          }
        }

        &.view-btn {
          background: transparent;
          color: #cccccc;
          border: 1px solid rgba(255, 255, 255, 0.2);

          &:hover {
            border-color: #d4af37;
            color: #ffffff;
          }
        }
      }
    }
  }
`;

const OtherLookbooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MiniLookbookCard = styled(Link)<{ $bgImage: string }>`
  position: relative;
  height: 240px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        180deg,
        rgba(10, 10, 10, 0.2) 0%,
        rgba(10, 10, 10, 0.9) 100%
      ),
      url('${({ $bgImage }) => $bgImage}');
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: scale(1.08);
  }

  .mini-content {
    position: relative;
    z-index: 2;

    span {
      font-size: 0.7rem;
      color: #d4af37;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    h4 {
      font-family: 'Playfair Display', Georgia, serif;
      color: #ffffff;
      font-size: 1.2rem;
      margin: 4px 0 0;
    }
  }
`;

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { formatPrice, addToCart, openQuickView } = useShop();

  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [addedMsg, setAddedMsg] = useState<string | null>(null);

  const collection = COLLECTIONS_DATA.find((c) => c.id === id) || COLLECTIONS_DATA[0];

  const featuredProducts: Product[] = PRODUCTS_DATA.filter((p) =>
    collection.featuredProductIds.includes(p.id)
  );
  const fallbackProducts = featuredProducts.length > 0 ? featuredProducts : PRODUCTS_DATA.slice(0, 3);

  const otherCollections = COLLECTIONS_DATA.filter((c) => c.id !== collection.id).slice(0, 3);

  const handleAddToCart = (product: Product) => {
    addToCart(product, product.colors[0]?.name || 'Gold', product.sizes[0] || 'M', 1);
    setAddedMsg(`${product.name} added to your bag!`);
    setTimeout(() => setAddedMsg(null), 3000);
  };

  const handleQuickView = (product: Product) => {
    openQuickView(product);
  };

  return (
    <>
      <CollectionHero $bgImage={collection.image}>
        <div className="hero-content">
          <Link href="/collections" className="back-btn">
            <FiArrowLeft /> All Empire Collections
          </Link>
          <br />
          <span className="tag-badge">{collection.tag}</span>
          <h1>{collection.title}</h1>
          <p className="subtitle">{collection.subtitle}</p>
          <span className="season-text">👑 Season: {collection.season}</span>
        </div>
      </CollectionHero>

      <Container>
        {addedMsg && (
          <div style={{ background: '#d4af37', color: '#0a0a0a', padding: '12px 20px', borderRadius: '4px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiCheckCircle /> {addedMsg}
          </div>
        )}

        {/* Designer Note */}
        <DesignerNoteBox>
          <h3>
            <FiAward /> Chief Couturier's Collection Note
          </h3>
          <p>"{collection.designerNote}"</p>
        </DesignerNoteBox>

        {/* Editorial Story */}
        <h2 className="section-title">EDITORIAL <span>HERITAGE STORY</span></h2>
        <StoryGrid>
          {collection.editorialStory.map((paragraph, idx) => (
            <div key={idx} className="story-card">
              <p>{paragraph}</p>
            </div>
          ))}
        </StoryGrid>

        {/* Lookbook Gallery */}
        <h2 className="section-title">LOOKBOOK <span>GALLERY SHOWCASE</span></h2>
        <GalleryGrid>
          {collection.lookbookGallery.map((img, idx) => (
            <GalleryCard key={idx} onClick={() => setActiveLightbox(img)}>
              <img src={img} alt={`Lookbook Shot ${idx + 1}`} />
              <div className="overlay">
                <FiMaximize2 />
              </div>
            </GalleryCard>
          ))}
        </GalleryGrid>

        {/* Featured Products */}
        <h2 className="section-title">SHOP THE <span>LOOKBOOK ITEMS</span></h2>
        <ProductGrid>
          {fallbackProducts.map((prod) => (
            <ProductCard key={prod.id}>
              <div className="img-wrapper">
                <img src={prod.images[0]} alt={prod.name} />
              </div>
              <div className="info">
                <h4>{prod.name}</h4>
                <div className="price">{formatPrice(prod.priceNGN)}</div>
                <div className="btn-row">
                  <button className="bag-btn" onClick={() => handleAddToCart(prod)}>
                    <FiShoppingBag /> Add to Bag
                  </button>
                  <button className="view-btn" onClick={() => handleQuickView(prod)}>
                    <FiEye /> Quick View
                  </button>
                </div>
              </div>
            </ProductCard>
          ))}
        </ProductGrid>

        {/* Explore Other Collections */}
        <h2 className="section-title">EXPLORE <span>OTHER LOOKBOOKS</span></h2>
        <OtherLookbooksGrid>
          {otherCollections.map((other) => (
            <MiniLookbookCard key={other.id} href={other.link} $bgImage={other.image}>
              <div className="mini-content">
                <span>{other.tag}</span>
                <h4>{other.title}</h4>
              </div>
            </MiniLookbookCard>
          ))}
        </OtherLookbooksGrid>
      </Container>

      {/* Lightbox Modal */}
      <Dialog
        open={Boolean(activeLightbox)}
        onClose={() => setActiveLightbox(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            style: {
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
              overflow: 'visible'
            }
          }
        }}
      >
        <DialogContent style={{ padding: 0, overflow: 'hidden' }}>
          {activeLightbox && (
            <div style={{ background: '#0a0a0a', border: '1px solid #D4AF37', borderRadius: '8px', padding: '20px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxHeight: '85vh', overflow: 'hidden' }}>
              <button
                onClick={() => setActiveLightbox(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.6rem', cursor: 'pointer', zIndex: 10 }}
              >
                <FiX />
              </button>
              <img
                src={activeLightbox}
                alt="Enlarged Lookbook Shot"
                style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', border: 'none', borderRadius: '4px', display: 'block', margin: '0 auto' }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
