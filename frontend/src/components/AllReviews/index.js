import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllReviewsThunk } from "../../store/reviews";
import SingleReviewCard from "../SingleReviewCard";
import { cleanUpReviewsAction } from "../../store/reviews";

const AllReviewsComponent = ({ spotId }) => {
    const dispatch = useDispatch();
    const allReviewsObj = useSelector(state => state.reviews);
    const allReviews = Object.values(allReviewsObj);

    useEffect(() => {
        dispatch(loadAllReviewsThunk(spotId));
        return () => dispatch(cleanUpReviewsAction());
    }, [dispatch, spotId]);

    if (!allReviews || !allReviewsObj) return null;

    return (
        <div className="all-reviews-container">
            {allReviews.map((singleReview) => (
                <SingleReviewCard key={singleReview.id}
                review={singleReview.review}
                stars={singleReview.stars}
                user={singleReview.User.firstName}
                />
            ))}
        </div>
    )
};

export default AllReviewsComponent;
