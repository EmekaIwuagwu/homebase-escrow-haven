
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
}

// Combined properties from all pages
export const getAllProperties = (): Property[] => {
  return [
    // Sale properties
    {
      id: "1",
      title: "Modern Apartment with Ocean View",
      location: "123 Coastal Drive, Malibu, CA",
      price: 2500000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 2100,
      featured: true,
    },
    {
      id: "2",
      title: "Luxury Estate with Mountain Views",
      location: "456 Mountain Ridge, Aspen, CO",
      price: 4800000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80&w=2070",
      beds: 5,
      baths: 4,
      sqft: 4500,
      featured: true,
    },
    {
      id: "3",
      title: "Downtown Penthouse Suite",
      location: "789 Urban Center, New York, NY",
      price: 3750000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&q=80&w=2053",
      beds: 3,
      baths: 3,
      sqft: 2800,
    },
    {
      id: "4",
      title: "Contemporary House with Pool",
      location: "101 Sunshine Blvd, Los Angeles, CA",
      price: 1950000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1629236815610-52dce72800ef?auto=format&q=80&w=2053",
      beds: 4,
      baths: 3,
      sqft: 3200,
    },
    {
      id: "5",
      title: "Waterfront Villa with Private Dock",
      location: "202 Harbor View, Miami, FL",
      price: 5200000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&q=80&w=2070",
      beds: 6,
      baths: 5,
      sqft: 5100,
    },
    {
      id: "6",
      title: "Historic Brownstone with Garden",
      location: "303 Heritage Row, Boston, MA",
      price: 2850000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&q=80&w=2084",
      beds: 4,
      baths: 3,
      sqft: 3600,
    },
    
    // Rent properties
    {
      id: "7",
      title: "Luxury Apartment with City View",
      location: "123 Downtown Ave, New York, NY",
      price: 3500,
      type: "rent",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1200,
      featured: true,
    },
    {
      id: "8",
      title: "Modern Townhouse with Garage",
      location: "456 Suburban St, Chicago, IL",
      price: 2800,
      type: "rent",
      image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      featured: true,
    },
    {
      id: "9",
      title: "Studio in Arts District",
      location: "789 Creative Blvd, Los Angeles, CA",
      price: 1950,
      type: "rent",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 750,
    },
    {
      id: "10",
      title: "Waterfront Condo with Balcony",
      location: "101 Harbor View, Seattle, WA",
      price: 3200,
      type: "rent",
      image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?auto=format&q=80&w=2070",
      beds: 2,
      baths: 2,
      sqft: 1100,
    },
    {
      id: "11",
      title: "Sunny Garden Apartment",
      location: "202 Green Space, Austin, TX",
      price: 1700,
      type: "rent",
      image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&q=80&w=2070",
      beds: 1,
      baths: 1,
      sqft: 850,
    },
    {
      id: "12",
      title: "Penthouse with Rooftop Access",
      location: "303 Sky High, Miami, FL",
      price: 4500,
      type: "rent",
      image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&q=80&w=2070",
      beds: 3,
      baths: 3,
      sqft: 2000,
    },
    
    // Lodge properties
    {
      id: "13",
      title: "Beachfront Villa with Private Pool",
      location: "789 Shoreline Blvd, Miami, FL",
      price: 950,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&q=80&w=1965",
      beds: 5,
      baths: 4,
      sqft: 3800,
      featured: true,
    },
    {
      id: "14",
      title: "Cozy Mountain Cabin with Hot Tub",
      location: "456 Pine Trail, Aspen, CO",
      price: 375,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&q=80&w=1974",
      beds: 3,
      baths: 2,
      sqft: 1800,
      featured: true,
    },
    {
      id: "15",
      title: "Urban Loft in Historic District",
      location: "789 Heritage Row, New Orleans, LA",
      price: 225,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&q=80&w=2071",
      beds: 2,
      baths: 2,
      sqft: 1200,
    },
    {
      id: "16",
      title: "Lakefront Cottage with Dock",
      location: "101 Tranquil Shores, Lake Tahoe, CA",
      price: 280,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?auto=format&q=80&w=2070",
      beds: 3,
      baths: 1,
      sqft: 1500,
    },
    {
      id: "17",
      title: "Desert Oasis with Private Pool",
      location: "202 Cactus Road, Phoenix, AZ",
      price: 320,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 2200,
    },
    {
      id: "18",
      title: "Luxury Penthouse with City Views",
      location: "303 Skyline Drive, Chicago, IL",
      price: 550,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&q=80&w=2080",
      beds: 2,
      baths: 2,
      sqft: 1800,
    },
    
    // Additional properties in common locations
    {
      id: "19",
      title: "Modern Apartment in Lagos",
      location: "123 Victoria Island, Lagos, Nigeria",
      price: 1250000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=2074",
      beds: 3,
      baths: 2,
      sqft: 1800,
    },
    {
      id: "20",
      title: "Luxury Condo in Canberra",
      location: "45 Parliament St, Canberra, Australia",
      price: 2950,
      type: "rent",
      image: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?auto=format&q=80&w=2066",
      beds: 2,
      baths: 2,
      sqft: 1600,
    },
    {
      id: "21",
      title: "Waterfront Home in Stockholm",
      location: "78 Gamla Stan, Stockholm, Sweden",
      price: 3600000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&q=80&w=2037",
      beds: 4,
      baths: 3,
      sqft: 2800,
    },
    {
      id: "22",
      title: "Charming Apartment in Paris",
      location: "15 Rue de Rivoli, Paris, France",
      price: 450,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&q=80&w=2071",
      beds: 1,
      baths: 1,
      sqft: 750,
    },
    {
      id: "23",
      title: "Lakeside Home in Michigan",
      location: "320 Lake Shore Dr, Grand Rapids, MI",
      price: 1850000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&q=80&w=2070",
      beds: 4,
      baths: 3,
      sqft: 2600,
    },
    {
      id: "24",
      title: "Historic Townhouse in Baltimore",
      location: "56 Harbor View, Baltimore, MD",
      price: 2200,
      type: "rent",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 1950,
    },
    {
      id: "25",
      title: "Traditional Home in Kano",
      location: "89 Kofar Mata, Kano, Nigeria",
      price: 850000,
      type: "sale",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&q=80&w=2071",
      beds: 5,
      baths: 3,
      sqft: 3200,
    },
    {
      id: "26",
      title: "Beachfront Villa in Lomé",
      location: "12 Coastal Road, Lomé, Togo",
      price: 380,
      type: "lodge",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&q=80&w=2070",
      beds: 3,
      baths: 2,
      sqft: 1600,
    }
  ];
};

// Get properties by type
export const getPropertiesByType = (type: "sale" | "rent" | "lodge"): Property[] => {
  return getAllProperties().filter(property => property.type === type);
};

// Get properties by location (partial match)
export const getPropertiesByLocation = (location: string): Property[] => {
  const searchTerm = location.toLowerCase();
  return getAllProperties().filter(property => 
    property.location.toLowerCase().includes(searchTerm)
  );
};

// Get property by ID
export const getPropertyById = (id: string): Property | undefined => {
  return getAllProperties().find(property => property.id === id);
};
