import './SingleSpotCard.css';

const SingleSpotCard = ({id, city, state, price, avgRating, previewImage}) => {

    return (
        <div className="single-spot-card-container">
            <img className='single-spot-previewImage' src={previewImage} alt='single-spot-preview'/>
            <div className='single-spot-address-and-rating'>
                <div className="single-spot-card-address">{city}, {state}</div>
                <div className='single-spot-rating'>
                <i class="fa-solid fa-star"></i> {avgRating}
                </div>
            </div>
            <div className="single-spot-card-price">${price} night</div>
        </div>
    )
};

export default SingleSpotCard;
