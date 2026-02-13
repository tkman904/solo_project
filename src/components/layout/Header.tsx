import {Link, useNavigate} from "react-router-dom";
import apiClient from "../../http-commons";
import {useState, useEffect, Fragment, useRef} from "react";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";

function Header() {
    const nav = useNavigate();

    const [login, setLogin] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');

    const idRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)

    interface LoginData {
        msg: string;
        id?: string;
        name?: string;
    }

    const {mutate: loginOk} = useMutation({
        mutationFn: async (data) => {
            const res: AxiosResponse<LoginData> = await apiClient.get(`/member/login/${id}/${pwd}`)
            return res.data
        },
        onSuccess: (data: LoginData) => {
            if (data.msg === 'NOID') {
                alert('존재하지 않는 아이디입니다')
                setId('')
                setPwd('')
                idRef.current?.focus()
            } else if (data.msg === 'NOPWD') {
                alert('잘못된 비밀번호 입니다')
                setPwd('')
                pwdRef.current?.focus()
            } else if (data.msg === 'OK' && data.id && data.name) {
                window.sessionStorage.setItem('id', data.id)
                window.sessionStorage.setItem('name', data.name)
                setLogin(true)
                window.location.reload()
            }
        },
        onError: (error: AxiosError) => {
            console.log('Login 실패', error.message)
        }
    })

    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            setLogin(true)
        }
    }, [])

    const memberLogin = () => {
        if (!id || id.trim() === '') {
            idRef.current?.focus()
            return
        }

        if (!pwd || pwd.trim() === '') {
            pwdRef.current?.focus()
            return
        }

        loginOk()
    }

    const memberLogout = () => {
        window.sessionStorage.clear()
        setId('')
        setPwd('')
        setLogin(false)
        window.location.reload()
    }

    return (
        <Fragment>
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href={"/"}>Food & Pet</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link className="nav-link" to={"/food/list"}>음식</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/pet/list"}>반려동물</Link></li>
                            <li className="nav-item"><a className="nav-link" href="#about">게시판</a></li>
                            <li className="nav-item"><a className="nav-link" href="#team">검색</a></li>
                        </ul>
                    </div>
                    <div className="login_register_area d-flex" style={{"marginLeft": "50px"}}>
                        {
                            !login ? (
                                <div className="login">
                                    ID <input type={"text"} size={10} className={"input-sm"} ref={idRef} value={id} onChange={(e: any) => setId(e.target.value)}/>
                                    &nbsp;
                                    PW <input type={"password"} size={10} className={"input-sm"} ref={pwdRef} value={pwd} onChange={(e: any) => setPwd(e.target.value)}/>
                                    &nbsp;
                                    <button className={"loginBtn"} onClick={memberLogin}>로그인</button>
                                </div>
                            ) : (
                                <div className="login_ok">
                                    {window.sessionStorage.getItem('name')}님 로그인 중입니다
                                    <button className={"logoutBtn"} onClick={memberLogout}>로그아웃</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>
            {/* Masthead */}
            <header className="masthead">
                <div className="container">
                    <div className="masthead-subheading">Welcome To Our Website!</div>
                    <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
                    <a className="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
                </div>
            </header>
        </Fragment>
    )
}

export default Header