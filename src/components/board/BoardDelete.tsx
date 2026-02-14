import {useState, Fragment, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {AxiosResponse, AxiosError} from "axios";

interface BoardDeleteProps {
    msg: string
}

function BoardDelete() {
    const nav = useNavigate()
    const {no} = useParams<{no: string}>()

    const [pwd, setPwd] = useState<string>('')

    const pwdRef = useRef<HTMLInputElement>(null)

    const {mutate: boardDelete} = useMutation({
        mutationFn: async () => {
            return await boardClient.delete(`/board/delete_node/${no}/${pwd}`)
        },
        onSuccess: (res: AxiosResponse<BoardDeleteProps>) => {
            if (res.data.msg === 'yes') {
                window.location.href = '/board/list'
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

    const boardDeleteOk = () => {
        if (!pwd.trim()) {
            pwdRef.current?.focus()
            return
        }

        boardDelete()
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">자유게시판</h2>
                        <h3 className="section-subheading text-muted">삭제하기</h3>
                    </div>
                    <div className="row" style={{"width": "400px", "margin": "0px auto"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="text-center">
                                    비밀번호 <input type={"password"} size={15} ref={pwdRef} value={pwd}
                                                onChange={(e) => setPwd(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    <button className={"deleteOkBtn"} onClick={boardDeleteOk}>삭제</button>
                                    &nbsp;
                                    <button className={"backBtn"} onClick={() => nav(-1)}>취소</button>
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

export default BoardDelete