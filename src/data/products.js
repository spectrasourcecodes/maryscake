export const products = [
  // ===== CAKES =====
  {
    id: 'classic-vanilla-birthday-cake',
    name: 'Classic Vanilla Birthday Cake',
    category: 'birthday',
    type: 'cake',
    description: 'A timeless classic – moist vanilla sponge layered with creamy vanilla buttercream. Perfect for any birthday celebration. Decorated with elegant rosettes and sprinkles.',
    shortDescription: 'Moist vanilla sponge with creamy buttercream.',
    price: 25000,
    priceLabel: 'From ₦25,000',
    image: '/images/vanila-cake.jfif',
    featured: true,
    popular: true,
    available: true,
    tags: ['Birthday', 'Vanilla', 'Classic'],
    options: {
      sizes: ['6 inch', '8 inch', '10 inch', '12 inch'],
      flavors: ['Vanilla', 'Chocolate', 'Strawberry']
    }
  },
  {
    id: 'chocolate-celebration-cake',
    name: 'Chocolate Celebration Cake',
    category: 'birthday',
    type: 'cake',
    description: 'Rich, decadent chocolate cake with fudge filling and ganache drip. Topped with chocolate shards and fresh berries. A chocolate lover\'s dream.',
    shortDescription: 'Decadent chocolate cake with fudge ganache.',
    price: 30000,
    priceLabel: 'From ₦30,000',
    image: '/images/chocolate-cake.jfif',
    featured: true,
    popular: true,
    available: true,
    tags: ['Chocolate', 'Celebration', 'Decadent'],
    options: {
      sizes: ['6 inch', '8 inch', '10 inch'],
      flavors: ['Chocolate', 'Dark Chocolate', 'Mocha']
    }
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet Cake',
    category: 'birthday',
    type: 'cake',
    description: 'Stunning red velvet cake with cream cheese frosting. Moist, tangy, and beautifully decorated with elegant piping and edible gold leaf.',
    shortDescription: 'Classic red velvet with cream cheese frosting.',
    price: 28000,
    priceLabel: 'From ₦28,000',
    image: '/images/red-velvet.jfif',
    featured: true,
    popular: false,
    available: true,
    tags: ['Red Velvet', 'Elegant', 'Cream Cheese'],
    options: {
      sizes: ['6 inch', '8 inch', '10 inch'],
      flavors: ['Red Velvet', 'Chocolate Red Velvet']
    }
  },
  {
    id: 'luxury-birthday-cake',
    name: 'Luxury Birthday Cake',
    category: 'birthday',
    type: 'cake',
    description: 'The ultimate celebration cake – multi-tiered with premium flavors, edible flowers, gold leaf, and intricate piping. Fully customizable for your special day.',
    shortDescription: 'Premium multi-tiered celebration cake.',
    price: 55000,
    priceLabel: 'From ₦55,000',
    image: '/images/luxury-cake.jfif',
    featured: true,
    popular: true,
    available: true,
    tags: ['Luxury', 'Premium', 'Custom'],
    options: {
      sizes: ['8 inch', '10 inch', '12 inch', 'Two-Tier', 'Three-Tier'],
      flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Carrot']
    }
  },
  {
    id: 'anniversary-cake',
    name: 'Anniversary Celebration Cake',
    category: 'anniversary',
    type: 'cake',
    description: 'Elegant anniversary cake with delicate floral designs and a touch of gold. Choose from our premium flavors to celebrate your love story.',
    shortDescription: 'Elegant cake for anniversary celebrations.',
    price: 35000,
    priceLabel: 'From ₦35,000',
    image: '/images/aniversary cake.jfif',
    featured: false,
    popular: false,
    available: true,
    tags: ['Anniversary', 'Elegant', 'Floral'],
    options: {
      sizes: ['6 inch', '8 inch', '10 inch'],
      flavors: ['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon']
    }
  },
  {
    id: 'cupcake-box',
    name: 'Premium Cupcake Box',
    category: 'cupcakes',
    type: 'cake',
    description: 'A beautiful box of 12 premium cupcakes with assorted flavors and toppings. Perfect for parties, events, or as a thoughtful gift.',
    shortDescription: 'Box of 12 premium assorted cupcakes.',
    price: 18000,
    priceLabel: '₦18,000 / box',
    image: '/images/cup-cake.jfif',
    featured: false,
    popular: true,
    available: true,
    tags: ['Cupcakes', 'Gift', 'Party'],
    options: {
      flavors: ['Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet', 'Carrot']
    }
  },
  {
    id: 'custom-photo-cake',
    name: 'Customized Photo Cake',
    category: 'custom',
    type: 'cake',
    description: 'Make your celebration personal with a custom photo cake. We\'ll print your favorite photo on edible paper and create a stunning cake around it.',
    shortDescription: 'Custom cake with edible photo print.',
    price: 32000,
    priceLabel: 'From ₦32,000',
    image: '/images/photo-cake.jfif',
    featured: false,
    popular: false,
    available: true,
    tags: ['Custom', 'Photo', 'Personalized'],
    options: {
      sizes: ['8 inch', '10 inch', '12 inch'],
      flavors: ['Vanilla', 'Chocolate', 'Red Velvet']
    }
  },
  {
    id: 'premium-cake-combo',
    name: 'Premium Cake Combo',
    category: 'birthday',
    type: 'cake',
    description: 'The ultimate combo – a 10-inch celebration cake plus a box of 6 premium cupcakes. Perfect for larger parties and gatherings.',
    shortDescription: 'Celebration cake + 6 cupcakes combo.',
    price: 42000,
    priceLabel: 'From ₦42,000',
    image: '/images/cake-combo.jfif',
    featured: false,
    popular: true,
    available: true,
    tags: ['Combo', 'Party', 'Value'],
    options: {
      cakeSizes: ['8 inch', '10 inch'],
      cakeFlavors: ['Vanilla', 'Chocolate', 'Red Velvet'],
      cupcakeFlavors: ['Vanilla', 'Chocolate', 'Strawberry']
    }
  },

  // ===== SURPRISES =====
  {
    id: 'classic-birthday-surprise',
    name: 'Classic Birthday Surprise',
    category: 'birthday',
    type: 'surprise',
    description: 'A classic birthday surprise package that brings joy and delight. Includes a beautiful cake, balloons, a gift box, and a personalized message.',
    price: 50000,
    priceLabel: 'From ₦50,000',
    image: '/images/Birthday surprise ideas.jfif',
    featured: true,
    popular: true,
    available: true,
    includes: [
      'Birthday Cake (choice of flavor)',
      'Helium Balloons (assorted colors)',
      'Luxury Gift Box',
      'Personalized Message Card',
      'Complimentary Party Hat'
    ],
    tags: ['Birthday', 'Classic', 'Surprise']
  },
  {
    id: 'luxury-birthday-surprise',
    name: 'Luxury Birthday Surprise',
    category: 'birthday',
    type: 'surprise',
    description: 'The ultimate luxury birthday experience. Premium cake, designer balloons, a luxury gift hamper, flower bouquet, and full décor setup.',
    price: 95000,
    priceLabel: 'From ₦95,000',
    image: '/images/luxury-surprise.jfif',
    featured: true,
    popular: true,
    available: true,
    includes: [
      'Premium Birthday Cake (custom design)',
      'Designer Balloon Garland',
      'Luxury Gift Hamper',
      'Fresh Flower Bouquet',
      'Champagne Flute Set',
      'Personalized Video Message',
      'Full Décor Setup'
    ],
    tags: ['Luxury', 'Premium', 'Birthday']
  },
  {
    id: 'romantic-surprise',
    name: 'Romantic Surprise Package',
    category: 'romantic',
    type: 'surprise',
    description: 'Create an unforgettable romantic moment. Includes a romantic dinner setup, flower bouquet, premium cake, and a personalized love letter.',
    price: 65000,
    priceLabel: 'From ₦65,000',
    image: '/images/romantic-surprise.jfif',
    featured: true,
    popular: true,
    available: true,
    includes: [
      'Romantic Dinner Setup',
      'Fresh Red Roses (dozen)',
      'Heart-shaped Cake',
      'Personalized Love Letter',
      'Scented Candles',
      'String Lights Décor'
    ],
    tags: ['Romantic', 'Love', 'Valentine']
  },
  {
    id: 'valentine-surprise',
    name: 'Valentine\'s Day Surprise',
    category: 'valentine',
    type: 'surprise',
    description: 'The perfect Valentine\'s surprise for your loved one. Chocolate-covered strawberries, heart-shaped cake, rose bouquet, and a romantic gift box.',
    price: 55000,
    priceLabel: 'From ₦55,000',
    image: '/images/valintine-surprise.jfif',
    featured: true,
    popular: false,
    available: true,
    includes: [
      'Heart-shaped Red Velvet Cake',
      'Chocolate-covered Strawberries',
      'Rose Bouquet (red & pink)',
      'Luxury Gift Box',
      'Valentine\'s Card',
      'Rose Petals Décor'
    ],
    tags: ['Valentine', 'Romantic', 'Love']
  },
  {
    id: 'anniversary-surprise',
    name: 'Anniversary Surprise Package',
    category: 'anniversary',
    type: 'surprise',
    description: 'Celebrate your love story with a beautiful anniversary surprise. Elegant cake, champagne, flower arrangement, and a memory book.',
    price: 70000,
    priceLabel: 'From ₦70,000',
    image: '/images/aniversiry-supprise.jfif',
    featured: false,
    popular: false,
    available: true,
    includes: [
      'Elegant Anniversary Cake',
      'Champagne Bottle (premium)',
      'Flower Arrangement (orchids & roses)',
      'Personalized Memory Book',
      'Candlelight Dinner Setup',
      'Anniversary Photo Frame'
    ],
    tags: ['Anniversary', 'Elegant', 'Romantic']
  },
  {
    id: 'proposal-surprise',
    name: 'Proposal Surprise Package',
    category: 'romantic',
    type: 'surprise',
    description: 'Make your proposal unforgettable with a complete surprise setup. Custom décor, photographer, flower arrangement, and a celebratory cake.',
    price: 120000,
    priceLabel: 'From ₦120,000',
    image: '/images/proposal-supprise.jfif',
    featured: false,
    popular: false,
    available: true,
    includes: [
      'Custom Proposal Décor Setup',
      'Flower Wall & Rose Petals',
      'Engagement Cake',
      'Professional Photographer',
      'Champagne & Flutes',
      'Personalized Proposal Card',
      'String Lights & Candles'
    ],
    tags: ['Proposal', 'Romantic', 'Premium']
  },
  {
    id: 'premium-gift-box',
    name: 'Premium Gift Box',
    category: 'gift',
    type: 'surprise',
    description: 'A beautifully curated gift box filled with premium treats, small gifts, and a personalized message. Perfect for any occasion.',
    price: 35000,
    priceLabel: 'From ₦35,000',
    image: '/images/gift-box.jfif',
    featured: false,
    popular: true,
    available: true,
    includes: [
      'Assorted Luxury Chocolates',
      'Gourmet Cookies',
      'Scented Candle',
      'Personalized Message',
      'Decorative Gift Box with Ribbon',
      'Small Teddy Bear'
    ],
    tags: ['Gift', 'Premium', 'Versatile']
  },
  {
    id: 'custom-surprise-package',
    name: 'Customized Surprise Package',
    category: 'custom',
    type: 'surprise',
    description: 'Tell us what you envision, and we\'ll create a completely customized surprise experience tailored to your loved one\'s preferences and personality.',
    price: 80000,
    priceLabel: 'From ₦80,000',
    image: '/images/custume-surprise.jfif',
    featured: false,
    popular: false,
    available: true,
    includes: [
      'Customized Cake (design & flavor)',
      'Personalized Décor Setup',
      'Custom Gift Selection',
      'Surprise Delivery',
      'Personalized Message',
      'Themed Props & Accessories'
    ],
    tags: ['Custom', 'Personalized', 'Unique']
  }
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getPopularProducts = () => products.filter(p => p.popular);
export const getCakes = () => products.filter(p => p.type === 'cake');
export const getSurprises = () => products.filter(p => p.type === 'surprise');
export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);