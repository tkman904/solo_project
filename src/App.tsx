import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FoodList from "./components/food/FoodList";
import FoodDetail from "./components/food/FoodDetail";
import PetList from "./components/pet/PetList";
import PetDetail from "./components/pet/PetDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import YoutubeSearch from "./components/youtube/YoutubeSearch";
import NewsSearch from "./components/news/NewsSearch";
import ChatBot from "./components/chat/ChatBot";

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
                <Route path="/board/list" element={<BoardList/>}/>
                <Route path="/board/insert" element={<BoardInsert/>}/>
                <Route path="/board/detail/:no" element={<BoardDetail/>}/>
                <Route path="/board/update/:no" element={<BoardUpdate/>}/>
                <Route path="/board/delete/:no" element={<BoardDelete/>}/>
                <Route path="/youtube/search" element={<YoutubeSearch/>}/>
                <Route path="/news/search" element={<NewsSearch/>}/>
                <Route path="/chat/chatbot" element={<ChatBot/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
