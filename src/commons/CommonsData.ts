export interface foodMainItem {
    fno: number
    name: string
    poster: string
    hit: number
}

export interface petMainItem {
    pno: number
    title: string
    thumbnail: string
    hit: number
}

export interface MainData {
    fList: foodMainItem[]
    pList: petMainItem[]
}

export interface FoodItem {
    fno: number
    name: string
    type: string
    phone: string
    address: string
    score: number
    theme: string
    price: string
    time: string
    parking: string
    poster: string
    content: string
    hit: number
}

export interface FoodData {
    list: FoodItem[]
    curpage: number
    totalpage: number
    startPage: number
    endPage: number
}

export interface PetItem {
    pno: number
    title: string
    url: string
    thumbnail: string
    detailText: string
    detailImages: string[]
}

export interface PetData {
    list: PetItem[]
    curpage: number
    totalpage: number
    startPage: number
    endPage: number
}

export interface YoutubeItem {
    id: {
        videoId: string
    }
    snippet: {
        title: string
        description: string
        thumbnail: {
            medium: {
                url: string
            }
        }
    }
}

export interface YoutubeResponse {
    items: YoutubeItem[]
}