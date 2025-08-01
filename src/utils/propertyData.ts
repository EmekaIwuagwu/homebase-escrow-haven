
// Properties data for our app
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "sale" | "rent" | "lodge";
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  featured?: boolean;
  propertyType?: string;
  landlord?: {
    name: string;
    whatsapp?: string;
    phone?: string;
    email?: string;
  };
}

// Combined properties from all pages
export const getAllProperties = (): Property[] => {
  return [
    // Sale properties
    {
      id: "1",
      title: "Modern Apartment with Ocean View",
      location: "123 Coastal Drive, Malibu, CA",
      price: 250000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 2100,
      featured: true,
      propertyType: "Apartment",
      landlord: {
        name: "Jessica Williams",
        whatsapp: "+1-555-123-4567",
        phone: "+1-555-987-6543",
        email: "jessica.w@realtor.com"
      }
    },
    {
      id: "2",
      title: "Luxury Estate with Mountain Views",
      location: "456 Mountain Ridge, Aspen, CO",
      price: 480000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=2070",
      beds: 5,
      baths: 4,
      sqft: 4500,
      featured: true,
      propertyType: "Estate",
      landlord: {
        name: "Michael Thompson",
        whatsapp: "+1-555-234-5678",
        phone: "+1-555-876-5432",
        email: "m.thompson@luxuryestates.com"
      }
    },
    {
      id: "3",
      title: "Downtown Penthouse Suite",
      location: "789 Urban Center, New York, NY",
      price: 375000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&q=80&w=2053",
      beds: 3,
      baths: 3,
      sqft: 2800,
      propertyType: "Penthouse",
    },
    {
      id: "4",
      title: "Contemporary House with Pool",
      location: "101 Sunshine Blvd, Los Angeles, CA",
      price: 195000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&q=80&w=2037",
      beds: 4,
      baths: 3,
      sqft: 3200,
      propertyType: "House",
    },
    {
      id: "5",
      title: "Waterfront Villa with Private Dock",
      location: "202 Harbor View, Miami, FL",
      price: 520000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&q=80&w=2070",
      beds: 6,
      baths: 5,
      sqft: 5100,
      propertyType: "Villa",
    },
    {
      id: "6",
      title: "Historic Brownstone with Garden",
      location: "303 Heritage Row, Boston, MA",
      price: 285000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&q=80&w=2084",
      beds: 4,
      baths: 3,
      sqft: 3600,
      propertyType: "Brownstone",
    },
    
    // Rent properties
    {
      id: "7",
      title: "Luxury Apartment with City View",
      location: "123 Downtown Ave, New York, NY",
      price: 950,
      type: "rent",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1200,
      featured: true,
      propertyType: "Apartment",
    },
    {
      id: "8",
      title: "Modern Townhouse with Garage",
      location: "456 Suburban St, Chicago, IL",
      price: 800,
      type: "rent",
      image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      featured: true,
      propertyType: "Townhouse",
    },
    {
      id: "9",
      title: "Studio in Arts District",
      location: "789 Creative Blvd, Los Angeles, CA",
      price: 650,
      type: "rent",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 750,
      propertyType: "Studio",
    },
    {
      id: "10",
      title: "Waterfront Condo with Balcony",
      location: "101 Harbor View, Seattle, WA",
      price: 850,
      type: "rent",
      image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1100,
      propertyType: "Condo",
    },
    {
      id: "11",
      title: "Sunny Garden Apartment",
      location: "202 Green Space, Austin, TX",
      price: 750,
      type: "rent",
      image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 850,
      propertyType: "Apartment",
    },
    {
      id: "12",
      title: "Penthouse with Rooftop Access",
      location: "303 Sky High, Miami, FL",
      price: 1200,
      type: "rent",
      image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&q=80&w=2070",
      beds: 3,
      baths: 3,
      sqft: 2000,
      propertyType: "Penthouse",
    },
    
    // Lodge properties
    {
      id: "13",
      title: "Beachfront Villa with Private Pool",
      location: "789 Shoreline Blvd, Miami, FL",
      price: 120,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=1965",
      beds: 5,
      baths: 4,
      sqft: 3800,
      featured: true,
      propertyType: "Villa",
    },
    {
      id: "14",
      title: "Cozy Mountain Cabin with Hot Tub",
      location: "456 Pine Trail, Aspen, CO",
      price: 95,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
      beds: 3,
      baths: 2,
      sqft: 1800,
      featured: true,
      propertyType: "Cabin",
    },
    {
      id: "15",
      title: "Urban Loft in Historic District",
      location: "789 Heritage Row, New Orleans, LA",
      price: 85,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&q=80&w=2071",
      beds: 2,
      baths: 2,
      sqft: 1200,
      propertyType: "Loft",
    },
    {
      id: "16",
      title: "Lakefront Cottage with Dock",
      location: "101 Tranquil Shores, Lake Tahoe, CA",
      price: 110,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?auto=format&q=80&w=2070",
      beds: 3,
      baths: 1,
      sqft: 1500,
      propertyType: "Cottage",
    },
    {
      id: "17",
      title: "Desert Oasis with Private Pool",
      location: "202 Cactus Road, Phoenix, AZ",
      price: 130,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 2200,
      propertyType: "Oasis",
    },
    {
      id: "18",
      title: "Luxury Penthouse with City Views",
      location: "303 Skyline Drive, Chicago, IL",
      price: 150,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&q=80&w=2080",
      beds: 2,
      baths: 2,
      sqft: 1800,
      propertyType: "Penthouse",
    },
    
    // Additional international properties
    {
      id: "27",
      title: "Oceanfront Mansion in Lagos",
      location: "5 Victoria Island Drive, Lagos, Nigeria",
      price: 320000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&q=80&w=2070",
      beds: 6,
      baths: 7,
      sqft: 8500,
      featured: true,
      propertyType: "Mansion",
    },
    {
      id: "28",
      title: "Modern High-Rise in Seoul",
      location: "123 Gangnam District, Seoul, South Korea",
      price: 185000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1540308990836-6219f37a19f0?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 1600,
      featured: true,
      propertyType: "High-Rise",
    },
    {
      id: "29",
      title: "Luxury Condo in Shanghai",
      location: "88 Pudong Avenue, Shanghai, China",
      price: 295000,
      type: "sale", 
      image: "https://images.unsplash.com/photo-1584644740736-fe70a4613493?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 2400,
      featured: true,
      propertyType: "Condo",
    },
    {
      id: "30",
      title: "Waterfront Villa in Singapore",
      location: "42 Marina Bay Road, Singapore",
      price: 470000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&q=80&w=2070",
      beds: 5,
      baths: 5,
      sqft: 4200,
      featured: true,
      propertyType: "Villa",
    },
    {
      id: "31",
      title: "Historic Mansion in Paris",
      location: "15 Avenue des Champs-Élysées, Paris, France",
      price: 680000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1551976484-7a5ca5c8cd5a?auto=format&q=80&w=2070",
      beds: 7,
      baths: 6,
      sqft: 7500,
      featured: true,
      propertyType: "Mansion",
    },
    {
      id: "32",
      title: "Mountain Chalet in Zurich",
      location: "78 Alpine Road, Zurich, Switzerland",
      price: 375000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1570987307727-9c704a4802db?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 3200,
      featured: true,
      propertyType: "Chalet",
    },
    {
      id: "33",
      title: "Riverside Apartment in Riga",
      location: "42 Daugava Street, Riga, Latvia",
      price: 75000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1595512050424-2a1a6cd44d32?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1400,
      featured: true,
      propertyType: "Apartment",
    },
    {
      id: "34",
      title: "Transylvanian Castle Estate",
      location: "7 Dracula Avenue, Transylvania, Romania",
      price: 290000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1547393941-0800159254b7?auto=format&q=80&w=2071",
      beds: 12,
      baths: 8,
      sqft: 15000,
      featured: true,
      propertyType: "Castle",
    },
    {
      id: "35",
      title: "Lakeside Mansion in Lekki",
      location: "27 Admiralty Way, Lekki, Nigeria",
      price: 900,
      type: "rent",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&q=80&w=2070",
      beds: 5,
      baths: 4,
      sqft: 4200,
      featured: true,
      propertyType: "Mansion",
    },
    {
      id: "36",
      title: "Modern Flat in Gangnam",
      location: "55 K-Pop Street, Gangnam, Seoul, South Korea",
      price: 750,
      type: "rent",
      image: "https://images.unsplash.com/photo-1598545547763-be4f4026f9bd?auto=format&q=80&w=1887",
      beds: 2,
      baths: 1,
      sqft: 950,
      featured: true,
      propertyType: "Flat",
    },
    {
      id: "37",
      title: "Serviced Apartment in Beijing",
      location: "101 Forbidden City Road, Beijing, China",
      price: 820,
      type: "rent",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 1600,
      featured: true,
      propertyType: "Apartment",
    },
    {
      id: "38",
      title: "Luxury Duplex in Sentosa",
      location: "15 Sentosa Cove, Singapore",
      price: 1100,
      type: "rent",
      image: "https://images.unsplash.com/photo-1558442074-b495148c3412?auto=format&q=80&w=2070",
      beds: 4,
      baths: 4,
      sqft: 3800,
      featured: true,
      propertyType: "Duplex",
    },
    {
      id: "39",
      title: "Artists Loft in Montmartre",
      location: "8 Rue des Artistes, Montmartre, Paris, France",
      price: 950,
      type: "rent",
      image: "https://images.unsplash.com/photo-1616142528303-4b7699a01fcb?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1200,
      featured: true,
      propertyType: "Loft",
    },
    {
      id: "40",
      title: "Alpine Studio with Scenic Views",
      location: "22 Mountain View, Geneva, Switzerland",
      price: 880,
      type: "rent",
      image: "https://images.unsplash.com/photo-1616511542282-c1d54e578f2e?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 800,
      propertyType: "Studio",
    },
    {
      id: "41",
      title: "Old Town Apartment in Riga",
      location: "9 Old Town Square, Riga, Latvia",
      price: 550,
      type: "rent",
      image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&q=80&w=2070",
      beds: 2,
      baths: 1,
      sqft: 950,
      propertyType: "Apartment",
    },
    {
      id: "42",
      title: "Exclusive Penthouse in Bucharest",
      location: "55 Palace Boulevard, Bucharest, Romania",
      price: 750,
      type: "rent",
      image: "https://images.unsplash.com/photo-1569597967185-cd6120712154?auto=format&q=80&w=2071",
      beds: 3,
      baths: 2,
      sqft: 1750,
      propertyType: "Penthouse",
    },
    {
      id: "43",
      title: "Beach Resort in Lagos",
      location: "10 Elegushi Beach Road, Lagos, Nigeria",
      price: 95,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1618945524163-32451704cbb8?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 2500,
      featured: true,
      propertyType: "Resort",
    },
    {
      id: "44",
      title: "Traditional Korean Hanok Stay",
      location: "35 Bukchon Village, Seoul, South Korea",
      price: 85,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1609947017826-cb7663861381?auto=format&q=80&w=2070",
      beds: 2,
      baths: 1,
      sqft: 950,
      featured: true,
      propertyType: "Hanok",
    },
    {
      id: "45",
      title: "Luxury Villa in Sanya",
      location: "88 Hainan Beach, Sanya, China",
      price: 145,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1572005739529-ad18df4ee24c?auto=format&q=80&w=2070",
      beds: 6,
      baths: 5,
      sqft: 4200,
      featured: true,
      propertyType: "Villa",
    },
    {
      id: "46",
      title: "Garden Suite in Marina Bay",
      location: "27 Marina Boulevard, Singapore",
      price: 110,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1582628719491-69f15afbec79?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 750,
      propertyType: "Suite",
    },
    {
      id: "47",
      title: "Seine River View Apartment",
      location: "12 Seine Promenade, Paris, France",
      price: 125,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1576403706548-5432731bd657?auto=format&q=80&w=2070",
      beds: 2,
      baths: 1,
      sqft: 950,
      propertyType: "Apartment",
    },
    {
      id: "48",
      title: "Alpine Ski Chalet",
      location: "45 Ski Resort Drive, Zermatt, Switzerland",
      price: 135,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1613323593608-9228bab6560c?auto=format&q=80&w=2070",
      beds: 4,
      baths: 2,
      sqft: 1800,
      propertyType: "Chalet",
    },
    {
      id: "49",
      title: "Historic Townhouse in Riga",
      location: "7 Baltic Avenue, Riga, Latvia",
      price: 75,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&q=80&w=2070",
      beds: 2,
      baths: 1,
      sqft: 1100,
      propertyType: "Townhouse",
    },
    {
      id: "50",
      title: "Carpathian Mountain Retreat",
      location: "22 Forest Road, Brasov, Romania",
      price: 80,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1462042404407-d3e9a6c4d0b1?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 1600,
      propertyType: "Retreat",
    },
    
    // NEW PROPERTIES - Add more diverse house/condo images with landlord information
    {
      id: "51",
      title: "Modern Urban Loft with Skyline Views",
      location: "88 Downtown District, Chicago, IL",
      price: 218000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1850,
      featured: true,
      propertyType: "Loft",
      landlord: {
        name: "Daniel Wilson",
        whatsapp: "+1-555-111-2222",
        phone: "+1-555-333-4444",
        email: "d.wilson@citylofts.com"
      }
    },
    {
      id: "52",
      title: "Luxury Beachfront Condo",
      location: "101 Oceanside Drive, San Diego, CA",
      price: 185000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 2100,
      featured: true,
      propertyType: "Condo",
      landlord: {
        name: "Sarah Martinez",
        whatsapp: "+1-555-999-8888",
        phone: "+1-555-777-6666",
        email: "s.martinez@beachproperties.com"
      }
    },
    {
      id: "53",
      title: "Mediterranean Style Villa with Pool",
      location: "42 Sunset Ave, Palm Springs, CA",
      price: 370000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80&w=2070",
      beds: 5,
      baths: 5.5,
      sqft: 4800,
      featured: true,
      propertyType: "Villa",
    },
    {
      id: "54",
      title: "Minimalist Glass House in Forest",
      location: "789 Woodland Drive, Portland, OR",
      price: 295000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2.5,
      sqft: 2900,
      featured: true,
      propertyType: "Modern House",
    },
    {
      id: "55",
      title: "Victorian Townhouse with Garden",
      location: "45 Heritage Street, San Francisco, CA",
      price: 310000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 3200,
      featured: true,
      propertyType: "Townhouse",
    },
    {
      id: "56",
      title: "Modern A-Frame Cabin in Woods",
      location: "28 Forest Trail, Lake Tahoe, CA",
      price: 125000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&q=80&w=2069",
      beds: 3,
      baths: 2,
      sqft: 1950,
      featured: true,
      propertyType: "Cabin",
    },
    {
      id: "57",
      title: "Luxury High-Rise Downtown Condo",
      location: "501 Main Street, Boston, MA",
      price: 4200,
      type: "rent",
      image: "https://images.unsplash.com/photo-1594484208280-efa00f96fc53?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1300,
      featured: true,
      propertyType: "Condo",
    },
    {
      id: "58",
      title: "Modern Suburban Ranch House",
      location: "87 Greenfield Drive, Austin, TX",
      price: 3100,
      type: "rent",
      image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&q=80&w=2016",
      beds: 4,
      baths: 2,
      sqft: 2400,
      featured: true,
      propertyType: "Ranch House",
    },
    {
      id: "59",
      title: "Stylish Converted Warehouse Loft",
      location: "19 Industry District, Seattle, WA",
      price: 3950,
      type: "rent",
      image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 1900,
      featured: true,
      propertyType: "Loft",
    },
  ];
};

// Get properties by type (sale, rent, lodge)
export const getPropertiesByType = (type: "sale" | "rent" | "lodge"): Property[] => {
  const allProperties = getAllProperties();
  return allProperties.filter(property => property.type === type);
};

// Get properties by location (searching in location field)
export const getPropertiesByLocation = (location: string): Property[] => {
  const allProperties = getAllProperties();
  return allProperties.filter(property => 
    property.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Get a single property by ID
export const getPropertyById = (id: string): Property | undefined => {
  const allProperties = getAllProperties();
  return allProperties.find(property => property.id === id);
};
