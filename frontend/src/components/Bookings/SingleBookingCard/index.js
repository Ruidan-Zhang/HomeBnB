import { useHistory } from 'react-router-dom';
import OpenModalButton from '../../OpenModalButton';
import EditBookingForm from '../EditBookingForm';
import DeleteBookingConfirmation from '../DeleteBooking';
import './SingleBookingCard.css';

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
        <div className="single-spot-card-container">
            <img className='single-spot-previewImage' src={spot.previewImage} alt='single-spot-preview' onClick={handleClick}/>
            <div className='single-review-header'>
                <div className="single-spot-card-address" onClick={handleClick}>{spot.city}, {spot.state}</div>
                <div className='single-post-card-buttons'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                        modalComponent={<EditBookingForm booking={booking} spot={spot}/>}
                        className='edit-booking-button'
                    />
                    <OpenModalButton
                        buttonText={<i className="fa-regular fa-trash-can"></i>}
                        modalComponent={<DeleteBookingConfirmation booking={booking}/>}
                        className='edit-booking-button'
                    />
                </div>
            </div>
            <div className="single-booking-card-price" onClick={handleClick}>${spot.price} night</div>
            <div onClick={handleClick}>{timeFormat(booking.startDate)} - {timeFormat(booking.endDate)}</div>
        </div>
    )
};

export default SingleBookingCard;
