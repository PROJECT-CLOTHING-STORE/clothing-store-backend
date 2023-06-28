export interface CreateClothesRequest {
    image: string;
    name: string;
    stock: number;
    tags: string[];
    description?: string;
}
