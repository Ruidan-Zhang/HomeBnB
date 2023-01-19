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

    const createReviewRedirection = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}/write-a-review`);
    };

    if (!foundSpot) return null;

    return (
        <div className="single-spot-details-page-container">
            <h2 className="single-spot-name">{foundSpot.name}</h2>
            <div className="single-spot-header-container">
                <h4 className="single-spot-header">
                    <i className="fa-solid fa-star"></i>{avgRatingFormat(foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews · {foundSpot.city}, {foundSpot.state}, {foundSpot.country}
                    {(currentUser && foundSpot.ownerId === currentUser.id) && (
                    <div className="edit-and-delete-spot-buttons">
                        <button onClick={editFormRedirection}>Edit this spot</button>
                        <button onClick={deleteSpotRedirection}>Delete this spot</button>
                    </div>
                    )}
                    {foundSpot.ownerId !== currentUser.id && (
                    <div className="create-review-button">
                        <button onClick={createReviewRedirection}>Write a review!</button>
                    </div>
                    )}
                </h4>
            </div>
            <div className="single-spot-images">
                {foundSpot.SpotImages && (
                    foundSpot.SpotImages.map(image => (
                        <img src={image.url} alt={foundSpot.name} key={image.id} style={{borderRadius: 11, width: 1130, height: 560}}/>
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
