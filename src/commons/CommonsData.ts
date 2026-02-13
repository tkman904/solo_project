export interface FoodItem {
    fno: number;
    name: string;
    type: string;
    phone: string;
    address: string;
    score: number;
    theme: string;
    price: string;
    time: string;
    parking: string;
    poster: string;
    content: string;
    hit: number;
}

export interface FoodData {
    list: FoodItem[];
    curpage: number;
    totalpage: number;
    startPage: number;
    endPage: number;
}

export interface PetItem {
    pno: number;
    title: string;
    url: string;
    thumbnail: string;
    detailText: string;
    detailImages: string[];
}

export interface PetData {
    list: PetItem[];
    curpage: number;
    totalpage: number;
    startPage: number;
    endPage: number;
}