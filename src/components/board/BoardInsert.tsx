import {useState, useRef, Fragment} from 'react';
import {useMutation} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {useNavigate} from "react-router-dom";

function BoardInsert() {
    const nav = useNavigate()
    const [name, setName] = useState<string>('')
    const [subject, setSubject] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')

    const nameRef = useRef<HTMLInputElement>(null)
    const subjectRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const {mutate: boardInsert} = useMutation({
        mutationFn: async () => {
            return await boardClient.post('/board/insert_node', {
                name: name,
                subject: subject,
                content: content,
                pwd: pwd
            })
        },
        onSuccess: (res) => {
            if (res.data.msg === 'yes') {
                window.location.href = '/board/list'
            } else {
                alert('게시글 등록에 실패하였습니다.')
            }
        },
        onError: (err: Error) => {
            console.log("Error: ", err.message)
        }
    })

    const insert = (): void => {
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

        boardInsert()
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">자유게시판</h2>
                        <h3 className="section-subheading text-muted">글쓰기</h3>
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
                                    <button className={"insertOkBtn"} onClick={insert}>글쓰기</button>
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

export default BoardInsert