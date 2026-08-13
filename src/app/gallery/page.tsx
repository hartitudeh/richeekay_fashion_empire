'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { FiEye, FiHeart, FiX, FiCamera, FiCheckCircle, FiShare2 } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6';
import styled from 'styled-components';

const Header = styled.div`
  background: linear-gradient(180deg, #0a0a0a 0%, #1f1f1f 100%);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 80px 24px;
  text-align: center;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid #d4af37;
    color: #d4af37;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 2.5px;
    padding: 6px 16px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.4rem;
    color: #ffffff;
    margin-bottom: 12px;

    span {
      color: #d4af37;
    }

    @media (max-width: 600px) {
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #cccccc;
    max-width: 650px;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 24px;

  .filter-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 44px;

    .tab {
      background: #141414;
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #ffffff;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 1px;
      padding: 10px 20px;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.3s ease;

      &.active, &:hover {
        background: #d4af37;
        color: #0a0a0a;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      }
    }
  }
`;

const MasonryGrid = styled.div`
  column-count: 3;
  column-gap: 24px;

  @media (max-width: 900px) {
    column-count: 2;
  }

  @media (max-width: 500px) {
    column-count: 1;
  }
`;

const MasonryCard = styled.div`
  break-inside: avoid;
  margin-bottom: 24px;
  position: relative;
  border: 1px solid rgba(212, 175, 55, 0.3);
  overflow: hidden;
  cursor: pointer;
  background: #141414;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.6s ease;
  }

  &:hover {
    border-color: #d4af37;
    box-shadow: 0 12px 30px rgba(212, 175, 55, 0.35);

    img {
      transform: scale(1.06);
    }

    .view-btn {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .content-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.05) 0%,
      rgba(10, 10, 10, 0.9) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;

    .cat {
      display: inline-block;
      align-self: flex-start;
      background: rgba(212, 175, 55, 0.25);
      border: 1px solid #d4af37;
      color: #d4af37;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 10px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.35rem;
      color: #ffffff;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.8rem;
      color: #d0d0d0;
    }
  }

  .view-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #0a0a0a;
    border: 1px solid #d4af37;
    color: #d4af37;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.05rem;
    z-index: 3;
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.3s ease;
  }
`;

const SubmitBox = styled.div`
  margin-top: 80px;
  background: #141414;
  border: 1px solid #d4af37;
  padding: 40px;
  text-align: center;

  h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: #cccccc;
    max-width: 600px;
    margin: 0 auto 24px;
  }

  .upload-btn {
    background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
    color: #0a0a0a;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 14px 32px;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: linear-gradient(135deg, #f4e798 0%, #d4af37 100%);
    }
  }
`;

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  photographer: string;
  description: string;
  aspectRatio?: string;
}

export const MASONRY_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Royal Gold Silk Gala Evening Gown',
    category: 'gala-gowns',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Lagos Haute Couture Gala 2026',
    description: 'Floor-sweeping pure silk evening gown with internal corset boning and thigh slit.'
  },
  {
    id: 'g-2',
    title: 'Emerald Velvet Embroidered Aso-Ebi',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Adeleke Royal Wedding',
    description: 'Intricate metallic gold thread embroidery on deep emerald velvet with matching Gele.'
  },
  {
    id: 'g-3',
    title: '30" HD Lace Virgin Hair Campaign',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'RICHEEKAY Hair Campaign',
    description: 'Raw Cambodian Virgin Human Hair wig with 13x4 Swiss HD invisible frontal.'
  },
  {
    id: 'g-4',
    title: 'Executive Double-Breasted Power Suit',
    category: 'executive-senator',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
    photographer: 'London Boardroom Editorial',
    description: 'High-grade wool crepe power suit with gold embossed heraldic buttons.'
  },
  {
    id: 'g-5',
    title: 'Cashmere Wool Senator Tunic Set',
    category: 'executive-senator',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Abuja Executive Lookbook',
    description: 'Wrinkle-resistant cashmere wool Senator tunic set tailored for corporate leaders.'
  },
  {
    id: 'g-6',
    title: 'French Hand-Beaded Lace Couture',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Paris Couture Week 2025',
    description: '3D floral beaded appliques encrusted with glass beads and pearls.'
  },
  {
    id: 'g-7',
    title: 'Milan Runway Red Carpet Gala Gown',
    category: 'runway',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Milan Fashion Week 2026',
    description: 'Gold metallic satin cape dress featured on international fashion week runways.'
  },
  {
    id: 'g-8',
    title: 'Monogram Leather Bag & Gold Heels',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Kensington Showroom Display',
    description: 'Full-grain calfskin leather bag paired with 10.5cm metallic gold pumps.'
  },
  {
    id: 'g-9',
    title: 'Summer Chiffon Silk Evening Look',
    category: 'gala-gowns',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Monaco Yacht Club Gala',
    description: 'Fluid Italian silk chiffon dress designed for golden hour summer galas.'
  },
  {
    id: 'g-10',
    title: 'Bespoke Royal African Ankara Silk',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Lagos Cultural Runway',
    description: 'Hand-dyed African Ankara silk gown with gold thread lining.'
  },
  {
    id: 'g-11',
    title: 'Black Tie Diamond Corset Gown',
    category: 'runway',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Cannes Film Festival Gala',
    description: 'Swarovski encrusted corset bodice with cascading satin train.'
  },
  {
    id: 'g-12',
    title: 'Designer Calfskin Handbag Collection',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Empire Luxury Goods',
    description: 'Structured top-handle handbags in burgundy, emerald, and gold.'
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [uploadSubmitted, setUploadSubmitted] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(MASONRY_GALLERY_ITEMS);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persistent user uploads on mount
  useEffect(() => {
    try {
      const savedUploads = localStorage.getItem('richeekay_uploaded_gallery');
      if (savedUploads) {
        const parsed: GalleryItem[] = JSON.parse(savedUploads);
        if (parsed && parsed.length > 0) {
          setGalleryItems([...parsed, ...MASONRY_GALLERY_ITEMS]);
        }
      }
    } catch (e) {
      console.error('Failed to load user gallery uploads', e);
    }
  }, []);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      if (!imageUrl) return;

      const rawFileName = file.name.replace(/\.[^/.]+$/, '');
      const formattedTitle = rawFileName
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const newItem: GalleryItem = {
        id: `user-upload-${Date.now()}`,
        title: formattedTitle || 'VIP Client Outfit Feature',
        category: 'gala-gowns',
        image: imageUrl,
        photographer: 'Featured VIP Client Upload',
        description: 'Submitted outfit photo wearing RICHEEKAY Haute Couture. Featured in VIP Masonry Gallery.'
      };

      setGalleryItems((prev) => {
        const updated = [newItem, ...prev];
        try {
          const userUploadsOnly = updated.filter((item) => item.id.startsWith('user-upload-'));
          localStorage.setItem('richeekay_uploaded_gallery', JSON.stringify(userUploadsOnly));
        } catch (err) {}
        return updated;
      });

      setActiveTab('all');
      setUploadSubmitted(true);

      // Scroll smoothly to top of gallery grid
      window.scrollTo({ top: 380, behavior: 'smooth' });
    };

    reader.readAsDataURL(file);
  };

  const filteredItems = galleryItems.filter((item) => activeTab === 'all' || item.category === activeTab);

  return (
    <>
      {/* Hidden File Explorer Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <Header>
        <div className="badge">
          <FaInstagram /> #RicheekayStyle &bull; Masonry Gallery
        </div>
        <h1>
          THE EMPIRE <span>MASONRY GALLERY</span>
        </h1>
        <p>Explore staggered haute couture lookbooks, royal Aso-Ebi native gowns, Senator suits, and 100% virgin hair wigs.</p>
      </Header>

      <Container>
        <div className="filter-tabs">
          <div className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All Showcase Photos ({galleryItems.length})
          </div>
          <div className={`tab ${activeTab === 'gala-gowns' ? 'active' : ''}`} onClick={() => setActiveTab('gala-gowns')}>
            Gala Evening Gowns
          </div>
          <div className={`tab ${activeTab === 'aso-ebi-native' ? 'active' : ''}`} onClick={() => setActiveTab('aso-ebi-native')}>
            Royal Aso-Ebi Native
          </div>
          <div className={`tab ${activeTab === 'executive-senator' ? 'active' : ''}`} onClick={() => setActiveTab('executive-senator')}>
            Executive Senator Suits
          </div>
          <div className={`tab ${activeTab === 'runway' ? 'active' : ''}`} onClick={() => setActiveTab('runway')}>
            Runway & Red Carpet
          </div>
          <div className={`tab ${activeTab === 'wigs-accessories' ? 'active' : ''}`} onClick={() => setActiveTab('wigs-accessories')}>
            Virgin Wigs & Heels
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <MasonryGrid>
          {filteredItems.map((item) => (
            <MasonryCard key={item.id} onClick={() => setActiveItem(item)}>
              <div className="view-btn">
                <FiEye />
              </div>
              <img src={item.image} alt={item.title} />
              <div className="content-overlay">
                <span className="cat">{item.category.replace('-', ' ')}</span>
                <h3>{item.title}</h3>
                <p>{item.photographer}</p>
              </div>
            </MasonryCard>
          ))}
        </MasonryGrid>

        {/* Submit Your Outfit Section */}
        <SubmitBox>
          <h3>Are You Wearing RICHEEKAY?</h3>
          <p>Click below to open your file manager, select your outfit photo, and automatically feature your look in our VIP Gallery.</p>
          <button className="upload-btn" onClick={handleTriggerUpload}>
            <FiCamera /> Submit Your Outfit Photo (File Explorer)
          </button>

          {uploadSubmitted && (
            <p style={{ color: '#D4AF37', marginTop: '14px', fontSize: '0.95rem', fontWeight: 'bold' }}>
              <FiCheckCircle style={{ marginRight: '6px' }} /> Photo loaded successfully! Your look is now featured at the top of the VIP Gallery.
            </p>
          )}
        </SubmitBox>
      </Container>

      {/* Lightbox Modal */}
      <Dialog open={Boolean(activeItem)} onClose={() => setActiveItem(null)} maxWidth="md" fullWidth>
        <DialogContent style={{ background: '#141414', padding: 0 }}>
          {activeItem && (
            <div style={{ background: '#0a0a0a', padding: '24px', color: '#FFF' }}>
              <button
                onClick={() => setActiveItem(null)}
                style={{ background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.6rem', cursor: 'pointer', float: 'right' }}
              >
                <FiX />
              </button>
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', border: '1px solid #D4AF37', margin: '14px 0' }}
              />
              <span style={{ color: '#D4AF37', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {activeItem.category.replace('-', ' ')}
              </span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#FFF', margin: '4px 0 8px' }}>
                {activeItem.title}
              </h3>
              <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '10px' }}>{activeItem.photographer}</p>
              <p style={{ color: '#CCC', fontSize: '0.95rem', lineHeight: '1.6' }}>{activeItem.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
