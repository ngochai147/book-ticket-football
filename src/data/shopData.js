// (Could be in src/data/shopData.js)
export const allShopData = [
  {
    id: 'mu-kit-home-2425', // Using slugs/IDs for routing
    name: 'Manchester United Home Kit 24/25',
    price: 75.00, // Use numbers for easier sorting/calculation
    category: 'Kits',
    imageUrl: 'https://via.placeholder.com/400x400.png/FF0000/FFFFFF?text=MU+Kit', // Replace with actual
    images: [ // Add more images for detail view
        'https://via.placeholder.com/600x600.png/FF0000/FFFFFF?text=MU+Kit+Front',
        'https://via.placeholder.com/600x600.png/FF4444/FFFFFF?text=MU+Kit+Back',
        'https://via.placeholder.com/600x600.png/FF7777/FFFFFF?text=MU+Kit+Detail',
    ],
    description: 'Official Manchester United home jersey for the 2024/25 season. Made with breathable AEROREADY technology to keep you cool. Features embroidered club crest and sponsor logos.',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 'pl-ball-official-2425',
    name: 'Premier League Official Match Ball 24/25',
    price: 120.00,
    category: 'Equipment',
    imageUrl: 'https://via.placeholder.com/400x400.png/EEEEEE/333333?text=PL+Ball', // Replace with actual
    images: [
        'https://via.placeholder.com/600x600.png/EEEEEE/333333?text=PL+Ball',
        'https://via.placeholder.com/600x600.png/DDDDDD/333333?text=PL+Ball+Panel',
    ],
    description: 'The official match ball used in the Premier League for the 2024/25 season. Thermally bonded seamless construction for predictable trajectory. FIFA Quality Pro certified.',
    rating: 4.8,
    reviews: 85,
  },
  {
    id: 'lfc-scarf-anfield',
    name: 'Liverpool FC Anfield Road Scarf',
    price: 18.00,
    category: 'Accessories',
    imageUrl: 'https://via.placeholder.com/400x400.png/D00027/FFFFFF?text=LFC+Scarf', // Replace with actual
    images: [
        'https://via.placeholder.com/600x600.png/D00027/FFFFFF?text=LFC+Scarf',
        'https://via.placeholder.com/600x600.png/B00017/FFFFFF?text=LFC+Scarf+Detail',
    ],
    description: 'Show your support with this classic Liverpool FC jacquard knit scarf. Features "Anfield Road" and club crest details. Perfect for match days.',
    rating: 4.2,
    reviews: 215,
  },
  {
    id: 'arsenal-training-top-2425',
    name: 'Arsenal Training Top 24/25',
    price: 55.00,
    category: 'Apparel',
    imageUrl: 'https://via.placeholder.com/400x400.png/EF0107/FFFFFF?text=AFC+Top', // Replace with actual
    images: [
        'https://via.placeholder.com/600x600.png/EF0107/FFFFFF?text=AFC+Top',
    ],
    description: 'Official Arsenal training top worn by the players. Lightweight fabric with moisture-wicking properties. Slim fit design.',
    rating: 4.6,
    reviews: 95,
  },
   {
    id: 'chelsea-cap-logo',
    name: 'Chelsea FC Core Logo Cap',
    price: 22.00,
    category: 'Accessories',
    imageUrl: 'https://via.placeholder.com/400x400.png/034694/FFFFFF?text=CFC+Cap', // Replace with actual
    images: [
        'https://via.placeholder.com/600x600.png/034694/FFFFFF?text=CFC+Cap+Front',
        'https://via.placeholder.com/600x600.png/2366B4/FFFFFF?text=CFC+Cap+Side',
    ],
    description: 'Classic cotton twill baseball cap featuring an embroidered Chelsea FC crest. Adjustable strap for a comfortable fit.',
    rating: 4.3,
    reviews: 150,
  },
   {
    id: 'mancity-track-jacket',
    name: 'Manchester City Track Jacket',
    price: 80.00,
    category: 'Apparel',
    imageUrl: 'https://via.placeholder.com/400x400.png/6CABDD/FFFFFF?text=MCFC+Jacket', // Replace with actual
    images: [
       'https://via.placeholder.com/600x600.png/6CABDD/FFFFFF?text=MCFC+Jacket',
    ],
    description: 'Stylish Manchester City track jacket. Full zip design with side pockets and club crest detailing. Comfortable fit for everyday wear.',
    rating: 4.7,
    reviews: 110,
  },
  // Add many more products...
];