export class Category {
    CategoryId: number;
    Name: string;
}

export class Product {
    productId: number;
    Name: string;
    Description: string;
    Url: string;
    CategoryIds: Array<number>[];
}

// this one is slightly different than Product because the API returns Categories as a complete array of objects
export class CurrentProduct {
    ProductId: number;
    Name: string;
    Description: string;
    Url: string;
    Categories: any;
}