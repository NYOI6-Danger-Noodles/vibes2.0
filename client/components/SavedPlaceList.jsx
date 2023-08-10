import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent.jsx';

const SavedPlaceList = ({ savedList, handleRefresh }) => {
  // console.log(savedList);
  const ListComp = savedList.map((el, index) => {
    return (
      <ListComponent data={el} index={index} handleRefresh={handleRefresh} />
    );
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead className="border-b-4">
          <tr className="text-xl">
            <th></th>
            <th>Name</th>
            <th>Neighborhood</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody className="text-xl">
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
