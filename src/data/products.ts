import { Product } from '../types';

/**
 * CartFlow 4.0 Central Product Catalogue
 * Exactly 30 demonstration products across six collections.
 * 
 * Collections Breakdown:
 * 1. Electronics: 6 products
 * 2. Fashion: 5 products
 * 3. Home & Living: 5 products
 * 4. Bags & Accessories: 5 products
 * 5. Fitness & Lifestyle: 5 products
 * 6. Stationery: 4 products
 * Total: 30 Products
 * 
 * Note: Pure integer INR monetary arithmetic throughout.
 * All items are demonstration catalogue items.
 */
export const PRODUCTS: readonly Product[] = [
  // ==========================================
  // COLLECTION 1: ELECTRONICS (6 Products)
  // ==========================================
  {
    id: 'prod-aero-headphones',
    slug: 'aero-wireless-headphones',
    name: 'Aero Wireless Headphones',
    price: 1499,
    category: 'Electronics',
    collectionSlug: 'electronics',
    description: 'High-fidelity wireless acoustics with hybrid active noise cancellation, 40-hour battery reserve, and memory-foam ear cushions.',
    details: 'The Aero Wireless Headphones deliver studio-grade audio fidelity engineered with custom 40mm neodymium drivers. Designed for all-day focus, with plush protein memory foam cushions and intuitive tactile playback controls.',
    features: [
      'Hybrid Active Noise Cancellation (up to 32dB)',
      '40-Hour Battery Reserve with USB-C Fast Charge',
      'Lossless Bluetooth 5.3 Multi-Point Connectivity',
      'Ergonomic Fold-Flat Swivel Travel Frame'
    ],
    badge: 'Artisan Essential',
    inStock: true,
    image: '/assets/products/aero-headphones.svg',
    keywords: ['headphones', 'wireless', 'bluetooth', 'noise cancelling', 'audio', 'earphones'],
    tags: ['audio', 'wireless', 'featured', 'bestseller']
  },
  {
    id: 'prod-lumen-speaker',
    slug: 'lumen-portable-bluetooth-speaker',
    name: 'Lumen Portable Bluetooth Speaker',
    price: 2199,
    category: 'Electronics',
    collectionSlug: 'electronics',
    description: 'Rugged 360-degree cylindrical speaker featuring dual passive radiators, 16-hour playtime, and IPX7 waterproof housing.',
    details: 'Engineered for seamless indoor and outdoor playback. The Lumen speaker combines dual 50mm dynamic drivers with opposing bass radiators for balanced room-filling sound and an ambient tactile volume knob.',
    features: [
      '360° Omnidirectional Acoustic Projection',
      '16-Hour Continuous Playtime (5200mAh Cell)',
      'IPX7 Immersion Waterproof Certification',
      'Integrated Braided Nylon Carry Lanyard'
    ],
    badge: 'Trending',
    inStock: true,
    image: '/assets/products/lumen-speaker.svg',
    keywords: ['speaker', 'bluetooth', 'portable', 'waterproof', 'audio', 'bass'],
    tags: ['audio', 'portable', 'trending']
  },
  {
    id: 'prod-pulse-smartwatch',
    slug: 'pulse-dynamic-smartwatch',
    name: 'Pulse Dynamic Smartwatch',
    price: 3499,
    category: 'Electronics',
    collectionSlug: 'electronics',
    description: 'Minimalist smart timepiece with crisp 1.78-inch AMOLED display, all-day biometric health tracking, and 7-day battery standby.',
    details: 'The Pulse Smartwatch merges modern horology with vital lifestyle metrics. Features an aerospace-grade aluminum chassis, optical PPG sensors for heart and blood oxygen metrics, and 24 sport tracking profiles.',
    features: [
      '1.78-inch Ultra-Bright AMOLED Touchscreen',
      '24/7 Heart Rate & SpO2 Biometric Sensors',
      '7-Day Typical Battery Life on Single Charge',
      '5ATM Water Resistance for Swimming'
    ],
    badge: 'Featured',
    inStock: true,
    image: '/assets/products/pulse-smartwatch.svg',
    keywords: ['smartwatch', 'watch', 'fitness tracker', 'heart rate', 'wearable', 'digital'],
    tags: ['wearable', 'fitness', 'featured']
  },
  {
    id: 'prod-orbit-charger',
    slug: 'orbit-3-in-1-fast-wireless-charger',
    name: 'Orbit 3-in-1 Fast Wireless Charger',
    price: 1899,
    category: 'Electronics',
    collectionSlug: 'electronics',
    description: 'Space-saving magnetic charging stand delivering simultaneous fast-charging for your phone, smartwatch, and earbuds.',
    details: 'Crafted from anodized aluminum and soft-touch matte silicone. The Orbit charging hub eliminates cable clutter by centralizing your essential desktop devices on one weighted, non-slip charging pedestal.',
    features: [
      '15W Qi-Certified Fast Wireless Magnetic Output',
      'Simultaneous 3-Device Simultaneous Inductive Hub',
      'Intelligent Foreign Object & Heat Protection',
      'Weighted Zinc-Alloy Anti-Tip Base Stand'
    ],
    inStock: true,
    image: '/assets/products/orbit-charger.svg',
    keywords: ['charger', 'wireless charger', 'dock', 'fast charge', 'stand', 'magsafe'],
    tags: ['charger', 'desktop', 'accessories']
  },
  {
    id: 'prod-vertex-webcam',
    slug: 'vertex-2k-hd-streaming-webcam',
    name: 'Vertex 2K Ultra HD Streaming Webcam',
    price: 2799,
    category: 'Electronics',
    collectionSlug: 'electronics',
    description: 'Studio webcam with 2K QHD glass optics, auto light correction, dual stereo noise-filtering mics, and magnetic privacy cover.',
    details: 'Designed for crystal-clear video meetings and streaming. The Vertex webcam delivers sharp 2560x1440 resolution at 30fps with automatic ambient light compensation and hardware physical privacy slider.',
    features: [
      '2K Quad-HD Precision Optical Glass Lens',
      'Dual Omni-Directional Noise Canceling Mics',
      'Built-in Sliding Physical Privacy Shutter',
      '360° Rotational Universal Monitor Mount'
    ],
    inStock: true,
    image: '/assets/products/vertex-webcam.svg',
    keywords: ['webcam', 'camera', 'streaming', 'video call', 'conference', '2k'],
    tags: ['video', 'workspace', 'new-arrival']
  },
  {
    id: 'prod-aura-lightbar',
    slug: 'aura-monitor-light-bar',
    name: 'Aura Monitor Light Bar & Desk Lamp',
    price: 1699,
    category: 'Electronics',
    collectionSlug: 'electronics',
    description: 'Asymmetric screen-mounted light bar that illuminates your desk without glare, reflections, or screen flicker.',
    details: 'Save precious desk space while safeguarding eye comfort. The Aura Light Bar mounts directly on flat or curved monitors, casting a forward asymmetric beam that lights your keyboard and documents without reflecting off the monitor.',
    features: [
      'Asymmetric Optical Beam with Zero Screen Glare',
      'Stepless Touch Brightness & 3 Color Temp Modes',
      'USB-Powered with Universal Monitor Counterweight',
      'High Color Rendering Index (CRI > 95)'
    ],
    inStock: true,
    image: '/assets/products/aura-lightbar.svg',
    keywords: ['light bar', 'desk lamp', 'led', 'monitor light', 'workspace', 'lighting'],
    tags: ['lighting', 'workspace']
  },

  // ==========================================
  // COLLECTION 2: FASHION (5 Products)
  // ==========================================
  {
    id: 'prod-classic-linen-shirt',
    slug: 'classic-tailored-linen-shirt',
    name: 'Classic Tailored Linen Shirt',
    price: 1299,
    category: 'Fashion',
    collectionSlug: 'fashion',
    description: 'Breathable 100% natural organic flax linen shirt with reinforced collar, natural horn buttons, and relaxed tailored fit.',
    details: 'Woven from pre-washed French flax linen that softens with every wash. Designed for effortless transitional layering across formal and relaxed settings with breathable all-day drape.',
    features: [
      '100% Certified Organic French Flax Linen',
      'Natural Sustainable Horn Button Fastenings',
      'Reinforced Split Yoke & French Side Seams',
      'Pre-Softened Fabric to Prevent Shrinkage'
    ],
    badge: 'Bestseller',
    inStock: true,
    image: '/assets/products/linen-shirt.svg',
    keywords: ['shirt', 'linen', 'apparel', 'formal', 'casual', 'clothing', 'menswear'],
    tags: ['apparel', 'linen', 'bestseller']
  },
  {
    id: 'prod-merino-wool-crewneck',
    slug: 'essential-merino-wool-crewneck',
    name: 'Essential Merino Wool Crewneck',
    price: 2499,
    category: 'Fashion',
    collectionSlug: 'fashion',
    description: 'Superfine 19.5-micron Australian merino wool sweater engineered for natural thermoregulation and odor resistance.',
    details: 'A timeless knitwear staple. Spun from long-staple merino wool yarn that delivers warmth without bulk, naturally wicking moisture while retaining a luxurious soft hand feel against the skin.',
    features: [
      '100% Superfine 19.5-Micron Merino Wool',
      'Natural Temperature Regulation & Odor Neutral',
      'Ribbed Tubular Collar, Cuffs, and Waistband',
      'Anti-Pilling Worsted Yarn Construction'
    ],
    badge: 'Featured',
    inStock: true,
    image: '/assets/products/wool-crewneck.svg',
    keywords: ['sweater', 'merino wool', 'knitwear', 'pullover', 'warm', 'winter', 'apparel'],
    tags: ['knitwear', 'apparel', 'featured']
  },
  {
    id: 'prod-relaxed-chinos',
    slug: 'relaxed-everyday-stretch-chinos',
    name: 'Relaxed Everyday Stretch Chinos',
    price: 1599,
    category: 'Fashion',
    collectionSlug: 'fashion',
    description: 'Durable cotton twill trousers tailored with a hint of elastane stretch for mobility and structured everyday polish.',
    details: 'Constructed from 280 GSM combed cotton twill. Featuring deep slash pockets, a concealed interior coin pocket, and a clean tapered ankle cut suitable for sneakers or dress shoes.',
    features: [
      '98% Combed Cotton Twill with 2% Spandex Flex',
      'Classic Tailored Fit with Subtle Leg Taper',
      'Heavy-Duty YKK Brass Zip Fly with Button Closure',
      'Double-Welted Buttoned Rear Pockets'
    ],
    inStock: true,
    image: '/assets/products/stretch-chinos.svg',
    keywords: ['chinos', 'trousers', 'pants', 'cotton', 'stretch', 'bottoms', 'apparel'],
    tags: ['apparel', 'pants', 'staple']
  },
  {
    id: 'prod-artisan-leather-belt',
    slug: 'artisan-full-grain-leather-belt',
    name: 'Artisan Full-Grain Leather Belt',
    price: 899,
    category: 'Fashion',
    collectionSlug: 'fashion',
    description: 'Vegetable-tanned full-grain leather belt paired with a solid brushed brass buckle and beveled hand-finished edges.',
    details: 'Cut from 3.8mm thick vegetable-tanned steer hide that develops a distinctive patina with age. Featuring hand-burnished edges, heavy-duty saddle stitching, and solid brass hardware.',
    features: [
      '100% Full-Grain Vegetable-Tanned Cowhide',
      'Solid Forged Brushed Brass Buckle Frame',
      'Double Leather Keeper Loop Assembly',
      'Hand-Burnished Waxed Edge Treatment'
    ],
    inStock: true,
    image: '/assets/products/leather-belt.svg',
    keywords: ['belt', 'leather', 'waistband', 'formal', 'accessories', 'menswear'],
    tags: ['accessories', 'leather']
  },
  {
    id: 'prod-minimalist-sneakers',
    slug: 'minimalist-low-profile-court-sneakers',
    name: 'Minimalist Low-Profile Court Sneakers',
    price: 2299,
    category: 'Fashion',
    collectionSlug: 'fashion',
    description: 'Clean monochrome canvas sneakers with vulcanized natural rubber cupsole and memory foam cushioned footbed.',
    details: 'An understated footwear silhouette built for daily walking comfort. Combining heavyweight organic canvas, reinforced eyelets, and a shock-absorbing natural gum sole.',
    features: [
      'Heavyweight 12oz Organic Cotton Canvas',
      'Vulcanized Non-Marking Natural Gum Sole',
      'Removable Arch-Support Memory Foam Insole',
      'Reinforced Heel Counter and Padded Collar'
    ],
    badge: 'New',
    inStock: true,
    image: '/assets/products/minimalist-sneakers.svg',
    keywords: ['sneakers', 'shoes', 'footwear', 'canvas', 'low top', 'court shoes'],
    tags: ['footwear', 'new-arrival']
  },

  // ==========================================
  // COLLECTION 3: HOME & LIVING (5 Products)
  // ==========================================
  {
    id: 'prod-ceramic-pour-over',
    slug: 'artisan-ceramic-coffee-pour-over',
    name: 'Artisan Ceramic Coffee Pour-Over Dripper',
    price: 799,
    category: 'Home & Living',
    collectionSlug: 'home-living',
    description: 'Hand-glazed stoneware coffee dripper with spiral flow ridges designed for balanced artisan extraction and heat retention.',
    details: 'Brew sweet, clean coffee using standard cone filters. The dense ceramic body retains brewing temperature throughout the extraction, while interior curved channels optimize liquid flow velocity.',
    features: [
      'High-Fired Stoneware with Matte Glaze Finish',
      'Interior Spiral Grooves for Uniform Extraction',
      'Heat-Insulated Ergonomic Single-Finger Handle',
      'Compatible with Standard Cone Filter Papers'
    ],
    badge: 'Bestseller',
    inStock: true,
    image: '/assets/products/ceramic-pour-over.svg',
    keywords: ['coffee', 'pour over', 'ceramic', 'dripper', 'brew', 'kitchen', 'stoneware'],
    tags: ['kitchen', 'coffee', 'bestseller']
  },
  {
    id: 'prod-linen-cushion-cover',
    slug: 'washed-linen-throw-cushion-covers',
    name: 'Washed Linen Throw Cushion Covers (Set of 2)',
    price: 849,
    category: 'Home & Living',
    collectionSlug: 'home-living',
    description: 'Pair of pre-softened pure linen cushion covers with concealed zipper and textured relaxed drape (45x45 cm).',
    details: 'Elevate your sofa or bed with earthy tactile elegance. Woven from 100% natural European flax that stays cool in summer and warm in winter, finished with hidden color-matched zippers.',
    features: [
      '100% Washed European Flax Linen Fabric',
      'Includes 2 Cushion Covers (45 x 45 cm)',
      'Concealed Color-Matched Bottom Zipper Closure',
      'Machine Washable & Natural Crumple Texture'
    ],
    inStock: true,
    image: '/assets/products/cushion-covers.svg',
    keywords: ['cushion', 'pillow cover', 'linen', 'living room', 'decor', 'textiles', 'home'],
    tags: ['decor', 'textiles']
  },
  {
    id: 'prod-diffuser-humidifier',
    slug: 'ultrasonic-ceramic-aroma-diffuser',
    name: 'Ultrasonic Ceramic Aroma Diffuser',
    price: 1699,
    category: 'Home & Living',
    collectionSlug: 'home-living',
    description: 'Textured matte ceramic aromatherapy diffuser with whisper-quiet ultrasonic atomization and warm ambient LED glow.',
    details: 'Disperses essential oils and gentle cool humidity into your sanctuary. Hand-molded matte ceramic cover houses a 180ml water reservoir with timed mist intervals and automatic safety shut-off.',
    features: [
      'Whisper-Quiet 2.4MHz Ultrasonic Atomizer',
      'Handcrafted Matte Porcelain Ceramic Shell',
      'Dual Mist Modes (Continuous & Intermittent)',
      'Independent Warm Candlelight Ambient Glow'
    ],
    badge: 'Featured',
    inStock: true,
    image: '/assets/products/aroma-diffuser.svg',
    keywords: ['diffuser', 'aromatherapy', 'humidifier', 'essential oils', 'zen', 'wellness'],
    tags: ['wellness', 'decor', 'featured']
  },
  {
    id: 'prod-bamboo-desk-caddy',
    slug: 'modular-natural-bamboo-desk-caddy',
    name: 'Modular Natural Bamboo Desk Caddy',
    price: 699,
    category: 'Home & Living',
    collectionSlug: 'home-living',
    description: 'Eco-friendly solid bamboo desktop organizer with customizable compartment dividers and non-slip rubber feet.',
    details: 'Organize pens, stationery, cables, and remotes in one sustainable centerpiece. Crafted from solid Moso bamboo finished with a smooth clear satin seal that resists stains and moisture.',
    features: [
      '100% Solid Renewable Moso Bamboo Wood',
      '4 Adjustable & Removable Internal Dividers',
      'Non-Scratch Silicone Protective Base Pads',
      'Compact Footprint (22cm x 15cm x 10cm)'
    ],
    inStock: true,
    image: '/assets/products/bamboo-caddy.svg',
    keywords: ['desk organizer', 'bamboo', 'stationery caddy', 'office', 'storage', 'tidy'],
    tags: ['organization', 'workspace']
  },
  {
    id: 'prod-soy-scented-candle',
    slug: 'hand-poured-soy-scented-candle-cedar',
    name: 'Hand-Poured Soy Wax Candle — Cedar & Vetiver',
    price: 599,
    category: 'Home & Living',
    collectionSlug: 'home-living',
    description: 'Clean-burning 250g soy wax candle featuring smoky cedarwood, vetiver root, and dried amber in a reusable amber jar.',
    details: 'Hand-poured in small batches using non-GMO vegetable soy wax and premium phthalate-free fragrance oils. Delivers 50 hours of calming aroma with a crackle-free braided cotton wick.',
    features: [
      '100% Clean-Burning Sustainable Soy Wax',
      'Up to 50 Hours of Calming Ambient Burn',
      'Lead-Free Natural Braided Cotton Wick',
      'Reusable Amber Apothecary Glass Tumbler with Lid'
    ],
    badge: 'New',
    inStock: true,
    image: '/assets/products/scented-candle.svg',
    keywords: ['candle', 'soy wax', 'scented', 'aromatherapy', 'cedar', 'home', 'fragrance'],
    tags: ['home', 'fragrance', 'new-arrival']
  },

  // ==========================================
  // COLLECTION 4: BAGS & ACCESSORIES (5 Products)
  // ==========================================
  {
    id: 'prod-urban-backpack',
    slug: 'urban-everyday-backpack',
    name: 'Urban Everyday Backpack',
    price: 999,
    category: 'Bags & Accessories',
    collectionSlug: 'bags-accessories',
    description: 'Weatherproof 22L commuter carryall featuring dedicated 16-inch padded laptop compartment and ergonomic straps.',
    details: 'The quintessential minimalist work and travel backpack. Crafted from water-resistant coated organic canvas with padded ergonomic straps, quick-access side pockets, and an anti-theft lumbar compartment.',
    features: [
      'Weatherproof 600D Coated Organic Canvas',
      'Dedicated Shock-Padded 16" Laptop Sleeve',
      'Concealed Anti-Theft Lumbar Security Pocket',
      'Luggage Trolley Pass-Through Rear Strap'
    ],
    badge: 'Bestseller',
    inStock: true,
    image: '/assets/products/urban-backpack.svg',
    keywords: ['backpack', 'bag', 'laptop bag', 'canvas', 'carryall', 'travel', 'commute'],
    tags: ['bags', 'carryall', 'bestseller', 'featured']
  },
  {
    id: 'prod-canvas-commuter-tote',
    slug: 'heavy-duty-canvas-commuter-tote',
    name: 'Heavy-Duty Structured Canvas Tote',
    price: 749,
    category: 'Bags & Accessories',
    collectionSlug: 'bags-accessories',
    description: 'Structured 16oz heavyweight waxed canvas shoulder tote with internal zippered pocket and brass key carabiner.',
    details: 'Built to carry groceries, books, or laptops with effortless durability. Features thick reinforced webbing handles, a water-resistant bottom panel, and an internal secure zipper pouch for phone and keys.',
    features: [
      '16oz Rugged Waxed Cotton Duck Canvas',
      'Reinforced Cross-Box Stitched Shoulder Straps',
      'Internal Zippered Pocket & Solid Brass Key Leash',
      'Structured Wide Base with Reinforced Seams'
    ],
    badge: 'Trending',
    inStock: true,
    image: '/assets/products/canvas-tote.svg',
    keywords: ['tote bag', 'canvas tote', 'shopping bag', 'shoulder bag', 'carryall'],
    tags: ['bags', 'tote', 'trending']
  },
  {
    id: 'prod-bifold-rfid-wallet',
    slug: 'slim-bifold-rfid-leather-wallet',
    name: 'Slim Bifold RFID-Blocking Leather Wallet',
    price: 649,
    category: 'Bags & Accessories',
    collectionSlug: 'bags-accessories',
    description: 'Ultra-thin 8mm full-grain leather bifold featuring certified RFID-shielding mesh, 6 card slots, and cash sleeve.',
    details: 'Designed to eliminate pocket bulk while protecting electronic cards from unauthorized scans. Crafted from vegetable-tanned top-grain leather that molds to your cards over time.',
    features: [
      'Certified 13.56 MHz RFID Shielding Layer',
      '6 Dedicated Card Slots & Full-Length Cash Slot',
      'Ultra-Slim 8mm Profile Even When Loaded',
      'Hand-Burnished Vegetable-Tanned Leather'
    ],
    inStock: true,
    image: '/assets/products/leather-wallet.svg',
    keywords: ['wallet', 'leather wallet', 'rfid', 'card holder', 'bifold', 'money clip'],
    tags: ['accessories', 'leather']
  },
  {
    id: 'prod-tech-cable-pouch',
    slug: 'compact-cable-and-tech-pouch',
    name: 'Compact Cable & Tech Accessory Pouch',
    price: 549,
    category: 'Bags & Accessories',
    collectionSlug: 'bags-accessories',
    description: 'Weather-resistant zippered accessory case with elastic cord loops, mesh compartments, and padded protective shell.',
    details: 'Keep power banks, charging cords, dongles, and stylus pens organized on the move. Opens flat like a book with dual heavy-duty YKK zippers and soft scratch-free interior lining.',
    features: [
      'Water-Repellent Ripstop Nylon Exterior',
      'Book-Style 180° Flat Lay Opening Design',
      '6 Elastic Cable Keepers & 3 Mesh Pockets',
      'Dense EVA Foam Protective Exterior Shell'
    ],
    badge: 'Essential',
    inStock: true,
    image: '/assets/products/tech-pouch.svg',
    keywords: ['cable organizer', 'tech pouch', 'travel case', 'charger bag', 'electronics bag'],
    tags: ['accessories', 'travel']
  },
  {
    id: 'prod-polarized-sunglasses',
    slug: 'classic-polarized-acetate-sunglasses',
    name: 'Classic Polarized Acetate Sunglasses',
    price: 1199,
    category: 'Bags & Accessories',
    collectionSlug: 'bags-accessories',
    description: 'Handmade cellulose acetate sunglasses with polarized UV400 lenses and 5-barrel stainless steel hinges.',
    details: 'Timeless unisex silhouette offering sharp optical clarity and full glare reduction. Includes a hard protective travel case and microfiber cleaning cloth.',
    features: [
      '100% UV400 Category 3 Polarized Lenses',
      'Handmade Hypoallergenic Cellulose Acetate Frame',
      'Durable 5-Barrel German Stainless Steel Hinges',
      'Includes Structured Travel Hard Case & Cloth'
    ],
    inStock: true,
    image: '/assets/products/sunglasses.svg',
    keywords: ['sunglasses', 'polarized', 'eyewear', 'uv protection', 'shades', 'summer'],
    tags: ['accessories', 'eyewear']
  },

  // ==========================================
  // COLLECTION 5: FITNESS & LIFESTYLE (5 Products)
  // ==========================================
  {
    id: 'prod-cork-yoga-mat',
    slug: 'natural-cork-exercise-yoga-mat',
    name: 'Natural Cork Non-Slip Exercise Yoga Mat',
    price: 1499,
    category: 'Fitness & Lifestyle',
    collectionSlug: 'fitness-lifestyle',
    description: 'Eco-friendly 5mm mat with non-slip organic cork top, natural tree rubber base, and laser-etched posture lines.',
    details: 'Grippier when wet: natural suberin in cork activates with sweat to deliver superior traction during hot yoga and intense workouts. Free of PVC, TPE, and harsh chemical binders.',
    features: [
      'Natural Antimicrobial Sustainable Cork Surface',
      'High-Density Natural Tree Rubber Base (5mm)',
      'Laser-Etched Posture Alignment Guide Grid',
      'Includes Cotton Webbing Shoulder Carrying Strap'
    ],
    badge: 'Bestseller',
    inStock: true,
    image: '/assets/products/yoga-mat.svg',
    keywords: ['yoga mat', 'cork', 'exercise', 'non slip', 'fitness', 'pilates', 'workout'],
    tags: ['fitness', 'yoga', 'bestseller']
  },
  {
    id: 'prod-insulated-flask',
    slug: 'insulated-stainless-steel-sports-flask',
    name: 'Insulated Stainless Steel Sports Flask (750ml)',
    price: 699,
    category: 'Fitness & Lifestyle',
    collectionSlug: 'fitness-lifestyle',
    description: 'Double-wall vacuum-insulated 18/8 food-grade stainless steel bottle. Keeps water cold for 24 hours or hot for 12 hours.',
    details: 'Ditch single-use plastic. Features condensation-free matte powder coat grip, a wide-mouth opening for ice cubes, and a leak-proof loop chug cap for hydration on the go.',
    features: [
      'Double-Wall Vacuum TempShield Insulation',
      '18/8 Pro-Grade Kitchen Stainless Steel',
      '100% Leak-Proof Sports Cap with Silicone Seal',
      'Durable Matte Powder Coat Exterior Grip'
    ],
    badge: 'Trending',
    inStock: true,
    image: '/assets/products/water-bottle.svg',
    keywords: ['water bottle', 'flask', 'stainless steel', 'insulated', 'thermos', 'gym'],
    tags: ['fitness', 'hydration', 'trending']
  },
  {
    id: 'prod-fabric-resistance-bands',
    slug: 'heavy-duty-fabric-resistance-bands-pack',
    name: 'Heavy-Duty Fabric Resistance Bands (Set of 3)',
    price: 499,
    category: 'Fitness & Lifestyle',
    collectionSlug: 'fitness-lifestyle',
    description: 'Tear-resistant cotton-latex woven loop bands with non-slip inner grip strips in 3 progressive resistance levels.',
    details: 'Unlike cheap rubber bands, these fabric resistance loops will never roll up, pinch skin, or snap mid-exercise. Ideal for warmups, glute activation, physical therapy, and home strength training.',
    features: [
      'Durable Elastic Cotton & Natural Latex Weave',
      '3 Progressive Resistance Strengths (Light, Medium, Heavy)',
      'Dual Inner Silicone Non-Slip Anti-Roll Ribs',
      'Includes Breathable Mesh Travel Storage Pouch'
    ],
    inStock: true,
    image: '/assets/products/resistance-bands.svg',
    keywords: ['resistance bands', 'workout bands', 'glute bands', 'fitness', 'gym', 'training'],
    tags: ['fitness', 'workout']
  },
  {
    id: 'prod-speed-jump-rope',
    slug: 'precision-aluminum-speed-jump-rope',
    name: 'Precision Aluminum Bearing Speed Jump Rope',
    price: 399,
    category: 'Fitness & Lifestyle',
    collectionSlug: 'fitness-lifestyle',
    description: 'Ultra-fast cardio jump rope with 360-degree dual ball bearings, knurled aluminum handles, and adjustable steel cable.',
    details: 'Built for seamless double-unders and high-cadence cardio intervals. The knurled aluminum handles provide sweat-proof control while the 2.5mm coated wire cable turns with zero friction.',
    features: [
      'Dual 360° Stainless Steel Speed Ball Bearings',
      'Lightweight Knurled Anti-Slip Aluminum Handles',
      '3-Meter Kink-Resistant Coated Steel Cable',
      'Tool-Free Quick Thumbscrew Length Adjustment'
    ],
    inStock: true,
    image: '/assets/products/jump-rope.svg',
    keywords: ['jump rope', 'skipping rope', 'speed rope', 'cardio', 'fitness', 'crossfit'],
    tags: ['fitness', 'cardio']
  },
  {
    id: 'prod-massage-roller-ball',
    slug: 'deep-tissue-trigger-point-massage-ball',
    name: 'Deep Tissue Trigger Point Massage Roller Ball',
    price: 349,
    category: 'Fitness & Lifestyle',
    collectionSlug: 'fitness-lifestyle',
    description: 'High-density solid rubber myofascial release ball designed for targeted deep-tissue muscle recovery and tension relief.',
    details: 'Release stubborn muscle knots in shoulders, lower back, hamstrings, and plantar fascia. High-density non-slip grip rubber provides firm, targeted pressure that won’t deform under body weight.',
    features: [
      '100% High-Density Solid Rubber Construction',
      'Targeted Trigger Point & Myofascial Release',
      'Non-Slip Matte Textured Grip Surface',
      'Compact & Portable for Travel and Gym Bags'
    ],
    badge: 'New',
    inStock: true,
    image: '/assets/products/massage-ball.svg',
    keywords: ['massage ball', 'trigger point', 'recovery', 'fascia', 'muscle', 'therapy'],
    tags: ['fitness', 'recovery', 'new-arrival']
  },

  // ==========================================
  // COLLECTION 6: STATIONERY (4 Products)
  // ==========================================
  {
    id: 'prod-dot-grid-journal',
    slug: 'hardcover-bullet-dot-grid-journal',
    name: 'Hardcover Bullet Dot-Grid Journal (160 GSM)',
    price: 449,
    category: 'Stationery',
    collectionSlug: 'stationery',
    description: 'Premium A5 notebook with ultra-thick 160 GSM bleed-proof bamboo paper, 5mm subtle dot grid, and dual ribbon bookmarks.',
    details: 'The ultimate notebook for bullet journaling, sketching, and fountain pens. The ultra-heavyweight bamboo paper completely eliminates ghosting and bleed-through, enclosed in a wipe-clean vegan leather cover.',
    features: [
      '160 GSM Heavyweight Bleed-Proof Bamboo Paper',
      'Subtle 5mm Light Grey Dot-Grid Layout (160 Pages)',
      'Lay-Flat 180° Thread Binding with Elastic Closure',
      'Dual Woven Ribbon Bookmarks & Expandable Rear Pocket'
    ],
    badge: 'Bestseller',
    inStock: true,
    image: '/assets/products/dot-journal.svg',
    keywords: ['notebook', 'journal', 'dot grid', 'bullet journal', 'diary', 'stationery', 'paper'],
    tags: ['stationery', 'writing', 'bestseller']
  },
  {
    id: 'prod-brass-rollerball-pen',
    slug: 'solid-machined-brass-rollerball-pen',
    name: 'Solid Machined Brass Rollerball Pen',
    price: 899,
    category: 'Stationery',
    collectionSlug: 'stationery',
    description: 'Heavyweight raw brass pen precision-machined from solid stock. Accepts standard Schmidt and G2 refill cartridges.',
    details: 'Uncoated solid brass that develops an individualized warm patina with everyday use. Perfectly counterbalanced for fatigue-free, silky-smooth handwriting with a secure threaded cap.',
    features: [
      'CNC Precision-Machined Solid Raw Brass Body',
      'Substantial 42g Perfectly Balanced Writing Weight',
      'Compatible with Universal Schmidt 5888 & G2 Refills',
      'Threaded Cap with Removable Minimalist Pocket Clip'
    ],
    badge: 'Featured',
    inStock: true,
    image: '/assets/products/brass-pen.svg',
    keywords: ['pen', 'rollerball', 'brass pen', 'writing', 'executive', 'fountain', 'ink'],
    tags: ['stationery', 'writing', 'featured']
  },
  {
    id: 'prod-leather-desk-mat',
    slug: 'dual-sided-executive-desk-pad',
    name: 'Dual-Sided Executive Desk Pad (80x40 cm)',
    price: 599,
    category: 'Stationery',
    collectionSlug: 'stationery',
    description: 'Smooth water-resistant vegan leather desk mat with reversible dual-color finish and gliding mouse surface.',
    details: 'Protect your tabletop while upgrading your desktop aesthetics. Generous 80x40cm dimension accommodates both full-size keyboard and mouse with precision tracking.',
    features: [
      'Reversible Dual-Tone Premium Vegan PU Leather',
      'Generous 80cm x 40cm Workspace Coverage',
      'Waterproof, Oil-Proof & Effortless Wipe-Clean',
      'Includes Matching Leather Wrap Strap for Storage'
    ],
    inStock: true,
    image: '/assets/products/desk-mat.svg',
    keywords: ['desk mat', 'desk pad', 'mouse pad', 'leather mat', 'workspace', 'office'],
    tags: ['stationery', 'workspace']
  },
  {
    id: 'prod-acrylic-book-stand',
    slug: 'clear-adjustable-acrylic-reading-stand',
    name: 'Clear Adjustable Acrylic Reading Stand',
    price: 749,
    category: 'Stationery',
    collectionSlug: 'stationery',
    description: 'Heavy-duty 5mm transparent cast acrylic stand with 5 ergonomic angle adjustments and spring-loaded page pegs.',
    details: 'Read textbooks, cook from recipes, or prop tablets at comfortable eye level. Transparent acrylic minimizes visual clutter while spring-cushioned page holders keep heavy books open without damaging pages.',
    features: [
      '5mm Crystal-Clear Cast Acrylic Construction',
      '5 Ergonomic Viewing Angle Adjustments',
      'Spring-Cushioned Page Holding Pegs with Rubber Tips',
      'Folds Completely Flat for Minimalist Storage'
    ],
    badge: 'New',
    inStock: true,
    image: '/assets/products/book-stand.svg',
    keywords: ['book stand', 'reading stand', 'acrylic', 'holder', 'study', 'cookbook', 'tablet'],
    tags: ['stationery', 'study', 'new-arrival']
  }
] as const;

// Helper query utilities
export function getProductById(id: string): Product | undefined {
  const clean = id.trim().toLowerCase();
  return PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === clean ||
      p.id.toLowerCase() === `prod-${clean}` ||
      p.slug.toLowerCase() === clean
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  const clean = slug.trim().toLowerCase();
  return PRODUCTS.find(
    (p) =>
      p.slug.toLowerCase() === clean ||
      p.id.toLowerCase() === clean ||
      p.id.toLowerCase() === `prod-${clean}`
  );
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  const clean = collectionSlug.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    if (p.collectionSlug.toLowerCase() === clean) return true;
    if (clean === 'bags-accessories' && (p.collectionSlug === 'accessories' || p.category.toLowerCase().includes('accessories') || p.category.toLowerCase().includes('bags'))) return true;
    if (clean === 'accessories' && p.collectionSlug === 'bags-accessories') return true;
    return false;
  });
}
