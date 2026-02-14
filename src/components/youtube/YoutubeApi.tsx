import {YoutubeResponse} from "../../commons/CommonsData";

const API_KEY = "AIzaSyBFlPklmlcHlaL1-zXzJ4qS7aWohGCeHAs"

export const YoutubeApi = async (keyword: string): Promise<YoutubeResponse> => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${keyword}&type=video&key=${API_KEY}`)

    if (!response.ok) {
        throw new Error("Youtube API Error")
    }

    return await response.json()
}