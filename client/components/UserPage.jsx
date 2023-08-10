import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import RatedPlaceList from './RatedPlacesList.jsx';
import SavedPlaceList from './SavedPlaceList.jsx';
import NavBar from './NavBar.jsx';

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
        setSavedList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getTrys = async () => {
    try {
      //query userRouter/tried with username in body
      const response = await fetch('/api/beenLists', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const formatted_res = await response.json();
      // console.log(formatted_res);
      //server should return an array of objects

      //check if it's in response.data!
      setTriedList(formatted_res.beenPlaces);
      // console.log(triedList[0].photo);
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
      <NavBar />
      <div className='flex gap-4 place-content-center mb-5'>
        <button
          onClick={(e) => {
            setToggleView(false);
          }}
          className='btn bg-fuchsia-500 hover:bg-violet-500 text-white'
        >
          Saved Places
        </button>
        <button
          onClick={(e) => {
            setToggleView(true);
          }}
          className='btn bg-fuchsia-500 hover:bg-violet-500 text-white text-l'
        >
          Rated Places
        </button>
      </div>
      {toggleView ? (
        <RatedPlaceList beenList={triedList} />
      ) : (
        <SavedPlaceList savedList={savedList} />
      )}
      <div className='btn h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-screen mt-5 py-2 place-content-center mx-auto h-5 rounded-full text-white'>
        <button className='button text-2xl' onClick={() => navigate('/search')}>
          Go to Search Page
        </button>
      </div>
    </div>
  );
};
export default UserPage;
