import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { loadSingleSpotThunk } from "../../store/single";
import './SingleReviewCard.css';

const SingleReviewCard = ({review, user, reviewOwnerId, reviewId, spotId}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const deleteReviewHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(reviewId));
        dispatch(loadSingleSpotThunk(spotId))
    };

    if (!review) return null;

    return (
        <div className="single-review-card-container">
            <div className='single-review-header'>
                <div className="single-review-reviewOwner">{user}</div>
            </div>
            {(currentUser && currentUser.id === reviewOwnerId) && (
                <button onClick={deleteReviewHandler}>Delete This Review</button>
            )}
            <div className="single-review-content">{review}</div>
        </div>
    )
};

export default SingleReviewCard;
