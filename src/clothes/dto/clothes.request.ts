export interface CreateClothesRequest {
    image: string;
    name: string;
    stock: number;
    price: number;
    tags: string[];
    description?: string;
}
