const SingleReviewCard = ({review, stars, user}) => {

    if (!review) return null;

    return (
        <div className="single-review-card-container">
            <div className='single-review-header'>
                <div className="single-review-reviewOwner">{user}</div>
                <div className="single-review-star">{stars}</div>
            </div>
            <div className="single-review-content">{review}</div>
        </div>
    )
};

export default SingleReviewCard;
