import { useDispatch, useSelector } from "react-redux";
import DeleteReviewConfirmation from "../DeleteReviews";
import OpenModalButton from "../../OpenModalButton";
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

    if (!review) return null;

    return (
        <div className="single-review-card-container">
            <div className='single-review-header'>
                <div className="single-review-reviewOwner">{user}</div>
                <div className="delete-review-button-container">
                {(currentUser && currentUser.id === reviewOwnerId) && (
                    <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteReviewConfirmation reviewId={reviewId} spotId={spotId}/>}
                        className='delete-review-button'
                    />
                )}
                </div>
            </div>
            <div className="single-review-createdTime">{timeFormat(time)}</div>
            <div className="single-review-content">{review}</div>
        </div>
    )
};

export default SingleReviewCard;
