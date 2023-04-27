import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadSingleSpotThunk } from "../../../store/single";
import { cleanUpSingleSpotAction } from "../../../store/single";
import AllReviewsComponent from "../../Reviews/AllReviews";
import EditSpotForm from "../EditSpotForm";
import CreateReviewForm from "../../Reviews/CreateReviewForm";
import OpenModalButton from "../../OpenModalButton";
import DeleteSpotConfirmation from "../DeleteSpots";
import { createBookingThunk } from "../../../store/bookings";
import { getMyBookingsThunk } from "../../../store/bookings";
import './SingleSpotDetails.css';

const SingleSpotDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const foundSpot = useSelector(state => state.single);

    const currentUser = useSelector(state => state.session.user);

    const allReviewsObj = useSelector(state => state.reviews);
    const allReviews = Object.values(allReviewsObj);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);

    const today = new Date().toISOString().split('T')[0];

    const avgRatingFormat = (rating) => {
        if (rating && typeof rating === 'number') return rating.toFixed(2);
        else if (!rating || typeof rating !== 'number') return "No ratings yet";
    };

    useEffect(() => {
        dispatch(loadSingleSpotThunk(spotId));
        return () => dispatch(cleanUpSingleSpotAction());
    }, [dispatch, spotId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors();

        const newBooking = {
            spotId: foundSpot.id,
            userId: currentUser.id,
            startDate,
            endDate
        };

        const createdBooking = await dispatch(createBookingThunk(spotId, newBooking))
            .catch (async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors('Selected dates conflict with an existing booking.');
            })

        if (createdBooking) {
            dispatch(getMyBookingsThunk());
            history.push('/my-bookings');
        }
    };

    const nightCounter = (start, end) => {
        const difference = new Date(end).getTime() - new Date(start).getTime();

        if (!difference) {
            return 0;
        } else {
            return Math.round(difference / (1000 * 60 * 60 * 24));
        }
    };

    const feesCalculator = (start, end, price) => {
        const bookingFee = (price * nightCounter(start, end)).toFixed(2);
        const cleaningFee = (bookingFee * 0.15).toFixed(2);
        const serviceFee = (bookingFee * 0.1).toFixed(2);
        let total = 0;
        total = (+bookingFee + +cleaningFee + +serviceFee).toFixed(2);

        return {bookingFee, cleaningFee, serviceFee, total};
    };

    const createBookingForm = (
        <form onSubmit={handleSubmit} className='create-booking-form'>
            <div className="create-booking-form-header">
                <div className="create-booking-form-price-container">
                    <div className="create-booking-price">${Number(foundSpot.price).toFixed(2)}</div>
                    <div>night</div>
                </div>
                <div><i className="fa-solid fa-star"></i>{avgRatingFormat(+foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews</div>
            </div>
            {errors && (
                <div className="create-booking-form-errors">{errors}</div>
            )}
            <div className="create-booking-form-inputs-container">
                <div className="create-booking-form-input">
                    <label htmlFor='startDate'>Check-in:</label>
                    <input
                        type="date"
                        className="create-booking-form-input-picker"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={today}
                        max={endDate}
                        required
                    />
                </div>
                <div className="create-booking-form-input">
                    <label htmlFor='startDate'>Check-out:</label>
                    <input
                        type="date"
                        className="create-booking-form-input-picker"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        required
                    />
                </div>
            </div>
            <button className="create-booking-submit-button" type="submit">Reserve</button>
            <div className="create-booking-form-disclaimer">Demo transaction. You won't be charged.</div>
            <div className="create-booking-form-footer-container">
                <div className="create-booking-form-footer">
                    <div>${Number(foundSpot.price).toFixed(2)} x {nightCounter(startDate, endDate)} nights</div>
                    <div>${feesCalculator(startDate, endDate, foundSpot.price).bookingFee}</div>
                </div>
                <div className="create-booking-form-footer">
                    <div>{'Cleaning fee (15%)'}</div>
                    <div>${feesCalculator(startDate, endDate, foundSpot.price).cleaningFee}</div>
                </div>
                <div className="create-booking-form-footer">
                    <div>{'Service fee (10%)'}</div>
                    <div>${feesCalculator(startDate, endDate, foundSpot.price).serviceFee}</div>
                </div>
                <div className="create-booking-form-footer-total">
                    <div className="total-price">Total</div>
                    <div className="total-price">${feesCalculator(startDate, endDate, foundSpot.price).total}</div>
                </div>
            </div>
        </form>
    );

    if (!foundSpot) return null;

    return (
        <div className="single-spot-details-page-container">
            <h2 className="single-spot-name">{foundSpot.name}</h2>
            <div className="single-spot-header-container">
                <h4 className="single-spot-header">
                    <i className="fa-solid fa-star"></i>{avgRatingFormat(+foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews · {foundSpot.city}, {foundSpot.state}, {foundSpot.country}
                    {(currentUser && foundSpot.ownerId === currentUser.id) && (
                    <div className="edit-and-delete-spot-buttons-container">
                        <div>
                            <OpenModalButton
                                buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                                modalComponent={<EditSpotForm spotId={spotId}/>}
                                className='edit-booking-button'
                            />
                        </div>
                        <div>
                            <OpenModalButton
                                buttonText={<i className="fa-regular fa-trash-can"></i>}
                                modalComponent={<DeleteSpotConfirmation spotId={spotId}/>}
                                className='edit-booking-button'
                            />
                        </div>
                    </div>
                    )}
                </h4>
            </div>
            <div className="single-spot-images">
                {foundSpot.SpotImages && (
                    foundSpot.SpotImages.map(image => (
                        <img src={image.url} alt={foundSpot.name} key={image.id} style={{borderRadius: 11, width: 1130, height: 560}}/>
                    ))
                )}
            </div>
            {foundSpot.ownerId === currentUser?.id ? (
                <div className="single-spot-description-owned">
                    <div className="single-spot-owner-and-price">
                        {foundSpot.Owner && (
                            <h2>Hosted by {foundSpot.Owner.firstName}</h2>
                        )}
                        <h2>${foundSpot.price} night</h2>
                    </div>
                    <p>{foundSpot.description}</p>
                </div>
            ) : (
                <div className="single-spot-description-not-owned">
                    <div className="spot-owner-and-price">
                        {foundSpot.Owner && (
                            <h2>Hosted by {foundSpot.Owner.firstName}</h2>
                        )}
                        <p>{foundSpot.description}</p>
                    </div>
                    <div>{createBookingForm}</div>
                </div>
            )}
            <div className="single-spot-reviews-container">
                <div className="single-spot-reviews-header">
                    <h2><i className="fa-solid fa-star"></i>{avgRatingFormat(+foundSpot.avgStarRating)} · {foundSpot.numReviews} reviews</h2>
                    {(currentUser && foundSpot.ownerId !== currentUser.id && (
                            !allReviews.find(review => review.userId === currentUser.id)
                    )) && (
                    <div className="create-review-button-container">
                        <OpenModalButton
                            buttonText='Write a review!'
                            modalComponent={<CreateReviewForm spotId={spotId}/>}
                            className='create-review-button'
                        />
                    </div>
                    )}
                </div>
                <AllReviewsComponent spotId={spotId}/>
            </div>
        </div>
    )
};

export default SingleSpotDetails;
