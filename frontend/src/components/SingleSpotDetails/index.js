import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleSpotThunk } from "../../store/single";

const SingleSpotDetails = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const foundSpot = useSelector(state => state.single)

    useEffect(() => {
        dispatch(loadSingleSpotThunk(spotId))
    }, [dispatch]);

    if (!foundSpot) return null;

    return (
        <h2>{foundSpot.name}</h2>
    )
};

export default SingleSpotDetails;
