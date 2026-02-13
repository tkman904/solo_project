import {useState, Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
import {AxiosResponse} from "axios";
import {PetItem, PetData, FoodItem} from "../../commons/CommonsData";
import PagePrint from "../../commons/PagePrint";

function PetList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading, isError, error, data} = useQuery<AxiosResponse<PetData>, Error>({
        queryKey: ['pet-list' + curpage],
        queryFn: async () => {
            return await apiClient.get(`/pet/list_react/${curpage}`)
        }
    })

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
                        <h2 className="section-heading text-uppercase">Pet</h2>
                        <h3 className="section-subheading text-muted">리스트</h3>
                    </div>
                    <div className="row">
                        {data?.data.list && data?.data.list.map((pet: PetItem, index: number) =>
                            <div className="col-lg-3 col-sm-3 mb-4" key={index}>
                                {/* item */}
                                <div className="portfolio-item">
                                    <Link className="portfolio-link" to={"/food/detail/" + pet.no}>
                                        <div className="portfolio-hover">
                                            <div className="portfolio-hover-content"><i className="fas fa-3x"></i></div>
                                        </div>
                                        <img className="img-fluid" src={pet.thumbnail} alt="" />
                                    </Link>
                                    <div className="portfolio-caption">
                                        <div className="portfolio-caption-heading">{pet.title}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-12">
                            <div className="pagination pagination-sm">
                                <nav aria-label="#">
                                    {data?.data &&  <PagePrint data={data.data} setCurpage={setCurpage}/>}
                                </nav>
                            </div>
                            <div className="page-status text-end">
                                <p>Page {curpage} of {data?.data.totalpage} results</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default PetList
