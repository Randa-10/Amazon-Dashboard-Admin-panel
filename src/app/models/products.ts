export interface Products {
    en: {
        title: string;
        description: string;
        brand: string;
      };
      ar: {
        title: string;
        description: string;
        brand: string;
      };
      thumbnail: string;
      images: string[];
      category: string; 
      subCategory: string; 
      subSubCategor: string; 
      sku: string;
      quantityInStock: number;
      price: number;
      discountPercentage: number;
      rating: number;
      ratingQuantity: number;

}
