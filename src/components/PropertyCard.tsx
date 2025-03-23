import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MapPin, Bed, Bath, Square, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/utils/formatters";

interface PropertyCardProps {
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

// Fallback images by property type
const fallbackImages = {
  sale: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=1200",
  rent: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&q=80&w=1200",
  lodge: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&q=80&w=1200"
};

const PropertyCard = ({
  id,
  title,
  location,
  price,
  type,
  image,
  beds,
  baths,
  sqft,
  featured = false,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

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

  const handleViewDetails = () => {
    navigate(`/property/${id}`);
  };

  // Get fallback image based on property type
  const getFallbackImage = () => {
    return fallbackImages[type] || fallbackImages.sale;
  };

  // Format price in a minimalistic way
  const getMinimalisticPrice = () => {
    // For properties over 1 million
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    // For properties over 1000
    else if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return formatPrice(price);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden property-card border-0 shadow-lg rounded-xl bg-white dark:bg-gray-800 h-full transition-all",
        featured ? "ring-2 ring-homebase-500 ring-offset-2" : ""
      )}
    >
      <div 
        className="relative w-full h-52 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={handleViewDetails}
      >
        {isImageLoading && !isImageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <Image className="h-12 w-12 text-gray-300" />
          </div>
        )}

        {isImageError ? (
          <div className="absolute inset-0 bg-cover bg-center">
            <img
              src={getFallbackImage()}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isImageLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsImageLoading(false)}
            onError={() => {
              setIsImageError(true);
              setIsImageLoading(false);
            }}
          />
        )}

        <button
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
            isFavorited
              ? "bg-white text-red-500"
              : "bg-black/30 text-white hover:bg-black/50"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
        >
          <Heart
            className={cn("w-4 h-4", isFavorited ? "fill-current" : "")}
          />
        </button>

        <div className="absolute bottom-3 left-3">
          <Badge
            className={cn("text-xs px-2 py-0.5", typeColors[type])}
          >
            {typeLabel[type]}
          </Badge>
          {featured && (
            <Badge
              className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5"
            >
              Featured
            </Badge>
          )}
        </div>
        
        {/* Minimalistic price badge */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-white text-gray-800 font-semibold px-2 py-0.5 shadow-sm">
            {getMinimalisticPrice()} {type !== "sale" ? "/mo" : ""}
          </Badge>
        </div>
      </div>

      <CardContent 
        className="pt-4 pb-2 cursor-pointer"
        onClick={handleViewDetails}
      >
        <div className="flex items-start gap-2 mb-1">
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-xs">{beds} beds</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-xs">{baths} baths</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-xs">{formatPrice(sqft)} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <Button 
          className="w-full text-sm" 
          variant="outline"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
