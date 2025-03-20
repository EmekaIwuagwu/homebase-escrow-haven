
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const fallbackImage = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&q=80&w=1200";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [api, setApi] = useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageUrl = (index: number) => {
    if (imageErrors[index]) {
      return fallbackImage;
    }
    return images[index];
  };

  return (
    <div className="relative rounded-xl overflow-hidden mb-8">
      <Carousel 
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-96 relative">
              <img 
                src={getImageUrl(index)} 
                alt={`${title} - Image ${index + 1}`} 
                className="w-full h-full object-cover"
                onError={() => handleImageError(index)}
              />
              {imageErrors[index] && (
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                  Fallback image shown
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-3 py-1 rounded-full text-xs">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default PropertyGallery;
