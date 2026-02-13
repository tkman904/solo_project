import {useState, Fragment, useRef} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {PetItem} from "../../commons/CommonsData";
import apiClient from "../../http-commons";
import {AxiosResponse} from "axios";

interface CommentData {
    no: number
    pno: number
    id: string
    name: string
    msg: string
    dbday: string
}

interface PetDetailProps {
    data: {
        pets: PetItem,
        comments: CommentData[]
    }
}

function PetDetail() {
    const {pno} = useParams()
    const nav = useNavigate()

    const [isInsert, setIsInsert] = useState<boolean>(true)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [no, setNo] = useState<number>(0)

    const [msg, setMsg] = useState<string>("")
    const msgRef = useRef<HTMLTextAreaElement>(null)

    const [umsg, setUmsg] = useState<string>("")
    const umsgRef = useRef<HTMLTextAreaElement>(null)

    const {isLoading, isError, error, data, refetch: petDetail} = useQuery<PetDetailProps, Error>({
        queryKey: ['pet-detail', pno],
        queryFn: async () => {
            return await apiClient.get(`/pet/detail_react/${pno}`)
        }
    })

    const {mutate: commentInsert} = useMutation<PetDetailProps>({
        mutationFn: async () => {
            const res: AxiosResponse<PetDetailProps, Error> = await apiClient.post('/comment/insert', {
                pno: pno,
                id: sessionStorage.getItem("id"),
                name: sessionStorage.getItem("name"),
                msg: msg
            })

            return res.data
        },
        onSuccess: (data: PetDetailProps) => {
            petDetail()

            if (msgRef.current) {
                msgRef.current.value = ''
            }
        },
        onError: (err: Error) => {
            console.log("Error:", error?.message)
        }
    })

    const {mutate: commentUpdate} = useMutation<PetDetailProps>({
        mutationFn: async () => {
            const res: AxiosResponse<PetDetailProps, Error> = await apiClient.put('/comment/update', {
                no: no,
                msg: umsg
            })

            return res.data
        },
        onSuccess: (data: PetDetailProps) => {
            petDetail()

            if (umsgRef.current) {
                umsgRef.current.value = ''
            }

            setIsInsert(true)
            setIsEdit(false)
        },
        onError: (err: Error) => {
            console.log("Error:", error?.message)
        }
    })

    const {mutate: commentDelete} = useMutation<PetDetailProps>({
        mutationFn: async () => {
            const res: AxiosResponse<PetDetailProps, Error> = await apiClient.delete(`/comment/delete/${no}/${pno}`)

            return res.data
        },
        onSuccess: (data: PetDetailProps) => {
            petDetail()
        },
        onError: (err: Error) => {
            console.log("Error:", error?.message)
        }
    })

    if (isLoading) {
        return <h1 className="text-center">Loading...</h1>
    }

    if (isError) {
        return <h1 className="text-center">Error: {error?.message}</h1>
    }

    const petData: PetItem | undefined = data?.data.pets
    const comment: CommentData[] | undefined = data?.data.comments
    const insert = () => {
        if (msg === '') {
            msgRef.current?.focus()
            return
        }

        commentInsert()
    }

    const del = (no: number) => {
        setNo(no)
        commentDelete()
    }

    const updateData = (no: number, index: number) => {
        if (!comment) {
            return
        }

        setUmsg(comment[index].msg)
        setIsInsert(false)
        setIsEdit(true)
        setNo(no)
    }

    const update = () => {
        if (umsg === '') {
            umsgRef.current?.focus()

            return
        }

        commentUpdate()
    }

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Pet</h2>
                        <h3 className="section-subheading text-muted">상세보기</h3>
                    </div>
                    <div className="row">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"} style={{"border": "none"}}>
                                    <img src={petData?.thumbnail} style={{"width": "800px"}} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-center"}><h3>{petData?.title}</h3></td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td style={{"border": "none", "fontSize": "large"}}>{petData?.detailText}</td>
                            </tr>
                            <tr>
                                <td className={"img-grid"}>
                                    {petData?.detailImages?.map((src, index) => (
                                        <img key={index} src={src}/>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td className={"text-end"} style={{"border": "none"}}>
                                    <button className={"btn-sm backBtn"} onClick={() => nav(-1)}>목록</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table" style={{"border": "none"}}>
                            <tbody>
                            <tr>
                                <td>
                                    {comment && comment.map((com: CommentData, index: number) =>
                                        <table className="table" key={index} style={{"border": "1px solid black"}}>
                                            <tbody>
                                            <tr>
                                                <td className={"text-start"} width={"80%"} style={{"border": "none", "fontWeight": "bold"}} >
                                                    ★ {com.name}({com.dbday})
                                                </td>
                                                <td className={"text-end"} width={"20%"}style={{"border": "none"}}>
                                                    {com.id === sessionStorage.getItem("id") && (
                                                        <span>
                                                            <button className={"commentBtn"} onClick={() => updateData(com.no, index)} key={index}>수정</button>
                                                            &nbsp;
                                                            <button className={"commentDelBtn"} onClick={() => del(com.no)}>삭제</button>
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} valign="top">
                                                    <pre style={{"whiteSpace": "pre-wrap", "border": "none"}}>{com.msg}</pre>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {sessionStorage.getItem("id") && isInsert === true && (
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>
                                        <textarea rows={5} cols={160} style={{"float": "left"}} ref={msgRef}
                                                  onChange={(e) => setMsg(e.target.value)}/>
                                        <button className={"commentBtn"} style={{"float": "left", "width": "106px", "height": "126px"}} onClick={insert}>댓글 작성</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        )}
                        {isEdit && (
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>
                                        <textarea rows={5} cols={160} style={{"float": "left"}} ref={umsgRef} value={umsg}
                                                  onChange={(e) => setUmsg(e.target.value)}/>
                                        <button className={"commentBtn"} style={{"float": "left", "width": "106px", "height": "126px"}} onClick={update}>댓글 수정</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default PetDetail