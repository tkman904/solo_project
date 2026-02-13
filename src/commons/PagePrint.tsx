import {FoodData, PetData} from "./CommonsData";
import {FC} from "react";

interface pagePrintProps {
    data: FoodData|PetData;
    setCurpage: (page: number) => void;
}

const PagePrint: FC<pagePrintProps> = ({data, setCurpage}) => {
    const {curpage, totalpage, startPage, endPage} = data
    const pageArr = []

    // 매개변수는 반드시 데이터형 설정
    // 페이지 이동
    const prev = () => setCurpage(startPage - 1)
    const next = () => setCurpage(endPage + 1)
    const pageChange = (page: number) => setCurpage(page)

    if (startPage > 1) {
        pageArr.push(<li className="page-item" key="prev"><a className="page-link nav-link" onClick={prev}>&laquo;</a></li>)
    }

    for (let i: number = startPage; i <= endPage; i++) {
        pageArr.push(<li className={i === curpage ? 'page-item active' : 'page-item'} key={`page-${i}`}><a className="page-link nav-link" onClick={() => pageChange(i)}>{i}</a></li>)
    }

    if (endPage < totalpage) {
        pageArr.push(<li className="page-item" key="next"><a className="page-link nav-link" onClick={next}>&raquo;</a></li>)
    }
    return (
        <ul className={"pagination"}>
            {pageArr}
        </ul>
    )
}

export default PagePrint