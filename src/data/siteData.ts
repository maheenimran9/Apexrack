import heroWarehouseImg from '/src/assets/images/hero_warehouse_racking_1794601505608.webp';
import selectiveRackImg from '/src/assets/images/product_selective_rack_1794601506271.webp';
import driveInRackImg from '/src/assets/images/product_drivein_racking_1794602944199.webp';
import cantileverRackImg from '/src/assets/images/product_cantilever_rack_1794601506320.webp';
import boltlessShelvingImg from '/src/assets/images/product_boltless_shelving_1794601506973.webp';
import longspanShelvingImg from '/src/assets/images/product_longspan_shelving_1794603993058.webp';
import mobileShelvingImg from '/src/assets/images/product_mobile_shelving_1794603993619.webp';
import mezzanineFloorImg from '/src/assets/images/product_mezzanine_floor_1794601506856.webp';
import safetyAccessoriesImg from '/src/assets/images/product_safety_accessories_1794602945244.webp';
import warehouseEngineeringImg from '/src/assets/images/warehouse_engineering_interior_1794602946692.webp';
import coldStorageImg from '/src/assets/images/cold_storage_racking_1794602946939.webp';

export const SITE_IMAGES = {
  heroWarehouse: heroWarehouseImg,
  selectiveRack: selectiveRackImg,
  driveInRack: driveInRackImg,
  cantileverRack: cantileverRackImg,
  shelving: boltlessShelvingImg,
  longspanShelving: longspanShelvingImg,
  mobileShelving: mobileShelvingImg,
  mezzanine: mezzanineFloorImg,
  safetyAccessories: safetyAccessoriesImg,
  warehouseEngineering: warehouseEngineeringImg,
  coldStorage: coldStorageImg,
};

export const COMPANY_CONTACT = {
  primaryPhone: '+1 (312) 854-0920',
  primaryPhoneHref: 'tel:+13128540920',
  ukPhone: '+44 20 7946 0821',
  usPhone: '+1 (312) 854-0920',
  caPhone: '+1 (905) 742-3180',
  uaePhone: '+971 4 519 4200',
  salesEmail: 'sales@apexrack.com',
  salesEmailHref: 'mailto:sales@apexrack.com',
  hqAddress: 'Unit 14, West Thurrock Industrial Park, London, UK',
  regionsLine: 'UK · USA · Canada · UAE',
};

export type ProductGroup =
  | 'All'
  | 'Pallet Racking'
  | 'Cantilever & Long-Load'
  | 'Industrial Shelving'
  | 'Mezzanine & Safety';

export interface ProductItem {
  slug: string;
  name: string;
  categoryGroup: Exclude<ProductGroup, 'All'>;
  shortDesc: string;
  image: string;
  diagramType: 'selective' | 'cantilever' | 'shelving' | 'mezzanine';
  overview: string;
  keyFeatures: string[];
  applications: string[];
  specs: {
    label: string;
    value: string;
  }[];
  relatedSlugs: string[];
}

export const PRODUCT_GROUPS: ProductGroup[] = [
  'All',
  'Pallet Racking',
  'Cantilever & Long-Load',
  'Industrial Shelving',
  'Mezzanine & Safety',
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    slug: 'pallet-racking',
    name: 'Pallet Racking',
    categoryGroup: 'Pallet Racking',
    shortDesc:
      'Heavy-duty steel pallet racks built for busy warehouses, tall ceilings, and daily forklift traffic.',
    image: warehouseEngineeringImg,
    diagramType: 'selective',
    overview:
      'Strong pallet racking is the backbone of any busy warehouse. Built to fit standard US (48"×40"), Euro, and UK pallets, our upright frames and step beams handle heavy loads while leaving clean room for your forklifts.',
    keyFeatures: [
      'Modular upright frames that expand easily as your stock grows',
      'Works with wide aisles, reach trucks, or narrow turret forklifts',
      'Heavy bolted footplates and braced steel frames built to RMI & SEMA codes',
      'Add wire mesh decks, pallet support bars, or steel post guards anytime',
    ],
    applications: [
      'Regional Distribution & Fulfillment Centers',
      '3PL Multi-Client Logistics Warehouses',
      'Factory Finished-Goods Storage',
      'Wholesale & Cash-and-Carry Stores',
    ],
    specs: [
      { label: 'Upright Heights', value: '12 ft – 36 ft (3.6 m – 11.0 m)' },
      { label: 'Beam Spans', value: '96", 108", 120", 144"' },
      { label: 'Frame Depths', value: '36", 42", 44", 48"' },
      { label: 'Load Capacity', value: 'Up to 5,000 lbs per beam level' },
      { label: 'Steel Profile', value: '11–14 Gauge Cold-Rolled Steel' },
      { label: 'Compliance & Finish', value: 'RMI / SEMA · Navy Frames, Orange Beams' },
    ],
    relatedSlugs: ['selective-racking', 'drive-in-racking', 'warehouse-safety-accessories'],
  },
  {
    slug: 'selective-racking',
    name: 'Selective Racking',
    categoryGroup: 'Pallet Racking',
    shortDesc:
      'Direct access to every single pallet so your team can pick any SKU fast without moving other loads.',
    image: selectiveRackImg,
    diagramType: 'selective',
    overview:
      'Selective racking is the top choice when you store many different products and need quick access to each pallet. Beams adjust every 2 inches up or down, so your racks adapt easily whenever box or pallet sizes change.',
    keyFeatures: [
      '100% direct access to every pallet for smooth FIFO stock rotation',
      'Quick 2-inch height adjustments for different pallet sizes',
      'Safety-lock beam clips and heavy anchor bolts keep every bay secure',
      'Compatible with standard counterbalance forklifts and reach trucks',
    ],
    applications: [
      'Retail & E-Commerce Distribution Warehouses',
      '3PL Picking & Reserve Pallet Aisles',
      'Food, Beverage & Ambient Staging Bays',
      'Industrial Parts & Wholesale Depots',
    ],
    specs: [
      { label: 'Upright Heights', value: '12 ft – 32 ft (3.6 m – 9.7 m)' },
      { label: 'Beam Spans', value: '96", 108", 120" (2 or 3 Pallets Wide)' },
      { label: 'Frame Depths', value: '36", 42", 44", 48"' },
      { label: 'Load Capacity', value: 'Up to 4,500 lbs per beam level' },
      { label: 'Steel Profile', value: '12–14 Gauge Structural Steel' },
      { label: 'Compliance & Finish', value: 'ANSI MH16.1 / EN 15512 Powder Coat' },
    ],
    relatedSlugs: ['pallet-racking', 'drive-in-racking', 'mezzanine-flooring'],
  },
  {
    slug: 'drive-in-racking',
    name: 'Drive-In Racking',
    categoryGroup: 'Pallet Racking',
    shortDesc:
      'Deep-lane pallet racks that remove extra aisles so you can pack far more pallets into the same room.',
    image: driveInRackImg,
    diagramType: 'selective',
    overview:
      'Drive-in racking lets forklifts drive straight into deep storage lanes to stack pallets one behind another. By cutting out multiple side aisles, you store up to 75% more pallets in the same floor footprint, which is especially valuable in expensive freezer rooms.',
    keyFeatures: [
      'Stacks 2 to 10+ pallets deep on continuous steel support rails',
      'Floor-level steel guide rails protect uprights from forklift bumps',
      'Great for Last-In First-Out (LIFO) or Drive-Through (FIFO) batch stock',
      'Cuts cooling costs inside cold rooms by eliminating empty aisle air',
    ],
    applications: [
      'Cold Storage & Blast Freezer Warehouses',
      'Food & Drink Batch Production',
      'Seasonal Bulk Commodity Stock',
      'High-Volume Single-Product Factories',
    ],
    specs: [
      { label: 'System Heights', value: '16 ft – 30 ft (4.8 m – 9.1 m)' },
      { label: 'Lane Depth', value: '3 to 8 Pallets Deep' },
      { label: 'Pallet Weight', value: 'Up to 3,000 lbs per pallet slot' },
      { label: 'Rail Type', value: 'Flared Entry Cantilever Arm & Flanged Rail' },
      { label: 'Finish Options', value: 'Powder Coat or Hot-Dip Galvanized (-20°C)' },
      { label: 'Entry Protection', value: 'Steel Floor Guide Rails & Front Shields' },
    ],
    relatedSlugs: ['pallet-racking', 'selective-racking', 'warehouse-safety-accessories'],
  },
  {
    slug: 'cantilever-racking',
    name: 'Cantilever Racking',
    categoryGroup: 'Cantilever & Long-Load',
    shortDesc:
      'Open-front heavy steel arms built to hold long timber, steel bars, pipes, and wide sheet loads.',
    image: cantileverRackImg,
    diagramType: 'cantilever',
    overview:
      'Cantilever racking has no front posts blocking your way, so forklifts can slide long pipes, timber bundles, or steel sheets straight onto the arms. Available as single-sided wall racks or double-sided center aisles.',
    keyFeatures: [
      'No front columns in the way across full rack lengths',
      'Bolt-on arms adjust easily on 3-inch or 4-inch centers',
      'Single-sided for wall runs or double-sided for center aisles',
      'Optional end-stops and pipe saddles prevent round stock from rolling',
    ],
    applications: [
      'Steel Yards & Metal Fabrication Shops',
      'Lumber & Building Supply Yards',
      'Plumbing, HVAC & PVC Pipe Depots',
      'Furniture & Roll Goods Storage',
    ],
    specs: [
      { label: 'Column Heights', value: '10 ft – 20 ft (3.0 m – 6.1 m)' },
      { label: 'Arm Lengths', value: '24", 36", 48", 60" Straight or Inclined' },
      { label: 'Arm Capacity', value: '1,500 – 3,500 lbs per arm pair' },
      { label: 'Column Build', value: 'Hot-Rolled Wide-Flange I-Beam' },
      { label: 'Bracing', value: 'Bolted Horizontal & Diagonal X-Bracing' },
      { label: 'Finish', value: 'Navy Structural Frame / Safety Orange Arms' },
    ],
    relatedSlugs: ['pallet-racking', 'industrial-shelving', 'warehouse-safety-accessories'],
  },
  {
    slug: 'industrial-shelving',
    name: 'Industrial Shelving',
    categoryGroup: 'Industrial Shelving',
    shortDesc:
      'Strong boltless and wide-span steel shelves made for fast hand-picking, parts bins, and boxed stock.',
    image: longspanShelvingImg,
    diagramType: 'shelving',
    overview:
      'Our industrial shelving gives picking teams clean, open access from every side. Choose compact boltless rivet racks for small parts bins or wide longspan bays up to 96 inches across for oversized cartons and tools.',
    keyFeatures: [
      'Available in compact bin bays or wide longspan bays up to 96 inches',
      'Shelf heights adjust in 1.5-inch steps for totes, boxes, and heavy tools',
      'Choice of galvanized wire mesh, solid steel, or heavy wood decking',
      'Pairs smoothly with ground pick aisles and multi-tier mezzanine decks',
    ],
    applications: [
      'E-Commerce Pick & Pack Zones',
      'Factory Tool Cribs & Spare Parts Rooms',
      'Auto Parts & Workshop Stockrooms',
      'Retail & Commercial Backrooms',
    ],
    specs: [
      { label: 'Frame Heights', value: '72", 84", 96", 120"' },
      { label: 'Bay Widths', value: '36", 48", 60", 72", 96" Clear Span' },
      { label: 'Shelf Depths', value: '18", 24", 30", 36", 42"' },
      { label: 'Shelf Load', value: '850 – 1,800 lbs per shelf level' },
      { label: 'Deck Options', value: 'Wire Mesh, Galvanized Steel, or 5/8" Deck' },
      { label: 'Assembly', value: 'Boltless Double-Rivet & Z-Beam Lock' },
    ],
    relatedSlugs: ['mobile-shelving', 'mezzanine-flooring', 'selective-racking'],
  },
  {
    slug: 'mezzanine-flooring',
    name: 'Mezzanine Flooring',
    categoryGroup: 'Mezzanine & Safety',
    shortDesc:
      'Free-standing steel second-floor platforms that double your usable workspace inside tall buildings.',
    image: mezzanineFloorImg,
    diagramType: 'mezzanine',
    overview:
      'Why pay for a bigger building when you already have empty air above your racks? A bolt-together steel mezzanine turns wasted ceiling height into new packing lines, shelving tiers, or warehouse offices in weeks.',
    keyFeatures: [
      'Doubles usable floor space inside your current warehouse lease',
      'Bolt-together structural wide-flange beams and heavy steel columns',
      'Includes handrails, kickplates, steel staircases, and pallet drop gates',
      'Free-standing design can be expanded or moved if you ever relocate',
    ],
    applications: [
      'Two-Tier E-Commerce Pick & Pack Platforms',
      'Warehouse Offices Over Receiving Docks',
      'Light Assembly & Kitting Floors',
      'Extra Bulk Box Storage Above Workstations',
    ],
    specs: [
      { label: 'Clear Under-Height', value: '9 ft – 14 ft (2.7 m – 4.2 m)' },
      { label: 'Column Grid', value: '12 ft × 12 ft up to 20 ft × 20 ft Spans' },
      { label: 'Floor Load Rating', value: '125 – 200 lbs / sq ft Uniform Load' },
      { label: 'Decking', value: 'Corrugated B-Deck + Heavy Resin Floor' },
      { label: 'Safety Access', value: 'IBC/OSHA Steel Stairs & Swing Pallet Gates' },
      { label: 'Anchoring', value: 'Welded Steel Baseplates Bolted to Concrete' },
    ],
    relatedSlugs: ['industrial-shelving', 'mobile-shelving', 'warehouse-safety-accessories'],
  },
  {
    slug: 'mobile-shelving',
    name: 'Mobile Shelving',
    categoryGroup: 'Industrial Shelving',
    shortDesc:
      'Track-mounted rolling shelves that remove wasted aisles and recover up to 50% of your floor space.',
    image: mobileShelvingImg,
    diagramType: 'shelving',
    overview:
      'Mobile shelving places heavy steel racks onto smooth floor tracks. Instead of leaving an empty walkway between every row, rows glide shut and open only where you need to pick, giving you twice the storage in compact rooms.',
    keyFeatures: [
      'Saves up to 50% floor space compared to fixed static shelving rows',
      'Easy 3-spoke hand crank moves thousands of pounds with light effort',
      'Built-in aisle safety locks and anti-tip rails protect workers',
      'Installs cleanly over existing level warehouse concrete floors',
    ],
    applications: [
      'High-Value Tooling & Aerospace Parts Vaults',
      'Pharma & Lab Supply Rooms',
      'Document & Blueprint Archives',
      'Compact Urban Fulfillment Backrooms',
    ],
    specs: [
      { label: 'Carriage Lengths', value: '6 ft – 24 ft Modular Runs' },
      { label: 'System Height', value: '75" – 96" Overall' },
      { label: 'Carriage Load', value: 'Up to 10,000 lbs per mobile bay' },
      { label: 'Drive Type', value: 'Mechanical Assist Chain Drive Hand Crank' },
      { label: 'Floor Track', value: 'Low-Profile Anodized Steel Guide Rail' },
      { label: 'Safety Locks', value: 'Individual Aisle Brake & Anti-Tilt Stops' },
    ],
    relatedSlugs: ['industrial-shelving', 'mezzanine-flooring', 'selective-racking'],
  },
  {
    slug: 'warehouse-safety-accessories',
    name: 'Warehouse Safety Accessories',
    categoryGroup: 'Mezzanine & Safety',
    shortDesc:
      'Heavy steel post guards, row-end barriers, anti-collapse wire mesh, and load weight signs.',
    image: safetyAccessoriesImg,
    diagramType: 'selective',
    overview:
      'One accidental forklift hit can damage an upright frame and shut down an aisle. Our heavy-gauge orange steel guards, end-of-aisle barriers, and wire mesh panels shield your racks, stock, and floor staff every shift.',
    keyFeatures: [
      '1/4-inch thick steel post protectors absorb direct forklift bumps',
      'Tubular row-end barriers guard aisle corners against pallet swings',
      'Galvanized wire mesh stops boxes falling onto pedestrian walkways',
      'Clear aluminum load-capacity plaques keep aisles OSHA/SEMA compliant',
    ],
    applications: [
      'Busy Cross-Aisle Forklift Corners',
      'Pedestrian Walkways & Dock Staging Lanes',
      'Cold-Room Reach-Truck Corridors',
      'Annual Warehouse Rack Safety Upgrades',
    ],
    specs: [
      { label: 'Guard Heights', value: '12", 18", 24" Heavy Steel Wrap' },
      { label: 'Barrier Lengths', value: '42", 48", 96" Single or Double Row' },
      { label: 'Steel Thickness', value: '1/4" (6.3 mm) Formed Structural Plate' },
      { label: 'Back Mesh', value: '2" × 2" Welded Wire Grid on Standoffs' },
      { label: 'Anchors', value: 'Heavy Concrete Wedge Anchors Included' },
      { label: 'Finish', value: 'High-Visibility Safety Orange Powder Coat' },
    ],
    relatedSlugs: ['pallet-racking', 'selective-racking', 'drive-in-racking'],
  },
];

export const HOME_CATEGORIES = [
  {
    name: 'Pallet Racking',
    slug: 'pallet-racking',
    specHighlight: 'Up to 5,000 lbs/level',
    image: warehouseEngineeringImg,
    shortDesc: 'Strong steel upright frames and beams for high-bay pallet storage.',
  },
  {
    name: 'Cantilever Racking',
    slug: 'cantilever-racking',
    specHighlight: 'Up to 3,500 lbs/arm pair',
    image: cantileverRackImg,
    shortDesc: 'Open-front arms built for timber, steel bar stock, and long pipes.',
  },
  {
    name: 'Industrial Shelving',
    slug: 'industrial-shelving',
    specHighlight: 'Up to 1,800 lbs/shelf',
    image: boltlessShelvingImg,
    shortDesc: 'Boltless and wide-span shelves for fast manual SKU picking.',
  },
  {
    name: 'Mezzanine Flooring',
    slug: 'mezzanine-flooring',
    specHighlight: '125–200 lbs/sq ft load',
    image: mezzanineFloorImg,
    shortDesc: 'Bolt-together second-floor platforms that double usable workspace.',
  },
];

export interface IndustryDetail {
  id: string;
  name: string;
  headline: string;
  description: string;
  challenges: string[];
  recommendedProducts: { name: string; slug: string }[];
  image: string;
}

export const INDUSTRIES_DATA: IndustryDetail[] = [
  {
    id: 'logistics',
    name: 'Logistics',
    headline: 'Faster Pallet Access & Narrow-Aisle Capacity for 3PL Hubs',
    description:
      'Distribution hubs handle changing client pallets every week. Our selective racking and aisle protection help you store more pallets per square foot without slowing down forklift traffic.',
    challenges: [
      'Fitting maximum pallet positions inside fixed leased buildings',
      'Protecting upright columns in busy reach-truck aisles',
      'Keeping 100% direct SKU access for mixed pallet sizes',
    ],
    recommendedProducts: [
      { name: 'Pallet Racking', slug: 'pallet-racking' },
      { name: 'Selective Racking', slug: 'selective-racking' },
      { name: 'Warehouse Safety Accessories', slug: 'warehouse-safety-accessories' },
    ],
    image: heroWarehouseImg,
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    headline: 'Heavy Racks for Raw Metal, Dies & Finished Parts',
    description:
      'Factories need tough racks near production lines to hold heavy steel bars, pipe bundles, dies, and outgoing pallets safely off the floor.',
    challenges: [
      'Holding 20 ft+ steel bars, tubing, and timber safely off the ground',
      'Supporting heavy machine dies and concentrated spare parts',
      'Separating forklift loading lanes from factory floor staff',
    ],
    recommendedProducts: [
      { name: 'Cantilever Racking', slug: 'cantilever-racking' },
      { name: 'Industrial Shelving', slug: 'industrial-shelving' },
    ],
    image: cantileverRackImg,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    headline: 'Two-Tier Pick Shelving Built for Fast Order Packing',
    description:
      'Online fulfillment centers juggle thousands of small SKUs alongside reserve pallets. Pairing wide-span pick shelves with a steel mezzanine cuts picker walking time and doubles floor area.',
    challenges: [
      'Organizing 5,000+ fast-moving SKUs in easy hand-pick rows',
      'Adding extra packing tables without moving to a new facility',
      'Adjusting shelf heights quickly for peak seasonal stock',
    ],
    recommendedProducts: [
      { name: 'Industrial Shelving', slug: 'industrial-shelving' },
      { name: 'Mezzanine Flooring', slug: 'mezzanine-flooring' },
      { name: 'Selective Racking', slug: 'selective-racking' },
    ],
    image: mezzanineFloorImg,
  },
  {
    id: 'cold-storage',
    name: 'Cold Storage',
    headline: 'High-Density Freezer Racks That Cut Cooling Waste',
    description:
      'Chiller and -20°C freezer rooms are expensive to cool. Deep drive-in tunnels and galvanized steel frames pack far more pallets inside every cubic foot of refrigerated space.',
    challenges: [
      'Eliminating wasted empty aisle air inside -20°C freezer vaults',
      'Preventing rust under moisture, frost, and regular washdowns',
      'Guiding forklifts cleanly in low-visibility chilled corridors',
    ],
    recommendedProducts: [
      { name: 'Drive-In Racking', slug: 'drive-in-racking' },
      { name: 'Selective Racking', slug: 'selective-racking' },
    ],
    image: coldStorageImg,
  },
  {
    id: 'retail',
    name: 'Retail',
    headline: 'Reserve Pallet Bays & Compact Backroom Shelving',
    description:
      'Retail distribution centers and store stockrooms combine upper pallet storage with lower carton-pick shelves and track-mounted mobile racks to keep store shelves full.',
    challenges: [
      'Combining bulk upper pallet bays with ground-level box picking',
      'Handling seasonal stock spikes across varied box sizes',
      'Doubling backroom capacity using track-mounted mobile bays',
    ],
    recommendedProducts: [
      { name: 'Selective Racking', slug: 'selective-racking' },
      { name: 'Mobile Shelving', slug: 'mobile-shelving' },
      { name: 'Industrial Shelving', slug: 'industrial-shelving' },
    ],
    image: mobileShelvingImg,
  },
];

export interface CaseProject {
  id: string;
  title: string;
  category: 'Logistics' | 'Cold Storage' | 'Manufacturing' | 'E-commerce';
  location: string;
  metricSummary: string;
  description: string;
  solutionUsed: string;
  productSlug: string;
  image: string;
}

export const PROJECTS_DATA: CaseProject[] = [
  {
    id: 'proj-3pl-hub',
    title: 'High-Bay 3PL Distribution Hub Fit-Out',
    category: 'Logistics',
    location: 'Thames Gateway Logistics Park, London, UK',
    metricSummary: '3,400 Pallet Positions · Installed in 6 Days',
    description:
      'Converted a 30 ft clear-height distribution hall from wide aisles into narrow-aisle reach-truck selective racking, adding 38% more pallet positions with full floor safety barriers.',
    solutionUsed: 'Selective Racking + Warehouse Safety Accessories',
    productSlug: 'selective-racking',
    image: heroWarehouseImg,
  },
  {
    id: 'proj-ecom-mezzanine',
    title: 'Two-Tier E-Commerce Fulfillment Platform',
    category: 'E-commerce',
    location: "O'Hare Cargo Corridor, Chicago, USA",
    metricSummary: '14,500 sq ft Mezzanine · Completed in 12 Days',
    description:
      'Installed a free-standing structural steel mezzanine above ground packing lanes, paired with 180 bays of boltless wide-span shelving to double active SKU capacity without relocating.',
    solutionUsed: 'Mezzanine Flooring + Industrial Shelving',
    productSlug: 'mezzanine-flooring',
    image: mezzanineFloorImg,
  },
  {
    id: 'proj-cold-freezer',
    title: 'Galvanized -20°C Cold-Chain Freezer Vault',
    category: 'Cold Storage',
    location: 'Pearson Industrial District, Toronto, Canada',
    metricSummary: '1,850 Pallet Slots · Hot-Dip Galvanized',
    description:
      'Built 6-pallet-deep drive-in tunnels and galvanized selective bays inside a -20°C food depot, cutting empty aisle space and protecting upright posts with heavy floor guide rails.',
    solutionUsed: 'Drive-In Racking + Column Protectors',
    productSlug: 'drive-in-racking',
    image: coldStorageImg,
  },
  {
    id: 'proj-metal-cantilever',
    title: 'Structural Steel & Pipe Yard Staging Aisle',
    category: 'Manufacturing',
    location: 'Jebel Ali Free Zone (JAFZA), Dubai, UAE',
    metricSummary: '22 Double-Sided Towers · 3,500 lbs/Arm Pair',
    description:
      'Built heavy I-beam cantilever towers to store 20 ft aluminum extrusions and steel pipe bundles with full crane and side-loader forklift clearance.',
    solutionUsed: 'Cantilever Racking + Industrial Shelving',
    productSlug: 'cantilever-racking',
    image: cantileverRackImg,
  },
  {
    id: 'proj-new-facility',
    title: 'Full-Floor Regional Freight Warehouse Fit-Out',
    category: 'Logistics',
    location: 'DFW Airport Freight Park, Dallas, USA',
    metricSummary: '4,200 Pallet Positions · Full Safety Spec',
    description:
      'Complete floor fit-out including teardrop selective pallet racking, wire mesh decking, steel row-end barriers, and engraved load-capacity signs across 18 dock aisles.',
    solutionUsed: 'Pallet Racking + Warehouse Safety Accessories',
    productSlug: 'pallet-racking',
    image: warehouseEngineeringImg,
  },
  {
    id: 'proj-parts-fulfillment',
    title: 'Compact High-Density Auto Parts Depot',
    category: 'E-commerce',
    location: 'Trafford Park Distribution Hub, Manchester, UK',
    metricSummary: '46% Floor Space Saved · 24 ft Mobile Runs',
    description:
      'Combined heavy-duty industrial shelving with mechanical-assist mobile floor tracks to double SKU storage inside an urban parts fulfillment branch.',
    solutionUsed: 'Mobile Shelving + Industrial Shelving',
    productSlug: 'mobile-shelving',
    image: mobileShelvingImg,
  },
];

export type FaqCategory = 'All' | 'Pallet Racking' | 'Mezzanine';

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
  relatedSlug?: string;
  relatedLabel?: string;
}

export const INSTALLATION_FAQS: FaqItem[] = [
  {
    id: 'faq-slab-requirements',
    category: 'Pallet Racking',
    question: 'How thick does our warehouse floor need to be for pallet racking?',
    answer:
      'Most selective and drive-in racks need a flat reinforced concrete floor 150–200 mm (6–8 in) thick. We check point loads against your slab specs and supply larger baseplates or epoxy anchors if needed.',
    relatedSlug: 'pallet-racking',
    relatedLabel: 'Pallet Racking Specs',
  },
  {
    id: 'faq-live-warehouse',
    category: 'Pallet Racking',
    question: 'Can you install racks while our warehouse stays open?',
    answer:
      'Yes. Our install crews section off one zone at a time behind safety barriers so your receiving and shipping teams keep working safely, signing off each aisle after anchor bolt checks.',
    relatedSlug: 'selective-racking',
    relatedLabel: 'Selective Racking',
  },
  {
    id: 'faq-mezzanine-height',
    category: 'Mezzanine',
    question: 'How high does our ceiling need to be for a mezzanine floor?',
    answer:
      'If your building has at least 4.8 m–5.5 m (16–18 ft) clear ceiling height, you can fit a single-tier steel mezzanine with comfortable walking clearance both underneath and on top.',
    relatedSlug: 'mezzanine-flooring',
    relatedLabel: 'Mezzanine Flooring',
  },
  {
    id: 'faq-mezzanine-permits',
    category: 'Mezzanine',
    question: 'Do mezzanine quotes include stairs, guardrails, and load drawings?',
    answer:
      'Yes. Every mezzanine quote covers structural steel drawings, stairs, perimeter handrails, kickplates, and swing pallet drop gates built to local safety codes.',
    relatedSlug: 'mezzanine-flooring',
    relatedLabel: 'Explore Mezzanines',
  },
  {
    id: 'faq-installation-timeline',
    category: 'Pallet Racking',
    question: 'How fast can you deliver and finish installation?',
    answer:
      'Standard 50–150 bay pallet racking jobs usually install in 3–7 working days on site. Structural steel mezzanines typically complete within 1–3 weeks depending on floor size and stair layout.',
  },
];
