import {Fragment} from 'react';
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {FoodItem} from "../../commons/CommonsData";
import apiClient from "../../http-commons";
import MapPrint from "../../commons/MapPrint";

interface FoodDetailProps {
    data: {
        detail: FoodItem
    }
}

function FoodDetail() {
    const {fno} = useParams()
    const nav = useNavigate()

    const {isLoading, isError, error, data} = useQuery<FoodDetailProps, Error>({
        queryKey: ['food-detail', fno],
        queryFn: async () => {
            return await apiClient.get(`/food/detail_react/${fno}`)
        }
    })

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }

    if (isError) {
        return <h1 className={"text-center"}>Error: {error?.message}</h1>
    }

    const foodData: FoodItem | undefined = data?.data.detail

    return (
        <Fragment>
            <section className="page-section bg-light">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Food</h2>
                        <h3 className="section-subheading text-muted">상세보기</h3>
                    </div>
                    <div className="row">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"30%"} className="text-center" rowSpan={8} style={{"border": "none"}}>
                                    <img src={foodData?.poster} style={{"width": "350px", "height": "300px"}}/>
                                </td>
                                <td colSpan={2}>
                                    <h3>{foodData?.name}&nbsp;<span style={{"color": "orange"}}>{foodData?.score}</span></h3></td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"}>주소</td>
                                <td width={"60%"}>{foodData?.address}</td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"}>전화</td>
                                <td width={"60%"}>{foodData?.phone}</td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"}>음식종류</td>
                                <td width={"60%"}>{foodData?.type}</td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"}>가격대</td>
                                <td width={"60%"}>{foodData?.price}</td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"}>영업시간</td>
                                <td width={"60%"}>{foodData?.time}</td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"}>주차</td>
                                <td width={"60%"}>{foodData?.parking}</td>
                            </tr>
                            <tr>
                                <td width={"10%"} className={"text-center"} style={{"border": "none"}}>테마</td>
                                <td width={"60%"} style={{"border": "none"}}>{foodData?.theme}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>{foodData?.content}</td>
                            </tr>
                            <tr>
                                <td className={"text-end"} style={{"border": "none"}}>
                                    <button className={"btn-sm backBtn"} onClick={() => nav(-1)}>목록</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"}>
                                    {foodData && <MapPrint address={foodData?.address} name={foodData?.name}/>}
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

export default FoodDetail