import React from 'react';

const ResultRow = (props) => {
  const { place_name, category, address, neighborhood } = props.result;
  const { categories, images } = props;

  // add function that calls an endpoint to save the place

  return (
    <div className="card w-96 bg-base-500 shadow-xl">
      <figure>
        <img src={images} alt="Shoes" />
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
