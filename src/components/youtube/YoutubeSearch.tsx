import {useState, Fragment, useRef} from "react"
import {useQuery} from "@tanstack/react-query";
import {YoutubeApi} from "./YoutubeApi";
import {YoutubeItem} from "../../commons/CommonsData";

function YoutubeSearch(){
    const [keyword, setKeyword] = useState<string>('')
    const keywordRef = useRef<HTMLInputElement>(null)
    const {isLoading, isError, error, data, refetch: search} = useQuery({
        queryKey: ['youtube'],
        queryFn: () => YoutubeApi(`${keyword}레시피`)
    })

    const searchClick = () => {
        if (!keyword.trim()) {
            return keywordRef.current?.focus()
        }
        if (keywordRef.current) {
            setKeyword(keywordRef.current?.value)
        }

        search()
    }

    const decodeHtml = (html: string) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }

    if (isError) {
        return <h1 className={"text-center"}>Error: {error.message}</h1>
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">레시피</h2>
                        <h3 className="section-subheading text-muted">Youtube 검색</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-12" style={{"margin": "0px auto"}}>
                            <input type={"text"} size={40} className={"input-sm"} ref={keywordRef} value={keyword}
                                   onChange={(e) => setKeyword(e.target.value)} placeholder={"음식이름을 입력해주세요"}/>
                            &nbsp;
                            <button className={"searchBtn"} onClick={searchClick}>검색</button>
                        </div>
                    </div>
                    <div className="row" style={{"width": "1000px", "margin": "20px auto"}}>
                        {data?.items.map((item: YoutubeItem) =>
                            <div className="col-6" key={item.id.videoId} style={{"marginTop": "20px"}}>
                                <div className="single-post">
                                    <div className="post-thumbnail">
                                        <iframe src={"https://www.youtube.com/embed/" + item.id.videoId} title={item.snippet.title} allowFullScreen={true} width="470px" height="230px"/>
                                    </div>
                                    <div className="post-content">
                                        <span className="post-title" style={{"fontSize": "16px"}}>{decodeHtml(item.snippet.title)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default YoutubeSearch;