import { useHistory } from 'react-router-dom';

const SingleBookingCard = ({ spotId, spot, booking }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/spots/${spotId}`)
    };

    const timeFormat = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.toLocaleString("default", { month: "long" });
        const year = newDate.getFullYear();

        return `${month} ${day} ${year}`;
    };

    if (!booking || !spot) return null;

    return (
        <div className="single-spot-card-container" onClick={handleClick}>
            <img className='single-spot-previewImage' src={spot.previewImage} alt='single-spot-preview'/>
            <div className="single-spot-card-address">{spot.city}, {spot.state}</div>
            <div className="single-booking-card-price">${spot.price} night</div>
            {timeFormat(booking.startDate)} - {timeFormat(booking.endDate)}
        </div>
    )
};

export default SingleBookingCard;
