import React, { useState, useEffect } from 'react';

const RatedPlaceList = ({ beenList }) => {
  const places = beenList.map((el) => {
    const tags_el = el.tags.map((tag) => {
      return <div className="badge badge-outline">{tag}</div>;
    });
    return (
      <div className="card w-96 bg-base-500 shadow-xl">
        <figure>
          <img className="h-96 w-full" src={el.photo} alt="Place Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{el.name}</h2>
          <p>Rating: {el.score}</p>
          <p>{el.address}</p>
          <div className="card-actions justify-start">
            <div className="badge badge-outline">{el.category}</div>
          </div>
          <div className="card-actions justify-end">{tags_el}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {places}
    </div>
  );
};

export default RatedPlaceList;
