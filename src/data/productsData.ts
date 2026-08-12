export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  priceNGN: number;
  priceUSD: number;
  priceGBP: number;
  originalPriceNGN?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  stockCount: number;
  completeLookIds?: string[];
  customTailoringAvailable?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  link: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  image?: string;
  videoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'ladies-wear',
    name: "Ladies Wear",
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    itemCount: 48,
    description: 'Bespoke gowns, cocktail dresses & couture outfits.'
  },
  {
    id: 'native-wear',
    name: 'Native Wear',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    itemCount: 36,
    description: 'Vibrant Ankara, Aso-Ebi & African royal styles.'
  },
  {
    id: 'english-wear',
    name: 'English Wear',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    itemCount: 29,
    description: 'Executive suits, trousers & power blazers.'
  },
  {
    id: 'clothing-materials',
    name: 'Clothing Materials',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
    itemCount: 52,
    description: 'French lace, Italian silks & velvet brocade.'
  },
  {
    id: 'senator-materials',
    name: 'Senator Materials',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    itemCount: 40,
    description: 'Cashmere wool & polish cotton for tunics.'
  },
  {
    id: 'shoes',
    name: 'Luxury Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    itemCount: 31,
    description: 'Designer stiletto heels, pumps & sandals.'
  },
  {
    id: 'bags',
    name: 'Handbags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    itemCount: 25,
    description: 'Luxury leather totes, clutches & crossbody bags.'
  },
  {
    id: 'wigs',
    name: 'Premium Wigs',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
    description: '100% Virgin HD Lace human hair wigs.'
  },
  {
    id: 'underwear',
    name: "Ladies Underwear",
    image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    description: 'Satin lingerie & contour shapewear.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    itemCount: 45,
    description: 'Crystal jewelry, waist chains & scarves.'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'rck-001',
    name: 'Royal Gold Silk Gala Evening Gown',
    category: 'ladies-wear',
    collection: 'Luxury Collection',
    priceNGN: 145000,
    priceUSD: 120,
    priceGBP: 95,
    originalPriceNGN: 180000,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Royal Gold', hex: '#D4AF37' },
      { name: 'Midnight Black', hex: '#0A0A0A' },
      { name: 'Crimson Red', hex: '#8B0000' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Fit'],
    description: 'Turn heads at your high-society event with our floor-sweeping Royal Gold Silk Gala Gown. Crafted from pure Italian silk satin with a structured corset waist and high thigh slit.',
    details: [
      '100% Pure Silk Satin fabric',
      'Hand-stitched internal boning corset',
      'Concealed back zipper closure',
      'Custom sizing & length available'
    ],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    stockCount: 4,
    completeLookIds: ['rck-006', 'rck-007', 'rck-008'],
    customTailoringAvailable: true
  },
  {
    id: 'rck-002',
    name: 'Embroidered Velvet Aso-Ebi Native Set',
    category: 'native-wear',
    collection: 'Wedding Collection',
    priceNGN: 210000,
    priceUSD: 175,
    priceGBP: 140,
    originalPriceNGN: 250000,
    rating: 5.0,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#046307' },
      { name: 'Royal Blue', hex: '#002366' },
      { name: 'Gold', hex: '#D4AF37' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom Fit'],
    description: 'An exquisite 3-piece African Native ensemble featuring intricate metallic gold thread embroidery on deep emerald velvet, complete with matching headwrap Gele fabric.',
    details: [
      'Heavy stretch velvet material',
      'Precision metallic zardozi embroidery',
      'Includes skirt, blouse & Gele length',
      'Dry clean only'
    ],
    isBestSeller: true,
    isTrending: true,
    stockCount: 3,
    completeLookIds: ['rck-006', 'rck-010'],
    customTailoringAvailable: true
  },
  {
    id: 'rck-003',
    name: 'Executive Double-Breasted Power Suit',
    category: 'english-wear',
    collection: 'Office Collection',
    priceNGN: 125000,
    priceUSD: 104,
    priceGBP: 83,
    rating: 4.8,
    reviewCount: 34,
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Jet Black', hex: '#0A0A0A' },
      { name: 'Cream White', hex: '#F8F5EF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Redefine corporate elegance with our impeccably tailored double-breasted blazer and wide-leg trousers set. Designed for the modern woman who commands attention.',
    details: [
      'High-grade crepe suiting wool blend',
      'Gold embossed heraldic buttons',
      'Full silk lining with padded shoulders',
      'High-waisted tailored pants with pockets'
    ],
    isNewArrival: true,
    stockCount: 7,
    completeLookIds: ['rck-007'],
    customTailoringAvailable: true
  },
  {
    id: 'rck-004',
    name: 'French Hand-Beaded Crystal Lace Fabric (5 Yards)',
    category: 'clothing-materials',
    collection: 'Native Collection',
    priceNGN: 160000,
    priceUSD: 133,
    priceGBP: 106,
    originalPriceNGN: 190000,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#F4E798' },
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Rose Gold', hex: '#B76E79' }
    ],
    sizes: ['5 Yards Bolt'],
    description: 'Luxury 5-yard bolt of authentic French tulle lace encrusted with glass beads, pearls, and iridescent sequins. Perfect for wedding Aso-Ebi dresses.',
    details: [
      '5 Yards (4.57 meters) length',
      'Heavy 3D floral beaded appliques',
      'Includes matching lining recommendation',
      'Imported directly from Lyon, France'
    ],
    isFlashSale: true,
    stockCount: 5,
    customTailoringAvailable: true
  },
  {
    id: 'rck-005',
    name: 'Cashmere Wool Executive Senator Material (4 Yards)',
    category: 'senator-materials',
    collection: 'Corporate Collection',
    priceNGN: 75000,
    priceUSD: 62,
    priceGBP: 50,
    rating: 4.7,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#2B2B2B' },
      { name: 'Midnight Navy', hex: '#001F3F' },
      { name: 'Cream Beige', hex: '#F8F5EF' }
    ],
    sizes: ['4 Yards Bolt'],
    description: 'Ultra-smooth cashmere wool blend Senator clothing material with a soft luster finish. Ideal for custom ladies and gentlemen Senator tunic sets.',
    details: [
      '4 Yards (3.65 meters) length',
      'Wrinkle-resistant cashmere blend',
      'Breathable all-weather fabric weight',
      'Pre-shrunk finish'
    ],
    isBestSeller: true,
    stockCount: 12,
    customTailoringAvailable: true
  },
  {
    id: 'rck-006',
    name: 'Metallic Gold Crystal Stiletto Heels (105mm)',
    category: 'shoes',
    collection: 'Party Collection',
    priceNGN: 78000,
    priceUSD: 65,
    priceGBP: 52,
    originalPriceNGN: 95000,
    rating: 4.9,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Metallic Gold', hex: '#D4AF37' },
      { name: 'Diamond Silver', hex: '#C0C0C0' }
    ],
    sizes: ['37 EU', '38 EU', '39 EU', '40 EU', '41 EU', '42 EU'],
    description: 'Elevate your silhouette with our icon Metallic Gold Stiletto Pump featuring a pointed toe, clear PVC side paneling, and a dazzling crystal buckle.',
    details: [
      '10.5cm (4.1 inch) gold stiletto heel',
      'Genuine leather sole & padded footbed',
      'Sparkling crystal brooch detail',
      'Fits true to size'
    ],
    isFlashSale: true,
    isTrending: true,
    stockCount: 8,
    completeLookIds: ['rck-001', 'rck-007']
  },
  {
    id: 'rck-007',
    name: 'Monogrammed Leather Structured Handbag',
    category: 'bags',
    collection: 'Luxury Collection',
    priceNGN: 110000,
    priceUSD: 91,
    priceGBP: 73,
    rating: 5.0,
    reviewCount: 40,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#0A0A0A' },
      { name: 'Honey Tan', hex: '#C9A227' }
    ],
    sizes: ['Medium Bag'],
    description: 'Crafted from full-grain calfskin leather with gold-plated RICHEEKAY monogram hardware, dual top handles, and a detachable shoulder strap.',
    details: [
      '100% Genuine Grain Calfskin Leather',
      'Gold-plated hardware & feet',
      'Dual interior main compartments + zipped pocket',
      'Includes dustbag & authenticity certificate'
    ],
    isBestSeller: true,
    stockCount: 6,
    completeLookIds: ['rck-001', 'rck-003']
  },
  {
    id: 'rck-008',
    name: '30" HD Lace Virgin Human Hair Frontal Wig',
    category: 'wigs',
    collection: 'Luxury Collection',
    priceNGN: 280000,
    priceUSD: 233,
    priceGBP: 186,
    originalPriceNGN: 320000,
    rating: 5.0,
    reviewCount: 67,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural Black 1B', hex: '#0A0A0A' },
      { name: 'Honey Blonde Highlights', hex: '#D4AF37' }
    ],
    sizes: ['21.5" Small Cap', '22.5" Medium Cap', '23.5" Large Cap'],
    description: 'Flawless melt HD Swiss Lace frontal wig featuring 100% unprocessed Raw Cambodian Virgin Hair with 250% ultra-full density.',
    details: [
      '30 Inches length - Silky Straight/Body Wave',
      '13x4 Ultra Invisible Swiss HD Lace',
      'Pre-plucked hairline with baby hairs',
      'Can be bleached to 613 blonde & restyled with heat'
    ],
    isBestSeller: true,
    isTrending: true,
    stockCount: 4,
    completeLookIds: ['rck-001', 'rck-006']
  },
  {
    id: 'rck-009',
    name: 'Silk Satin Lace Trimmed Lingerie Robe Set',
    category: 'underwear',
    collection: 'Casual Collection',
    priceNGN: 35000,
    priceUSD: 29,
    priceGBP: 23,
    rating: 4.8,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Champagne Cream', hex: '#F8F5EF' },
      { name: 'Black Velvet', hex: '#0A0A0A' },
      { name: 'Blush Pink', hex: '#FFD1DC' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Indulge in pure luxury with our fluid silk satin robe set complete with delicate eyelash lace trim along the sleeves and hemline.',
    details: [
      'Ultra-soft stretch silk satin fabric',
      'Includes inner slip chemise & outer belted robe',
      'Adjustable thin shoulder straps',
      'Machine washable gentle cycle'
    ],
    isNewArrival: true,
    stockCount: 15
  },
  {
    id: 'rck-010',
    name: 'Royal Crystal Choker & Drop Earring Set',
    category: 'accessories',
    collection: 'Wedding Collection',
    priceNGN: 48000,
    priceUSD: 40,
    priceGBP: 32,
    rating: 4.9,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Gold / Diamond Clear', hex: '#D4AF37' },
      { name: 'Silver / Emerald', hex: '#046307' }
    ],
    sizes: ['One Size (Adjustable)'],
    description: 'A regal jewelry set boasting brilliant cubic zirconia crystals set in 18k gold-plated brass. Includes choker necklace and matching chandelier earrings.',
    details: [
      '18k Gold Plated Brass',
      'AAAAA Grade Cubic Zirconia crystals',
      'Hypoallergenic & lead-free',
      'Arrives in velvet luxury presentation box'
    ],
    isBestSeller: true,
    stockCount: 10
  }
];

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'col-summer',
    title: 'Summer Collection',
    subtitle: 'Breeze, Silk & Golden Hour Elegance',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    tag: 'NEW RELEASES',
    link: '/category/evening-dresses'
  },
  {
    id: 'col-wedding',
    title: 'Wedding & Aso-Ebi Collection',
    subtitle: 'Royal Glamour for African Celebrations',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    tag: 'MOST POPULAR',
    link: '/category/native-wear'
  },
  {
    id: 'col-office',
    title: 'Executive Office Collection',
    subtitle: 'Power Suits & Corporate Elegance',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    tag: 'TAILORED',
    link: '/category/english-wear'
  },
  {
    id: 'col-luxury',
    title: 'Red Carpet Luxury Collection',
    subtitle: 'Haute Couture Gala Gowns',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    tag: 'EXCLUSIVE',
    link: '/category/evening-dresses'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Chief Mrs. Folake Adeleke',
    location: 'Victoria Island, Lagos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'RICHEEKAY FASHION EMPIRE delivered my custom Aso-Ebi velvet gown in less than 48 hours for my sister’s wedding! The tailoring fit like a glove, and the metallic gold embroidery received non-stop compliments all night!',
    date: '3 days ago',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Dr. Amina Bello',
    location: 'Maitama, Abuja',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The 30" HD Lace Human Hair wig is the softest hair I have ever purchased. The frontal melted completely into my skin with zero glue showing. 100% luxury quality as promised!',
    date: '1 week ago',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Lady Elizabeth Kensington',
    location: 'Mayfair, London UK',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'I ordered the Executive Double-Breasted Power Suit to London via DHL express delivery. It arrived in 3 days packed in a signature gold box with velvet dustbags! Exceptional customer service.',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'H.E. Princess Olamide Ajayi',
    location: 'Ikoyi, Lagos',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The hand-beaded silk crystal gala gown for our diplomatic charity banquet was absolute perfection. RICHEEKAY’s bespoke tailoring team took my custom measurements online and delivered immaculate craftsmanship!',
    date: '5 days ago',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Dr. Chinyere Nwosu',
    location: 'Buckhead, Atlanta USA',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'I’ve ordered three Senator Tunic sets and matching calfskin handbags for my executive speaking tours. The quality of the wool crepe material and gold heraldic buttons is unmatched anywhere in North America!',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Countess Valerie Du Pont',
    location: 'Champs-Élysées, Paris France',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Purchased the Metallic Gold Stiletto Pumps and Royal Crystal Choker Set. The heels are incredibly comfortable for 8+ hours on red carpet galas in Paris! Truly haute couture excellence.',
    date: '3 weeks ago',
    verified: true
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 African Native Wear Trends Redefining Luxury Wedding Fashion in 2026',
    excerpt: 'Discover how rich velvet Aso-Ebi gowns, metallic gold thread embroidery, and modern Gele styling are taking international galas by storm.',
    category: 'Native Fashion',
    date: 'August 8, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    content: [
      'African fashion is currently undergoing a golden renaissance on the world stage. Today, brides and high-profile wedding guests are opting for ultra-luxurious velvet fabrics embellished with hand-stitched zardozi embroidery.',
      'To achieve the ultimate royal look, pair your bespoke Aso-Ebi gown with 18k gold-plated crystal choker sets and a matching structured leather clutch bag.'
    ]
  },
  {
    id: 'blog-2',
    title: 'How to Choose & Care for Cashmere Senator Materials for Executive Women',
    excerpt: 'A comprehensive styling and fabric maintenance guide for custom tailored Senator tunic sets in corporate boardrooms.',
    category: 'Styling Guide',
    date: 'August 2, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    content: [
      'Senator materials are no longer just for men. Executive women across Lagos, London, and New York are adopting tailored Senator suits for a commanding boardroom presence.',
      'Always store your Cashmere wool materials in breathable fabric garment bags and avoid direct heat ironing.'
    ]
  }
];
