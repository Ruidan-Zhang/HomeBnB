import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsComponent from "./components/Spots/AllSpots";
import SingleSpotDetails from "./components/Spots/SingleSpotDetails";
import AllBookingsComponent from "./components/Bookings/MyBookings";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpotsComponent />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpotDetails />
          </Route>
          <Route exact path='/my-bookings'>
            <AllBookingsComponent />
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
      {!isLoaded && (
        <h1>test</h1>
      )}
      <Footer />
    </>
  );
}

export default App;
