import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FoodList from "./components/food/FoodList";
import FoodDetail from "./components/food/FoodDetail";
import PetList from "./components/pet/PetList";
import PetDetail from "./components/pet/PetDetail";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/food/list" element={<FoodList/>}/>
                <Route path="/food/detail/:fno" element={<FoodDetail/>}/>
                <Route path="/pet/list" element={<PetList/>}/>
                <Route path="/pet/detail/:pno" element={<PetDetail/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
