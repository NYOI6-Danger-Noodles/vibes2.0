import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent.jsx';

const SavedPlaceList = ({ savedList }) => {
  // console.log(savedList);
  const ListComp = savedList.map((el, index) => {
    return <ListComponent data={el} index={index} />;
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
          {ListComp}
        </tbody>
      </table>
    </div>
  );
};

export default SavedPlaceList;

{
  /* <button
onClick={(e) =>
  savedRatedDB({
    name: el.name,
    neighborhood: el.neighborhood,
    category: el.category,
  })
}
className="btn btn-primary h-10 w-10"
>
Rate
</button> */
}
