import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { loadSingleSpotThunk } from "../../store/single";
import './SingleReviewCard.css';

const SingleReviewCard = ({review, user, reviewOwnerId, reviewId, spotId, time}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const timeFormat = (time) => {
        if (time) {
            time = time.slice(0, 10);
            return time
        }
    };

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
                <div className="delete-review-button-container">
                {(currentUser && currentUser.id === reviewOwnerId) && (
                    <button className="delete-review-button" onClick={deleteReviewHandler}>Delete this review</button>
                )}
                </div>
            </div>
            <div className="single-review-createdTime">{timeFormat(time)}</div>
            <div className="single-review-content">{review}</div>
        </div>
    )
};

export default SingleReviewCard;
