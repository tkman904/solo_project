import {useState, useEffect, Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import boardClient from "../../board-commons";

interface BoardItem {
    NO: number
    SUBJECT: string
    NAME: string
    DBDAY: string
    HIT: number
}

interface BoardListResponse {
    list: BoardItem[]
    curpage: number
    totalpage: number
}

function BoardList() {
    const [curpage, setCurpage] = useState<number>(1)
    const {isLoading, isError, error, data, refetch: hitIncrement} = useQuery<{data: BoardListResponse}>({
        queryKey: ['board-list', curpage],
        queryFn: async () => await boardClient.get(`/board/list_node?page=${curpage}`)
    })

    useEffect(() => {
        hitIncrement()
    }, [curpage])

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }

    if (isError) {
        return <h1 className={"text-center"}>Error: {error.message}</h1>
    }

    const prev = () => {
        if (curpage > 1) {
            setCurpage(curpage - 1)
        }
    }
    const next = () => {
        if (data && curpage < data.data.totalpage) {
            setCurpage(curpage + 1)
        }
    }

    return (
        <Fragment>
                <section className="page-section bg-light">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">자유게시판</h2>
                            <h3 className="section-subheading text-muted">리스트</h3>
                        </div>
                        <div className="row" style={{"width": "1000px", "margin": "0px auto"}}>
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <td style={{"border": "none"}}>
                                        <Link to="/board/insert" className={"insertBtn"}>새 글</Link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table className={"table"}>
                                <thead>
                                <tr style={{"backgroundColor": "#ffc800"}}>
                                    <th className={"text-center"} style={{"width": "10%"}}>번호</th>
                                    <th className={"text-center"} style={{"width": "40%"}}>제목</th>
                                    <th className={"text-center"} style={{"width": "15%"}}>이름</th>
                                    <th className={"text-center"} style={{"width": "25%"}}>작성일</th>
                                    <th className={"text-center"} style={{"width": "10%"}}>조회수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data && data.data.list.length > 0 ? (
                                    <>
                                        {data?.data.list.map((board: BoardItem, index: number) =>
                                            <tr key={board.NO}>
                                                <td className={"text-center"} width={"10%"}>{board.NO}</td>
                                                <td width={"40%"}><Link
                                                    to={"/board/detail/" + board.NO}>{board.SUBJECT}</Link></td>
                                                <td className={"text-center"} width={"15%"}>{board.NAME}</td>
                                                <td className={"text-center"} width={"25%"}>{board.DBDAY}</td>
                                                <td className={"text-center"} width={"10%"}>{board.HIT}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className={"text-center"} colSpan={5} style={{"border": "none"}}>
                                                <button className={"prevBtn"} onClick={prev}>이전</button>
                                                &nbsp;
                                                {data?.data.curpage} page / {data?.data.totalpage} pages
                                                &nbsp;
                                                <button className={"nextBtn"} onClick={next}>다음</button>
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td className={"text-center"} colSpan={5}>
                                            <b>아직 작성된 게시글이 없습니다</b>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
        </Fragment>
    )
}

export default BoardList