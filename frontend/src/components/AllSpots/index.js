import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SingleSpotCard from "../SingleSpotCard";
import './AllSpots.css';

const AllSpotsComponent = () => {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector(state => state.spots);
    const allSpots = Object.values(allSpotsObj);

    useEffect(() => {
        dispatch(getAllSpotsThunk());
    }, [dispatch]);

    if (!allSpots) return null;

    return (
        <div className="all-spots-container">
            {allSpots.map((spot) => (
                <SingleSpotCard key={spot.id}
                id={spot.id}
                city={spot.city}
                state={spot.state}
                price={spot.price}
                avaRating={spot.avaRating}
                previewImage={spot.previewImage}
                />
            ))}
        </div>
    )
}

export default AllSpotsComponent;
