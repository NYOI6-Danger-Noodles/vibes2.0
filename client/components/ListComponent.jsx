import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

const ListComponent = ({ data, index }) => {
  const fish = data;
  console.log(fish);
  const [tags, setTags] = useState([]);
  const [ratings, setRatings] = useState(0);

  const savedRatesDB = async () => {
    const res = await fetch('/api/beenList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fish),
    });
  };
  const handleChange = (selectedOptions, actionMeta) => {
    if (actionMeta.name === 'tags') {
      const selectedValues = selectedOptions.map((option) => option.value);
      setTags([...new Set(selectedValues)]);
    }
  };
  const tagOptions = [
    { value: 'Good Coffee', label: 'Good Coffee' },
    { value: 'Strong Wifi', label: 'Strong Wifi' },
    { value: 'Quiet', label: 'Quiet' },
    { value: 'Social', label: 'Social' },
    { value: 'Clean Bathrooms', label: 'Clean Bathrooms' },
    { value: 'Abundant Outlets', label: 'Abundant Outlets' },
    { value: 'Outdoor Seating', label: 'Outdoor Seating' },
    { value: 'Parking', label: 'Parking' },
    { value: 'Printing and Scanning', label: 'Printing and Scanning' },
    { value: 'Meeting Rooms', label: 'Meeting Rooms' },
    { value: 'Functional Kitchen', label: 'Functional Kitchen' },
    { value: 'Lockers', label: 'Lockers' },
    { value: 'Green Space', label: 'Green Space' },
    { value: 'Water Cooler', label: 'Water Cooler' },
    { value: 'Free Coffee/Tea', label: 'Free Coffee/Tea' },
    { value: 'Snacks', label: 'Snacks' },
  ];
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{data.name}</td>
      <td>{data.neighborhood}</td>
      <td>{data.category}</td>
      <td>
        <button
          className="btn"
          onClick={() => {
            document.querySelector('#my_modal_3').showModal();
          }}
        >
          Rate
        </button>
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box h-96">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 overflow-y-hidden">
              ✕
            </button>
            <h3 className="font-bold text-lg">Rate My Vibe!</h3>
            <ReactSelect
              name="tags"
              options={tagOptions}
              value={tags.map((value) => ({ value, label: value }))}
              onChange={handleChange}
              isMulti
            />
            <div className="flex flex-col gap-y-5">
              <div className="rating rating-lg">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  onClick={(e) => setRatings(1)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  checked
                  onClick={(e) => setRatings(2)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  onClick={(e) => setRatings(3)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  onClick={(e) => setRatings(4)}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  onClick={(e) => setRatings(5)}
                />
              </div>
              <button
                onClick={(e) => savedRatesDB()}
                className="btn btn-primary h-10 w-12"
              >
                Save
              </button>
            </div>
          </form>
        </dialog>
      </td>
    </tr>
  );
};

export default ListComponent;
