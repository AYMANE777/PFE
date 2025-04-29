import React from 'react';
import "./ExploreMenu.css"
import {menu_list} from "../../assets/frontend_assets/assets.js"
function ExploreMenu({category, setCategory}) {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-test">Indulge your senses with our carefully crafted menu, where every dish tells a story. From mouthwatering appetizers to decadent desserts, we serve up bold flavors, fresh ingredients, and unforgettable experiences. Whether you're craving comfort food or looking to try something new, there's something delicious waiting for you. Dive in and discover your next favorite bite.</p>
            <div className="explore-menu-list">
                {
                   menu_list.map((menu, index) => {
                       return (
                           <div onClick={()=>setCategory(prev=>prev===menu.menu_name ? "All" : menu.menu_name)} className="explore-menu-list-item" key={index}>
                               <img className={category===menu.menu_name ? "active" : ""} src={menu.menu_image} alt="" />
                               <p>{menu.menu_name}</p>
                           </div>
                       )
                   })
                }
            </div>
            <hr/>
        </div>

    );
}

export default ExploreMenu;