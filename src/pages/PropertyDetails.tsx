import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Calendar, User, Building, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/utils/formatters";

const fallbackImages = {
  sale: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=1200",
  rent: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&q=80&w=1200",
  lodge: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&q=80&w=1200"
};

const generatePropertyImages = (mainImage: string, type: string) => {
  const fallback = fallbackImages[type as keyof typeof fallbackImages];
  
  const additionalImages = {
    sale: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560449752-71aadc8c57e8?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448082-4d9fe4f6b516?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560438718-eb61ede255eb?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&q=80&w=1200",
    ],
    rent: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&q=80&w=1200",
    ],
    lodge: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1551927411-95e412943b58?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1570737209810-87a8e7245f88?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1540518614846-7925a6acd771?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&q=80&w=1200",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&q=80&w=1200",
    ]
  };
  
  const typeImages = additionalImages[type as keyof typeof additionalImages] || [];
  
  return [mainImage, ...typeImages].slice(0, 10);
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProperty = () => {
      setLoading(true);
      
      import("@/utils/propertyData").then(({ getAllProperties }) => {
        const allProperties = getAllProperties();
        const foundProperty = allProperties.find(p => p.id === id);
        
        if (foundProperty) {
          setProperty(foundProperty);
          setPropertyImages(generatePropertyImages(foundProperty.image, foundProperty.type));
        } else {
          toast.error("Property not found");
          navigate("/");
        }
        
        setLoading(false);
      }).catch(error => {
        console.error("Failed to load property data:", error);
        toast.error("Failed to load property details");
        setLoading(false);
      });
    };
    
    fetchProperty();
  }, [id, navigate]);

  const handleProceedToCheckout = () => {
    navigate(`/checkout/${id}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const typeColors = {
    sale: "bg-blue-100 text-blue-700",
    rent: "bg-green-100 text-green-700",
    lodge: "bg-purple-100 text-purple-700",
  };

  const typeLabel = {
    sale: "For Sale",
    rent: "For Rent",
    lodge: "Lodging",
  };

  const getFallbackImage = () => {
    return property ? fallbackImages[property.type as keyof typeof fallbackImages] : fallbackImages.sale;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-80 bg-gray-200 rounded mb-6"></div>
              <div className="h-8 w-1/2 bg-gray-200 rounded mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6 md:px-10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold">Property Not Found</h1>
            <p className="mt-4 mb-8">The property you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to results
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h1 className="text-3xl font-bold">{property.title}</h1>
                  <div className="text-2xl font-bold">
                    {formatPrice(property.price)} HNXZ
                    {property.type !== "sale" && <span className="text-sm font-normal text-gray-500 ml-1">/mo</span>}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className={typeColors[property.type as keyof typeof typeColors]}>
                    {typeLabel[property.type as keyof typeof typeLabel]}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-amber-100 text-amber-700">
                      Featured
                    </Badge>
                  )}
                  <Badge className="bg-gray-100 text-gray-700">
                    ID: {property.id}
                  </Badge>
                </div>
              </div>
              
              <PropertyGallery images={propertyImages} title={property.title} />
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                  <Bed className="w-6 h-6 text-gray-600 mb-2" />
                  <div className="text-sm text-gray-500">Bedrooms</div>
                  <div className="font-bold">{property.beds}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                  <Bath className="w-6 h-6 text-gray-600 mb-2" />
                  <div className="text-sm text-gray-500">Bathrooms</div>
                  <div className="font-bold">{property.baths}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                  <Square className="w-6 h-6 text-gray-600 mb-2" />
                  <div className="text-sm text-gray-500">Square Feet</div>
                  <div className="font-bold">{formatPrice(property.sqft)}</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  This beautiful {property.beds}-bedroom property offers modern living in a prime location. 
                  With {property.baths} bathrooms and {formatPrice(property.sqft)} square feet of living space, 
                  it provides ample room for comfortable living. The property features high-end finishes, 
                  natural lighting, and a thoughtful layout. Perfect for those seeking {property.type === "sale" ? "a long-term investment" : property.type === "rent" ? "a comfortable rental home" : "a luxurious getaway"}.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
                <ul className="grid grid-cols-2 gap-4 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-homebase-500 rounded-full mr-2"></span>
                    Modern Kitchen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-homebase-500 rounded-full mr-2"></span>
                    Air Conditioning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-homebase-500 rounded-full mr-2"></span>
                    Hardwood Floors
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-homebase-500 rounded-full mr-2"></span>
                    Washer & Dryer
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-homebase-500 rounded-full mr-2"></span>
                    High-Speed Internet
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-homebase-500 rounded-full mr-2"></span>
                    Parking Space
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-32">
                <h3 className="text-lg font-bold mb-4">
                  {property.type === "sale" ? "Purchase Information" : property.type === "rent" ? "Rental Information" : "Booking Information"}
                </h3>
                
                <div className="border-t border-b border-gray-100 py-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Price</span>
                    <span className="font-bold">{formatPrice(property.price)} HNXZ</span>
                  </div>
                  
                  {property.type !== "sale" && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Frequency</span>
                      <span>{property.type === "lodge" ? "Per Night" : "Per Month"}</span>
                    </div>
                  )}
                  
                  {property.type === "sale" && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Property Type</span>
                      <span>Residential</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Availability</span>
                    <Badge className="bg-green-100 text-green-700">Available Now</Badge>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Listed by</div>
                      <div className="font-medium">Property Owner</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <div className="text-sm text-gray-500">Property ID</div>
                      <div className="font-medium">HNXZ-{property.id}</div>
                    </div>
                  </div>
                </div>
                
                {property.type === "lodge" && (
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-in</label>
                      <div className="flex items-center border border-gray-200 rounded-md p-2">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <input 
                          type="date" 
                          className="w-full border-none text-sm p-0 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-out</label>
                      <div className="flex items-center border border-gray-200 rounded-md p-2">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <input 
                          type="date" 
                          className="w-full border-none text-sm p-0 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Secure Transaction with Blockchain Verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
