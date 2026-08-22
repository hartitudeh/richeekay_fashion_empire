'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { FiEye, FiHeart, FiX, FiCamera, FiCheckCircle, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa6';
import { GalleryCardSkeleton } from '../../components/Skeletons';
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

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 50px;
  margin-bottom: 30px;

  .page-info {
    font-size: 0.85rem;
    color: #aaaaaa;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .pagination-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;

    .page-btn {
      background: #141414;
      border: 1px solid rgba(212, 175, 55, 0.35);
      color: #ffffff;
      min-width: 42px;
      height: 42px;
      padding: 0 14px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: #d4af37;
        color: #0a0a0a;
        border-color: #d4af37;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
      }

      &.active {
        background: #d4af37;
        color: #0a0a0a;
        font-weight: 700;
        border-color: #d4af37;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.45);
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        border-color: rgba(255, 255, 255, 0.1);
      }
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
  },
  {
    id: 'g-13',
    title: 'Magenta & Gold Metallic Aso-Oke Set',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Osogbo Royal Cultural Showcase',
    description: 'Traditional handwoven Aso-Oke with metallic gold threads and matching structured Gele.'
  },
  {
    id: 'g-14',
    title: 'Vibrant Royal Peacock Ankara Maxi Gown',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Ibadan Society Gala 2026',
    description: 'Vibrant peacock print African Ankara cotton-silk maxi dress with structured peplum waist.'
  },
  {
    id: 'g-15',
    title: 'Crimson Red Aso-Oke Gele & Filigree',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Lagos Island Heirloom Fashion',
    description: 'Heavy woven crimson red Aso-Oke with gold filigree embellishments.'
  },
  {
    id: 'g-16',
    title: 'Royal Navy Silk Ankara Off-Shoulder Gown',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Victoria Island Fashion Week',
    description: 'Off-shoulder Ankara silk gown with hand-pleated sweetheart neckline.'
  },
  {
    id: 'g-17',
    title: 'Gold-Threaded Striped Aso-Oke Agbada Set',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Abuja High Society Celebration',
    description: 'Heritage Aso-Oke woven with 24k gold bullion metallic thread.'
  },
  {
    id: 'g-18',
    title: 'Tiered Ankara High-Slit Gala Dress',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Eko Hotels Red Carpet',
    description: 'Tiered ruffle Ankara dress featuring high thigh slit and Corset boning.'
  },
  {
    id: 'g-19',
    title: 'Honey Blonde 28" Bone Straight Virgin Hair',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80',
    photographer: 'RICHEEKAY Luxury Wig Vault',
    description: '100% Raw Virgin Cambodian hair in Honey Blonde colorway with 5x5 HD closure.'
  },
  {
    id: 'g-20',
    title: 'Midnight Black Velvet Senator Suit',
    category: 'executive-senator',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Executive Bodija Lookbook',
    description: 'Bespoke Senator tunic featuring hand-stitched gold neckline embroidery.'
  },
  {
    id: 'g-21',
    title: 'Sunset Gold Ankara Mermaid Gown',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Royal Wedding Guest Showcase',
    description: 'Fit and flare Ankara gown embellished with Austrian crystal beads.'
  },
  {
    id: 'g-22',
    title: 'Handwoven Metallic Blue Alaari Aso-Oke',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Osun Heritage Arts Festival',
    description: 'Traditional Alaari Aso-Oke in metallic ocean blue with hand-crocheted border trim.'
  },
  {
    id: 'g-23',
    title: 'Champagne Gold Beaded Lace Aso-Ebi',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Banana Island VIP Soiree',
    description: 'Floor-sweeping champagne lace Aso-Ebi gown lined with royal silk satin.'
  },
  {
    id: 'g-24',
    title: 'Executive Charcoal Cashmere Senator Wear',
    category: 'executive-senator',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Corporate Nigeria Leadership Gala',
    description: 'Wrinkle-free Italian wool Senator set tailored for executive women.'
  },
  {
    id: 'g-25',
    title: 'Royal Purple & Gold Sunburst Ankara',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    photographer: 'West African Luxury Trade Fair',
    description: 'Sunburst patterned Ankara silk ensemble with matching headwrap.'
  },
  {
    id: 'g-26',
    title: 'Deep Emerald Velvet Corset Gown',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Lagos Opera Gala 2026',
    description: 'Deep emerald velvet gown with internal steel corset boning and sheer tulle sleeves.'
  },
  {
    id: 'g-27',
    title: '32" Piano Highlight Raw Virgin Body Wave',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Crown Virgin Hair Boutique',
    description: '32" HD transparent lace wig in 4/27 Piano Highlight colorway.'
  },
  {
    id: 'g-28',
    title: 'Sapphire Blue Velvet Agbada Aso-Oke',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Oyo State Cultural Coronation',
    description: 'Sapphire blue velvet Aso-Oke with silver metallic thread embroidery.'
  },
  {
    id: 'g-29',
    title: 'Crimson Red Italian Patent Stilettos',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Empire Luxury Footwear Vault',
    description: '10.5cm pointed-toe crimson red stiletto pumps with gold metallic soles.'
  },
  {
    id: 'g-30',
    title: 'Royal Gold Satin Cape Gala Gown',
    category: 'gala-gowns',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Abuja International Film Awards',
    description: 'High-society gala gown with floor-length cascading shoulder cape.'
  },
  {
    id: 'g-31',
    title: 'Gold Filigree Embroidered White Senator',
    category: 'executive-senator',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Lagos Executive Club Launch',
    description: 'Pristine white Senator tunic with 24k gold filigree chest embroidery.'
  },
  {
    id: 'g-32',
    title: 'Vintage Onetu Aso-Oke Headpiece & Shawl',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Royal Yoruba Heirloom Archive',
    description: 'Rare handwoven Onetu Aso-Oke Gele and Iborun set with gold fringe.'
  },
  {
    id: 'g-33',
    title: 'Ankara Print Sweetheart Corset Ballgown',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Monaco Fashion Ball',
    description: 'Voluminous Ankara print ballgown with structured sweetheart corset.'
  },
  {
    id: 'g-34',
    title: 'Parisian Silk Chiffon Red Carpet Gown',
    category: 'runway',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Paris Haute Couture Red Carpet',
    description: 'Custom red carpet gown featured on Paris haute couture runways.'
  },
  {
    id: 'g-35',
    title: 'Burgundy Velvet Embroidered Aso-Ebi',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Ikoyi Society Wedding',
    description: 'Rich burgundy velvet Aso-Ebi gown with gold crystal bead embellishments.'
  },
  {
    id: 'g-36',
    title: 'Kinky Straight HD Lace Virgin Wig',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Virgin Hair Crown Collection',
    description: 'Natural texture 100% virgin human hair kinky straight wig with invisible lace.'
  },
  {
    id: 'g-37',
    title: 'Royal Purple Silk Satin Wrap Gown',
    category: 'gala-gowns',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Transcorp Hilton Abuja Gala',
    description: 'Fluid silk satin wrap gown with crystal brooch waist detail.'
  },
  {
    id: 'g-38',
    title: 'Hand-Beaded French Lace Bridal Aso-Ebi',
    category: 'aso-ebi-native',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Lagos Cathedral Royal Wedding',
    description: 'Bridal Aso-Ebi gown with 3D French lace floral embroidery.'
  },
  {
    id: 'g-39',
    title: 'Executive Midnight Blue Wool Crepe Suit',
    category: 'executive-senator',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Standard Chartered Leadership Summit',
    description: 'Tailored executive suit in midnight blue wool crepe with satin lapels.'
  },
  {
    id: 'g-40',
    title: 'Gold Filigree Box Clutch & Pumps',
    category: 'wigs-accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    photographer: 'RICHEEKAY Accessories Vault',
    description: 'Hard-case metallic gold box clutch with gold filigree handle.'
  }
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [uploadSubmitted, setUploadSubmitted] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(MASONRY_GALLERY_ITEMS);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset page to 1 when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Load persistent user uploads from server API on mount
  useEffect(() => {
    fetch('/api/upload')
      .then((res) => res.json())
      .then((serverItems) => {
        if (Array.isArray(serverItems) && serverItems.length > 0) {
          setGalleryItems([...serverItems, ...MASONRY_GALLERY_ITEMS]);
        }
      })
      .catch((e) => {
        console.error('Failed to fetch uploaded gallery items from API', e);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
  }, [activeTab]);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, ''));

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      if (result.success && result.item) {
        setGalleryItems((prev) => [result.item, ...prev]);
        setActiveTab('all');
        setCurrentPage(1);
        setUploadSubmitted(true);

        // Scroll smoothly to top of gallery grid
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to upload file to server:', err);
    }
  };

  const filteredItems = galleryItems.filter((item) => activeTab === 'all' || item.category === activeTab);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

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
          <div className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabChange('all')}>
            All Showcase Photos ({galleryItems.length})
          </div>
          <div className={`tab ${activeTab === 'gala-gowns' ? 'active' : ''}`} onClick={() => handleTabChange('gala-gowns')}>
            Gala Evening Gowns
          </div>
          <div className={`tab ${activeTab === 'aso-ebi-native' ? 'active' : ''}`} onClick={() => handleTabChange('aso-ebi-native')}>
            Royal Aso-Ebi Native
          </div>
          <div className={`tab ${activeTab === 'executive-senator' ? 'active' : ''}`} onClick={() => handleTabChange('executive-senator')}>
            Executive Senator Suits
          </div>
          <div className={`tab ${activeTab === 'runway' ? 'active' : ''}`} onClick={() => handleTabChange('runway')}>
            Runway & Red Carpet
          </div>
          <div className={`tab ${activeTab === 'wigs-accessories' ? 'active' : ''}`} onClick={() => handleTabChange('wigs-accessories')}>
            Virgin Wigs & Heels
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <MasonryGrid>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => <GalleryCardSkeleton key={idx} />)
          ) : (
            currentItems.map((item) => (
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
            ))
          )}
        </MasonryGrid>

        {/* Luxury Pagination Bar */}
        {!isLoading && totalPages > 1 && (
          <PaginationContainer>
            <div className="page-info">
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} Gallery Photos
            </div>

            <div className="pagination-bar">
              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title="Previous Page"
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="Next Page"
              >
                <FiChevronRight />
              </button>
            </div>
          </PaginationContainer>
        )}

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
      <Dialog
        open={Boolean(activeItem)}
        onClose={() => setActiveItem(null)}
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
          {activeItem && (
            <div style={{ background: '#0a0a0a', border: '1px solid #D4AF37', borderRadius: '8px', padding: '24px', color: '#FFF', position: 'relative', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={() => setActiveItem(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#D4AF37', fontSize: '1.6rem', cursor: 'pointer', zIndex: 10 }}
              >
                <FiX />
              </button>

              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const activeIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
                      const prevIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
                      setActiveItem(filteredItems[prevIndex]);
                    }}
                    style={{ position: 'absolute', left: '16px', top: '40%', transform: 'translateY(-50%)', background: 'rgba(10, 10, 10, 0.75)', border: '1px solid #D4AF37', color: '#D4AF37', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', cursor: 'pointer', zIndex: 10 }}
                    title="Previous Image"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={() => {
                      const activeIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
                      const nextIndex = (activeIndex + 1) % filteredItems.length;
                      setActiveItem(filteredItems[nextIndex]);
                    }}
                    style={{ position: 'absolute', right: '16px', top: '40%', transform: 'translateY(-50%)', background: 'rgba(10, 10, 10, 0.75)', border: '1px solid #D4AF37', color: '#D4AF37', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', cursor: 'pointer', zIndex: 10 }}
                    title="Next Image"
                  >
                    <FiChevronRight />
                  </button>
                </>
              )}

              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{ maxWidth: '100%', maxHeight: '55vh', objectFit: 'contain', border: 'none', borderRadius: '4px', margin: '14px auto', display: 'block' }}
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
