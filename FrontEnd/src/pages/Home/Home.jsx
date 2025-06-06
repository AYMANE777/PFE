import React, {useState} from 'react';
import "./Home.css"
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../foodDisplay/FoodDisplay.jsx";
import Reservation from "../Reservation/Reservation.jsx";
function Home() {
    const [category, setCategory] = useState("All");
    return (
        <div>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <Reservation/>
        </div>
    );
}

export default Home;