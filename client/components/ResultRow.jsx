import React from 'react';
import { useState, createContext, useContext } from 'react';

const ResultRow = (props) => {
  const { place_name, category, address, neighborhood, photo } = props.result;

  const { categories, image, username, neighborhoods } = props;

  // add function that calls an endpoint to save the place

  //DN: removing hard coded "vibes", adding functionality to save the location details
  // along with the input of categories and neighborhood
  const saveToDB = async () => {
    const data = {
      address,
      name: place_name,
      category: categories[0],
      neighborhood: neighborhoods[0],
      photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyCcPpO8Oh7OERkSYaJMpHfRpkoNemUV73s`,
    };
    // console.log(data);
    const res = await fetch('/api/savedList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="card w-96 bg-base-500 shadow-xl">
      <figure>
        <img
          className="h-96 w-full"
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyCcPpO8Oh7OERkSYaJMpHfRpkoNemUV73s`}
          alt="Place Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{place_name}</h2>
        <p>{address}</p>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">{categories}</div>
        </div>
        <div className="card-actions justify-end">
          <button onClick={(e) => saveToDB(e)} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultRow;
