import { useHistory } from 'react-router-dom';
import './SingleSpotCard.css';

const SingleSpotCard = ({id, city, state, price, avgRating, previewImage}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/spots/${id}`)
    };

    const avgRatingFormat = (rating) => {
        if (typeof rating === 'number') return rating.toFixed(2);
        else return rating;
    };

    if (!previewImage) return null;

    return (
        <div className="single-spot-card-container" onClick={handleClick}>
            <img className='single-spot-previewImage' src={previewImage} alt='single-spot-preview'/>
            <div className='single-spot-address-and-rating'>
                <div className="single-spot-card-address">{city}, {state}</div>
                <div className='single-spot-rating'>
                    <i className="fa-solid fa-star"></i> {avgRatingFormat(+avgRating)}
                </div>
            </div>
            <div className="single-spot-card-price">${price} night</div>
        </div>
    )
};

export default SingleSpotCard;
