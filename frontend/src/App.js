import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsComponent from "./components/AllSpots";
import SingleSpotDetails from "./components/SingleSpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpotForm";
import CreateReviewForm from "./components/CreateReviewForm";

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
          <Route path='/spots/:spotId/write-a-review'>
            <CreateReviewForm />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpotDetails />
          </Route>
          <Route path='/create-spot'>
            <CreateSpotForm />
          </Route>
          <Route path='/edit-spot/:spotId'>
            <EditSpotForm />
          </Route>
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
