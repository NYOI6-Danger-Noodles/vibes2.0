import React from 'react';

const ResultRow = (props) => {
  const { place_name, category, address, neighborhood, photo } = props.result;
  console.log(photo);
  const { categories, image } = props;

  // add function that calls an endpoint to save the place

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
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ResultRow;
