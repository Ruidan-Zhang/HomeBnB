import './SingleSpotCard.css';

const SingleSpotCard = ({id, city, state, name, description, price, avaRating, previewImage}) => {
    return (
        <div className="single-spot-card-container">
            <div className="single-spot-card-address">{city}, {state}</div>
            <div className="single-spot-card-price">{price}</div>
        </div>
    )
};

export default SingleSpotCard;
