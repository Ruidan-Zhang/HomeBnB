import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadSingleSpotThunk } from "../../store/single";
import { deleteSpotThunk } from "../../store/spots";
import { cleanUpSingleSpotAction } from "../../store/single";
import AllReviewsComponent from "../AllReviews";
import './SingleSpotDetails.css';

const SingleSpotDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const foundSpot = useSelector(state => state.single);

    const currentUser = useSelector(state => state.session.user);

    const avgRatingFormat = (rating) => {
        if (typeof rating === 'number') return rating.toFixed(2);
        else return rating;
    };

    useEffect(() => {
        dispatch(loadSingleSpotThunk(spotId));
        return () => dispatch(cleanUpSingleSpotAction());
    }, [dispatch, spotId]);

    const editFormRedirection = (e) => {
        e.preventDefault();
        history.push(`/edit-spot/${spotId}`);
    };

    const deleteSpotRedirection = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(foundSpot.id));
        history.push(`/`);
    };

    if (!foundSpot) return null;

    return (
        <div className="single-spot-details-page-container">
            <h2>{foundSpot.name}</h2>
            <div className="single-spot-header-container">
                <h4 className="single-spot-header">
                    <i className="fa-solid fa-star"></i>{avgRatingFormat(foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews · {foundSpot.city}, {foundSpot.state}, {foundSpot.country}
                    {foundSpot.ownerId === currentUser.id && (
                    <div className="edit-and-delete-spot-buttons">
                        <button onClick={editFormRedirection}>Edit this spot</button>
                        <button onClick={deleteSpotRedirection}>Delete this spot</button>
                    </div>
                    )}
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
                <h2><i className="fa-solid fa-star"></i>{avgRatingFormat(foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews</h2>
                <AllReviewsComponent spotId={spotId}/>
            </div>
        </div>
    )
};

export default SingleSpotDetails;
