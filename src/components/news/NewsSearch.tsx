import {useState, Fragment, useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {AxiosResponse} from "axios";

interface NewsItem {
    title: string,
    originallink: string,
    link: string,
    description: string,
    pubDate: string
}

interface NewsResponse {
    lastBuildDate: string,
    total: number,
    start: number,
    display: number,
    items: NewsItem[]
}

interface NewsProps {
    data: NewsResponse
}

function NewsSearch() {
    const [keyword, setKeyword] = useState<string>('강아지')

    const keywordRef = useRef<HTMLInputElement>(null)

    const {isLoading, isError, error, data, refetch: newsSearch} = useQuery<AxiosResponse, Error>({
        queryKey: ['news-search'],
        queryFn: async () => await boardClient.get(`/news/search_node?query=${keyword}`)
    })

    const search = () => {
        if (!keyword.trim()) {
            return keywordRef.current?.focus()
        }

        if (keywordRef.current) {
            setKeyword(keywordRef.current?.value)
        }

        newsSearch()
    }

    if (isLoading) {
        return <h1 className="text-center">Loading...</h1>
    }

    if (isError) {
        return <h1 className="text-center">Error: {error?.message}</h1>
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">반려동물</h2>
                        <h3 className="section-subheading text-muted">뉴스 검색</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-12" style={{"margin": "0px auto"}}>
                            <p style={{"color": "gray"}}>원하시는 반려동물 관련 뉴스를 검색해보세요</p>
                            <input type={"text"} size={40} className={"input-sm"} ref={keywordRef} value={keyword}
                                   onChange={(e) => setKeyword(e.target.value)}/>
                            &nbsp;
                            <button className={"searchBtn"} onClick={search}>검색</button>
                        </div>
                    </div>
                    <div className="row" style={{"width": "1300px", "margin": "20px auto"}}>
                        {data?.data.items && data?.data.items.map((item: NewsItem, index: number) => (
                            <div className="col-6 mb-4" key={index}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            <h5 className={"news-title"} dangerouslySetInnerHTML={{__html: item.title}}></h5>
                                        </a>
                                        <p dangerouslySetInnerHTML={{__html: item.description}}></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default NewsSearch