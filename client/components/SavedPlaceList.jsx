import React, { useState, useEffect } from 'react';

const SavedPlaceList = ({ savedList }) => {
  const [savedPlaces, setSavedplaces] = useState([]);
  const savedPlaceList = savedList.map((el, index) => {
    console.log(el);
    return (
      <tr>
        <th>{index + 1}</th>
        <td>{el.name}</td>
        <td>{el.neighborhood}</td>
        <td>{el.category}</td>
        <td>
          <button className="btn btn-primary h-10 w-10">Rate</button>
        </td>
      </tr>
    );
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Neighborhood</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {savedPlaceList}
        </tbody>
      </table>
    </div>
  );
};

export default SavedPlaceList;
