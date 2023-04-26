import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookingsThunk } from "../../../store/bookings";
import SingleBookingCard from "../SingleBookingCard";


const AllBookingsComponent = () => {
    const dispatch = useDispatch();
    const allBookingsObj = useSelector(state => state.bookings)
    const allBookings = Object.values(allBookingsObj);

    useEffect(() => {
        dispatch(getMyBookingsThunk());
    }, [dispatch]);

    if (!allBookings || !allBookingsObj) return null;

    return (
        <div className="all-spots-container">
            {allBookings.sort((b, a) => new Date(b.startDate) - new Date(a.startDate)).map((booking) => (
                <SingleBookingCard
                    spotId={booking.spotId}
                    spot={booking.Spot}
                    booking={booking}
                />
            ))}
        </div>
    )
}

export default AllBookingsComponent;
