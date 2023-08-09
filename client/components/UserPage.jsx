import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import RatedPlaceList from './RatedPlacesList.jsx';
import SavedPlaceList from './SavedPlaceList.jsx';

//updating the listsLists to have to be components that we toggle
//

const UserPage = ({ username }) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [savedList, setSavedList] = useState([]);
  const [triedList, setTriedList] = useState([]);
  const [toggleView, setToggleView] = useState(false);
  const getSaved = async () => {
    try {
      //query userRouters/saved with username in body
      const response = await axios.get('/api/savedList');
      //server should return an array of saved places already queried for name
      if (response.status === 200) {
        //check if it's in response.data!!
        console.log(response.data);
        setSavedList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getTrys = async () => {
    try {
      //query userRouter/tried with username in body
      const response = await axios.get('/api/beenList', { username });
      //server should return an array of objects
      if (response.status === 200) {
        //check if it's in response.data!
        setTriedList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSaved();
    getTrys();
  }, []);

  return (
    <div>
      {/* add a button to navigate to the search page */}
      <div className="flex gap-4 place-content-center">
        <button
          onClick={(e) => {
            setToggleView(false);
          }}
          className="btn btn-primary"
        >
          Saved Places
        </button>
        <button
          onClick={(e) => {
            setToggleView(true);
          }}
          className="btn btn-primary"
        >
          Rated Places
        </button>
      </div>
      {toggleView ? (
        <RatedPlaceList />
      ) : (
        <SavedPlaceList savedList={savedList} />
      )}
      <div className="searchButton">
        <button className="button" onClick={() => navigate('/search')}>
          Go to Search Page
        </button>
      </div>
    </div>
  );
};
export default UserPage;
