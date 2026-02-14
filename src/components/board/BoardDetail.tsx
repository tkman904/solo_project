import {useParams, Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Fragment} from "react";
import boardClient from "../../board-commons";

interface BoardDetailProps {
    NO: number
    NAME: string
    SUBJECT: string
    CONTENT: string
    DBDAY: string
    HIT: number
}

function BoardDetail() {
    const {no} = useParams()
    const {isLoading, isError, error, data} = useQuery<{data: BoardDetailProps}>({
        queryKey: ['board-detail', no],
        queryFn: () => boardClient.get(`/board/detail_node?no=${no}`),
        enabled: !!no,
        staleTime: 0,
        refetchOnMount: true
    })

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }

    if (isError) {
        return <h1 className={"text-center"}>Error: {error?.message}</h1>
    }

    const board = data?.data

    if (!board) {
        return null
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">자유게시판</h2>
                        <h3 className="section-subheading text-muted">상세보기</h3>
                    </div>
                    <div className="row" style={{"width": "1000px", "margin": "0px auto"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"20%"} className={"text-center"} style={{"backgroundColor": "#ffc800"}}>번호</td>
                                <td width={"30%"} className={"text-center"}>{board.NO}</td>
                                <td width={"20%"} className={"text-center"} style={{"backgroundColor": "#ffc800"}}>작성일</td>
                                <td width={"30%"} className={"text-center"}>{board.DBDAY}</td>
                            </tr>
                            <tr>
                                <td width={"20%"} className={"text-center"} style={{"backgroundColor": "#ffc800"}}>이름</td>
                                <td width={"30%"} className={"text-center"}>{board.NAME}</td>
                                <td width={"20%"} className={"text-center"} style={{"backgroundColor": "#ffc800"}}>조회수</td>
                                <td width={"30%"} className={"text-center"}>{board.HIT}</td>
                            </tr>
                            <tr>
                                <td width={"20%"} className={"text-center"} style={{"backgroundColor": "#ffc800"}}>제목</td>
                                <td colSpan={3}>{board.SUBJECT}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className={"text-start"} valign={"top"} height={200}>
                                    <pre style={{"whiteSpace": "pre-wrap", "border": "none"}}>{board.CONTENT}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className={"text-end"} style={{"border": "none"}}>
                                    <Link to={"/board/update/"+board.NO} className={"updateBtn"}>수정</Link>
                                    &nbsp;
                                    <Link to={"/board/delete/"+board.NO} className={"deleteBtn"}>삭제</Link>
                                    &nbsp;
                                    <Link to={"/board/list"} className={"listBtn"}>목록</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default BoardDetail