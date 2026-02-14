import {useState, useEffect, Fragment, useRef} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import boardClient from "../../board-commons";
import {AxiosResponse, AxiosError} from "axios";

interface BoardItem {
    NO: number
    NAME: string
    SUBJECT: string
    CONTENT: string
}

interface BoardResponse {
    msg: string
}

function BoardUpdate() {
    const [name, setName] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')

    const nameRef = useRef<HTMLInputElement>(null)
    const subjectRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const {no} = useParams()
    const nav = useNavigate()

    const {isLoading, isError, error, data} = useQuery<{data: BoardItem}>({
        queryKey: ['board-update', no],
        queryFn: async () => {
            return boardClient.get<BoardItem>(`/board/update_node?no=${no}`)
        }
    })

    const board = data?.data

    useEffect(() => {
        if (board) {
            setName(board.NAME)
            setSubject(board.SUBJECT)
            setContent(board.CONTENT)
        }
    }, [board])

    const {mutate: boardUpdate} = useMutation({
        mutationFn: () => boardClient.put(`/board/update_ok_node`, {
            no: no,
            name: name,
            subject: subject,
            content: content,
            pwd: pwd
        }),
        onSuccess: (res: AxiosResponse<BoardResponse>) => {
            if (res.data.msg === 'yes') {
                window.location.href = `/board/detail/${no}`
            } else {
                alert('잘못된 비밀번호 입니다')
                setPwd('')
                pwdRef.current?.focus()
            }
        },
        onError: (err: AxiosError) => {
            console.log(err.message)
        }
    })

    const boardUpdateOk = () => {
        if (!name.trim()) {
            return nameRef.current?.focus()
        }
        if (!subject.trim()) {
            return subjectRef.current?.focus()
        }
        if (!content.trim()) {
            return contentRef.current?.focus()
        }
        if (!pwd.trim()) {
            return pwdRef.current?.focus()
        }

        boardUpdate()
    }

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }

    if (isError) {
        return <h1 className={"text-center"}>Error: {error?.message}</h1>
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">자유게시판</h2>
                        <h3 className="section-subheading text-muted">수정하기</h3>
                    </div>
                    <div className="row" style={{"width": "600px", "margin": "0px auto"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"15%"} className={"text-center"}>이름</td>
                                <td width={"85%"}>
                                    <input type={"text"} size={20} className={"input-sm"} ref={nameRef} value={name}
                                           onChange={(e: any) => setName(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"} className={"text-center"}>제목</td>
                                <td width={"85%"}>
                                    <input type={"text"} size={58} className={"input-sm"} ref={subjectRef} value={subject}
                                           onChange={(e: any) => setSubject(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"} className={"text-center"}>내용</td>
                                <td width={"85%"}>
                                    <textarea rows={10} cols={61} ref={contentRef} value={content}
                                              onChange={(e: any) => setContent(e.target.value)}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"} className={"text-center"} style={{"border": "none"}}>비밀번호</td>
                                <td width={"85%"} style={{"border": "none"}}>
                                    <input type={"password"} size={20} className={"input-sm"} ref={pwdRef} value={pwd}
                                           onChange={(e: any) => setPwd(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-center"} style={{"border": "none"}}>
                                    <button className={"updateOkBtn"} onClick={boardUpdateOk}>수정</button>
                                    &nbsp;
                                    <button className={"cancelBtn"} onClick={() => nav(-1)}>취소</button>
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

export default BoardUpdate