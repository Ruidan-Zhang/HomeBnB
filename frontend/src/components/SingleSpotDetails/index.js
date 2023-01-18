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
    }, [dispatch, spotId]);

    if (!foundSpot) return null;

    return (
        <div className="single-spot-details-page-container">
            <h2>{foundSpot.name}</h2>
            <div className="single-spot-header">
                <h4>
                    <i className="fa-solid fa-star"></i>{foundSpot.avgStarRating} · {foundSpot.numReviews} reviews · {foundSpot.city}, {foundSpot.state}, {foundSpot.country}
                    <button>Edit this spot</button>
                    <button>Delete this spot</button>
                </h4>
            </div>
            <div className="single-spot-images">
                {foundSpot.SpotImages && (
                    foundSpot.SpotImages.map(image => (
                        <img src={image.url} alt={foundSpot.name} key={image.id}/>
                    ))
                )}
            </div>
            <div className="single-spot-description">
                {foundSpot.Owner && (
                    <h2>Hosted by {foundSpot.Owner.firstName}</h2>
                )}
                <p>{foundSpot.description}</p>
            </div>
            <div className="single-spot-reviews">
                <h2><i className="fa-solid fa-star"></i>{foundSpot.avgStarRating} · {foundSpot.numReviews} reviews</h2>
            </div>
        </div>
    )
};

export default SingleSpotDetails;
