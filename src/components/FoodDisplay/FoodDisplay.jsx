import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';


const FoodDisplay = ({category,searchText}) => {

    const {foodList} = useContext(StoreContext);
    const filteredFoods=foodList.filter(food=>(
        (category==='All' || food.category===category)&&
        food.name.toLowerCase().includes(searchText.toLowerCase())
    ));

    return (
        <div className="container">
            <div className="row">
                {filteredFoods.length > 0 ? (
                   filteredFoods.map((food,index)=>(
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <FoodItem name={food.name} description={food.description} id={food.id} imageUrl={food.imageUrl} price={food.price} />
                    </div>
                   ))

                ) : (
                    <div className="text-center mt-4">
                        <h4>No food found.</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FoodDisplay;