export class House {
  id!: number;
  ownerId!: number;
  title?: string;
  price!: number;
  location!: string;
  description!: string;
  image!: string;
  beds?: number;
  baths!: number;
  sqft?: number;
  type?: 'sale' | 'rent';
  propertyType?: string;
  isFavorite?: boolean;
  favoriteId?: number;

  agent?: string;
  phone?: string;
  whatsapp?: string;
  mapLink?: string;
  comments?: any[];
  showContact?: boolean;
imageUrl: any;
}
