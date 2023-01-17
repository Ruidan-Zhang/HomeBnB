import './SingleSpotCard.css';

const SingleSpotCard = ({id, city, state, price, avaRating, previewImage}) => {

    return (
        <div className="single-spot-card-container">
            <img className='single-spot-previewImage' src={previewImage} alt='single-spot-image'/>
            <div className='single-spot-rating'>avaRating???</div>
            <div className="single-spot-card-address">{city}, {state}</div>
            <div className="single-spot-card-price">{price}</div>
        </div>
    )
};

export default SingleSpotCard;
