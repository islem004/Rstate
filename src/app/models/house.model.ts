export class House {
  id!: number;
  title?: string;
  price!: number;
  location!: string;
  description!: string;
  image!: string;
  ownerId!: number;
  sqft?: number;
  baths!: number;
  beds?: number;
  isFavorite?: boolean;
  type?: 'sale' | 'rent';
  propertyType?: string;
  
  // Only used in Property Details page
  agent?: string;
  phone?: string;
  whatsapp?: string;
  mapLink?: string;
  comments?: any[];
  showContact?: boolean;
}
