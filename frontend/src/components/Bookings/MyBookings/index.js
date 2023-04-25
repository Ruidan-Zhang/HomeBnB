import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookingsThunk } from "../../../store/bookings";


const AllBookingsComponent = () => {
    const dispatch = useDispatch();
    const allBookingsState = useSelector(state => state.bookings);
    const allBookingsObj = allBookingsState.userBookings;
    const allBookings = Object.values(allBookingsObj);

    useEffect(() => {
        dispatch(getMyBookingsThunk());
    }, [dispatch]);

    if (!allBookings || !allBookingsObj) return null;

    return (
        <div className="all-bookings-container">
            {allBookings.map((booking) => (
                <div>
                    {booking.Spot.name}
                    {booking.startDate} - {booking.endDate}
                </div>
            ))}
        </div>
    )
}

export default AllBookingsComponent;
