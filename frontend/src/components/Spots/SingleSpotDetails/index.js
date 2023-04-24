import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadSingleSpotThunk } from "../../../store/single";
import { cleanUpSingleSpotAction } from "../../../store/single";
import AllReviewsComponent from "../../Reviews/AllReviews";
import EditSpotForm from "../EditSpotForm";
import CreateReviewForm from "../../Reviews/CreateReviewForm";
import OpenModalButton from "../../OpenModalButton";
import DeleteSpotConfirmation from "../DeleteSpots";
import './SingleSpotDetails.css';

const SingleSpotDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const foundSpot = useSelector(state => state.single);

    const currentUser = useSelector(state => state.session.user);

    const allReviewsObj = useSelector(state => state.reviews);
    const allReviews = Object.values(allReviewsObj);

    const avgRatingFormat = (rating) => {
        if (rating && typeof rating === 'number') return rating.toFixed(2);
        else if (!rating || typeof rating !== 'number') return "No ratings yet";
    };

    useEffect(() => {
        dispatch(loadSingleSpotThunk(spotId));
        return () => dispatch(cleanUpSingleSpotAction());
    }, [dispatch, spotId]);

    if (!foundSpot) return null;

    return (
        <div className="single-spot-details-page-container">
            <h2 className="single-spot-name">{foundSpot.name}</h2>
            <div className="single-spot-header-container">
                <h4 className="single-spot-header">
                    <i className="fa-solid fa-star"></i>{avgRatingFormat(+foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews · {foundSpot.city}, {foundSpot.state}, {foundSpot.country}
                    {(currentUser && foundSpot.ownerId === currentUser.id) && (
                    <div className="edit-and-delete-spot-buttons-container">
                        <div>
                            <OpenModalButton
                                buttonText='Edit'
                                modalComponent={<EditSpotForm spotId={spotId}/>}
                                className='edit-spot-button'
                            />
                        </div>
                        <div>
                            <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteSpotConfirmation spotId={spotId}/>}
                                className='delete-spot-button'
                            />
                        </div>
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
                <div className="single-spot-owner-and-price">
                    {foundSpot.Owner && (
                        <h2>Hosted by {foundSpot.Owner.firstName}</h2>
                    )}
                    <h2>${foundSpot.price} night</h2>
                </div>
                <p>{foundSpot.description}</p>
            </div>
            <div className="single-spot-reviews-container">
                <div className="single-spot-reviews-header">
                    <h2><i className="fa-solid fa-star"></i>{avgRatingFormat(+foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews</h2>
                    {(currentUser && foundSpot.ownerId !== currentUser.id && (
                            !allReviews.find(review => review.userId === currentUser.id)
                    )) && (
                    <div className="create-review-button-container">
                        <OpenModalButton
                            buttonText='Write a review!'
                            modalComponent={<CreateReviewForm spotId={spotId}/>}
                            className='create-review-button'
                        />
                    </div>
                    )}
                </div>
                <AllReviewsComponent spotId={spotId}/>
            </div>
        </div>
    )
};

export default SingleSpotDetails;
