import {Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {MainData, petMainItem, foodMainItem} from "../../commons/CommonsData";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";

function Home() {
    const {isLoading, isError, error, data} = useQuery<{data: MainData}, Error>({
        queryKey: ['main-data'],
        queryFn: async () => await  apiClient.get('/')
    })

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }

    if (isError) {
        return <h1 className={"text-center"}>Error: {error?.message}</h1>
    }

    return (
        <Fragment>
            <section className="page-section bg-light" id="portfolio">
                {/* FoodBest4 */}
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">FOOD</h2>
                        <h3 className="section-subheading text-muted">인기 맛집</h3>
                    </div>
                    <div className="row">
                        {data?.data.fList.map((food: foodMainItem, index: number) =>
                            <div className="col-lg-3 col-sm-3 mb-4">
                                {/* Food Item */}
                                <div className="portfolio-item">
                                    <Link className="portfolio-link" to={"/food/detail/" + food.fno}>
                                        <div className="portfolio-hover">
                                            <div className="portfolio-hover-content"><i className="fas fa-3x"></i></div>
                                        </div>
                                        <img className="img-fluid" src={food.poster} alt="..."
                                             style={{"width": "100%", "height": "250px"}}/>
                                    </Link>
                                    <div className="portfolio-caption">
                                        <div className="portfolio-caption-heading" style={{"overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "fontSize": "20px"}}>{food.name}</div>
                                        <div
                                            className="portfolio-caption-subheading text-muted text-end">views: {food.hit}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <br/><br/>
                {/* PetBest4 */}
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">PET</h2>
                        <h3 className="section-subheading text-muted">인기 게시글</h3>
                    </div>
                    <div className="row">
                        {data?.data.pList.map((pet: petMainItem, index: number) =>
                            <div className="col-lg-3 col-sm-3 mb-4">
                                {/* Pet Item */}
                                <div className="portfolio-item">
                                    <Link className="portfolio-link" to={"/pet/detail/" + pet.pno}>
                                        <div className="portfolio-hover">
                                            <div className="portfolio-hover-content"><i className="fas fa-3x"></i></div>
                                        </div>
                                        <img className="img-fluid" src={pet.thumbnail} alt="..."
                                             style={{"width": "100%", "height": "250px"}}/>
                                    </Link>
                                    <div className="portfolio-caption">
                                        <div className="portfolio-caption-heading" style={{"overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "fontSize": "20px"}}>{pet.title}</div>
                                        <div
                                            className="portfolio-caption-subheading text-muted text-end">views: {pet.hit}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Home