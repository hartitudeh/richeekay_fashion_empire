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
    title: 'The Royal Aso-Ebi Renaissance: 7 Trends Redefining African Luxury Couture in 2026',
    excerpt: 'Discover how rich velvet Aso-Ebi gowns, hand-beaded zardozi embroidery, internal corsetry, and royal Gele art are dominating high-society galas from Lagos to Paris.',
    category: 'Native Couture',
    date: 'August 14, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. The Global Ascendance of West African Heritage Fashion',
      'African fashion is currently undergoing a golden renaissance on the world stage. Today, royalty, celebrities, and high-profile wedding guests are opting for ultra-luxurious velvet fabrics embellished with hand-stitched zardozi embroidery and 24k gold threadwork.',
      'From the red carpets of Cannes to grand weddings in Paris and Victoria Island, bespoke Aso-Ebi couture has transcended traditional ceremonial dress to become an international symbol of wealth, poise, and cultural pride.',
      '## 2. Structural Steel Corsetry Meets Traditional Lace',
      'One of the most defining breakthroughs in 2026 couture is the seamless integration of internal corsetry within French lace and Swiss organza gowns. Master tailors at RICHEEKAY employ internal steel boning that shapes the waistline while distributing fabric weight evenly across the shoulders.',
      'This architectural engineering allows brides and gala attendees to stand, dance, and socialize effortlessly for over 10 hours without experiencing corset pinch or garment displacement.',
      '## 3. The Royal Palette: Deep Emerald, Crimson & Champagne Gold',
      'While pastel tones ruled past seasons, 2026 is dominated by regal jewel tones. Deep imperial emerald, dark burgundy velvet, and metallic champagne gold dominate bridal entourages.',
      'When these rich fabrics are accented with hand-strung Swarovski crystals, the garment reflects light with mesmerizing brilliance under gala chandeliers and photography flashes.',
      '## 4. Master Gele Artistry & Headpiece Coordination',
      'No Aso-Ebi ensemble is complete without headpiece harmony. Modern Gele styling has evolved from rigid structures to soft, fluid architectural folds that complement the wearer’s facial symmetry.',
      'At RICHEEKAY FASHION EMPIRE, our master stylists curate custom auto-gele headpieces in matching metallic fabrics, pre-pleated for instantaneous royal fitting.',
      '## 5. Styling & Preservation Guidelines for Beaded Couture',
      'To maintain the heirloom quality of hand-beaded Aso-Ebi gowns, store your garment inside a breathable silk presentation garment bag. Never fold beaded corsetry, and keep garments away from direct sunlight to preserve fabric lustre for generations.'
    ]
  },
  {
    id: 'blog-2',
    title: 'The Executive Woman’s Handbook: Selecting, Styling & Maintaining Cashmere Senator Suits',
    excerpt: 'A comprehensive masterclass on how corporate leaders in Lagos, London, and New York are adopting custom tailored Cashmere Senator tunic sets for boardroom dominance.',
    category: 'Executive Styling',
    date: 'August 10, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. Redefining Corporate Power Dressing',
      'Senator suits are no longer exclusive to traditional menswear. Today, executive women across Lagos, London, and Wall Street are commanding boardrooms in custom tailored Cashmere Senator tunic sets.',
      'Combining crisp structure, immaculate line symmetry, and soft Cashmere wool, the modern Senator suit offers a sophisticated alternative to traditional Western blazer suits.',
      '## 2. Choosing High Thread-Count Cashmere Wool',
      'The key to an exceptional Senator outfit lies in fabric selection. Super 150s and Super 180s Cashmere wool blends offer a subtle metallic sheen, wrinkle resistance, and lightweight breathability suitable for executive travel.',
      'RICHEEKAY sources exclusive Cashmere wool bolts directly from master mills in Biella, Italy, ensuring each suit drapes gracefully while retaining sharp military-grade collar structure.',
      '## 3. Tailoring Precision & Collar Architecture',
      'A perfect Senator suit requires micro-precision measurement. The tunic shoulder seam must align precisely with the natural acromion bone, while the Mandarin collar height should frame the neck without restricting comfort.',
      'Our master tailors incorporate subtle hidden waist adjusters inside trouser bands, allowing fluid flexibility during long corporate strategy sessions.',
      '## 4. Accessorizing Executive Senator Outfits',
      'Pair your Cashmere Senator suit with pointed-toe metallic calfskin stiletto pumps or handcrafted leather loafers. Elevate the look with a minimalist gold watch, monogrammed cuff links, and a structured Italian leather tote.',
      '## 5. Fabric Maintenance & Professional Care',
      'Always dry-clean Cashmere Senator garments using eco-friendly solvent processes. Hang on broad wooden hangers to maintain shoulder padding structure, and steam gently rather than ironing directly on fabric fibers.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Haute Couture Corsetry: The Architectural Precision Behind Gala Evening Gowns',
    excerpt: 'Explore the internal architecture, steel boning, and silk satin linings that sculpt flawless hourglass silhouettes for Met Gala and high-society evening events.',
    category: 'Couture Craftsmanship',
    date: 'August 5, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. The Art of Invisible Internal Sculpting',
      'Behind every show-stopping gala gown lies an invisible masterpiece of structural engineering. Internal corsetry is the foundation upon which haute couture evening wear is built.',
      'At RICHEEKAY, our corsets are custom-molded to each client’s unique ribcage and torso dimensions, ensuring a 2 to 3-inch waist snatch without sacrificing lung capacity or posture ease.',
      '## 2. Spiral Steel vs. Rigid Flat Boning',
      'We combine flexible spiral steel boning along the side curves with rigid flat steel boning along the back spine. This hybrid technique allows maximum lateral flex for movement while preventing any fabric buckling or creasing.',
      'Each bone channel is wrapped in dual-layer cotton coutil fabric, eliminating skin pressure points and guaranteeing silk-smooth interior touch.',
      '## 3. Hand-Beaded Overlay Splicing',
      'Once the internal corset is anchored, our master embellishers hand-stitch beaded French lace and Italian silk chiffon directly onto the corset shell.',
      'Every crystal, bead, and sequin is positioned by hand over hundreds of hours, ensuring that seam lines seamlessly flow around body contours.',
      '## 4. Red Carpet Fitting & Movement Preparation',
      'When wearing high-corsetry gowns, posture is paramount. Practice stepping into your gown from above, securing interior waist tapes first before zipping outer concealed closures.',
      'Pair with 105mm leather heels for elongated elegance, and confidence will turn every hallway into your personal runway.'
    ]
  },
  {
    id: 'blog-4',
    title: 'The Crown Guide: Caring for 100% Raw Unprocessed Virgin Wigs & Swiss HD Lace',
    excerpt: 'Essential maintenance secrets to keep your Raw Cambodian & Brazilian HD Swiss Lace Wigs silky, tangle-free, pre-plucked, and glowing for up to 3 years.',
    category: 'Virgin Hair Masterclass',
    date: 'August 1, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. Understanding 100% Raw Virgin Cambodian Hair',
      'Raw virgin hair is hair in its purest state—unprocessed, un-dyed, and collected from single donors with cuticles aligned in the same natural direction.',
      'RICHEEKAY’s raw Cambodian and Brazilian wigs feature ultra-thin HD Swiss Lace that melts seamlessly into any skin tone, giving the illusion of hair growing directly from the scalp.',
      '## 2. Washing & Co-Washing Routines',
      'Wash your raw virgin wig every 2 to 3 weeks using sulfate-free, paraben-free moisture shampoo. Always detangle hair gently from tips to roots using a wide-tooth comb before applying water.',
      'Submerge the unit in warm water mixed with hydrating conditioner, let soak for 20 minutes, and rinse thoroughly with cold water to seal hair cuticles.',
      '## 3. Protecting Ultra-Fine HD Swiss Lace',
      'HD Swiss lace is delicate and requires gentle handling. Avoid aggressive rubbing or scratching at the hairline. When cleaning glue residue, use specialized lace release solvent and a soft microfiber cloth.',
      '## 4. Heat Styling & Nighttime Silk Protection',
      'Always apply a lightweight thermal heat protectant spray before flat-ironing or curling at temperatures up to 380°F (190°C). At night, store your wig on a satin mannequin head or inside a silk storage bag to prevent friction tangling.'
    ]
  },
  {
    id: 'blog-5',
    title: 'Handbag Investment Mastery: Full-Grain Leather Care & 24k Gold Hardware Protection',
    excerpt: 'How to inspect, condition, and protect luxury calfskin leather handbags and gold monogrammed hardware to preserve resale value and timeless elegance.',
    category: 'Luxury Accessories',
    date: 'July 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. Leather as a High-Yield Luxury Asset',
      'A structured full-grain leather handbag is more than an accessory—it is an investment piece that appreciates over time when properly maintained.',
      'RICHEEKAY luxury top-handle bags and chain totes are crafted from premium European calfskin leather, offering water resistance, rich grain texture, and structural resilience.',
      '## 2. Leather Conditioning in Tropical & Humid Climates',
      'Leather requires hydration to prevent surface cracking. Apply a natural beeswax or lanolin leather conditioner once every 3 months using a clean velvet cloth.',
      'In humid regions like West Africa, store leather bags in climate-controlled rooms with silica gel desiccant packs to prevent mold or moisture buildup.',
      '## 3. Micro-Polishing 24k Gold Monogrammed Hardware',
      'Keep gold-plated metal hardware shining by wiping with a jewelry polishing cloth. Avoid contacting hardware with alcohol-based perfumes or hand sanitizers.',
      '## 4. Proper Bag Stuffing & Dust Bag Storage',
      'Never store empty leather bags flat. Fill bag interiors with acid-free tissue paper or custom velvet handbag pillows to preserve structured silhouettes, then store inside original dust bags upright.'
    ]
  },
  {
    id: 'blog-6',
    title: 'The Bespoke Bridal Journey: From Initial Atelier Sketch to 24k Gold Beaded Masterpiece',
    excerpt: 'An exclusive behind-the-scenes look into RICHEEKAY’s 6-stage bespoke bridal atelier process, from fabric sourcing in Milan to final fitting in Lagos.',
    category: 'Bridal Couture',
    date: 'July 22, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. Stage 1: Private Design & Vision Consultation',
      'The creation of a RICHEEKAY bridal gown begins with a 1-on-1 private consultation with our Executive Creative Director. We review mood boards, venue lighting, skin tone harmony, and movement preferences.',
      '## 2. Stage 2: 3D Body Profiling & Measurement Engineering',
      'Precision is the foundation of royalty. We capture 35 detailed body measurements, including bust-to-waist pitch, torso height, and armhole circumference, ensuring a glove-like fit.',
      '## 3. Stage 3: Toile Mockup Fitting',
      'Before cutting expensive French laces, our master tailors construct a cotton toile mockup. This trial garment allows us to sculpt necklines, adjust seam placement, and test movement ease.',
      '## 4. Stage 4: Fabric Sourcing & Hand Beading',
      'We import exclusive hand-beaded laces from Paris and silk satin from Como, Italy. Artisans spend up to 400 hours hand-sewing individual pearls, crystals, and metallic threads onto your gown shell.',
      '## 5. Stage 5: Final Corset Fitting & Train Balancing',
      'During the final fitting, internal corsetry is locked in, hem lengths are aligned to your exact bridal stiletto height, and train bustle loops are installed for reception dancing ease.',
      '## 6. Stage 6: VIP Signature Packaging & Delivery',
      'Your completed gown is steamed, quality-inspected across 50 points, and encased in our signature metallic gold presentation box, delivered anywhere in the world within 24 to 48 hours.'
    ]
  },
  {
    id: 'blog-7',
    title: 'Stiletto Elegance: Pairing Italian Leather Heels with Evening Gowns & Senator Fits',
    excerpt: 'Master the art of high-fashion shoe pairing, arch support ergonomics, and metallic leather finishes for day-to-night transitions.',
    category: 'Footwear Styling',
    date: 'July 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. The Power of High-Fashion Stiletto Silhouettes',
      'Footwear completes the haute couture narrative. Whether wearing a floor-sweeping gala gown or a tailored Cashmere Senator suit, the right heel height transforms posture, stride, and confidence.',
      'RICHEEKAY’s metallic gold and crystal pumps are crafted in Florence, Italy, featuring ergonomic padded insoles engineered for 8+ hours of gala comfort.',
      '## 2. 85mm vs. 105mm Heel Selection',
      'For long wedding ceremonies and executive receptions, our 85mm stiletto pump offers the optimal balance of height and stability.',
      'For red carpet debuts, gala photography, and evening galas, choose the 105mm stiletto to create maximum leg elongation.',
      '## 3. Matching Shoe Metals to Dress Embellishments',
      'Match your footwear hardware with your gown’s embroidery. Pair gold beaded gowns with champagne gold pumps, and silver crystal laces with metallic platinum stilettos.'
    ]
  },
  {
    id: 'blog-8',
    title: 'Paris to Lagos: The Fusion of French Silk Chiffon with West African Textile Heritage',
    excerpt: 'Tracing the decade-long journey of RICHEEKAY FASHION EMPIRE in blending Parisian haute couture draping techniques with West African royal aesthetics.',
    category: 'Brand Heritage',
    date: 'July 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    content: [
      '## 1. A Decade of Global Luxury Fashion',
      'Founded in 2016 in Lagos, RICHEEKAY FASHION EMPIRE was established with a singular mission: to elevate African luxury fashion onto international runways alongside Paris, Milan, and London couture houses.',
      '## 2. Blending Parisian Draping with Royal African Motif Art',
      'Our atelier fuses light French silk chiffon and hand-beaded lace with structural West African silhouette traditions. The result is fluid, breathtaking couture that commands attention worldwide.',
      '## 3. Showrooms in Lagos, Abuja & London',
      'With flagship showrooms in Victoria Island Lagos, Transcorp Hilton Arcade Abuja, and Kensington High Street London, RICHEEKAY serves a global clientele of royalty, dignitaries, and fashion leaders.',
      '## 4. The Digital Fashion Empire Experience',
      'Today, our digital platform brings bespoke body profiling, multi-currency purchasing, and AI Style Consultation to discerning women across 120+ countries.'
    ]
  }
];
