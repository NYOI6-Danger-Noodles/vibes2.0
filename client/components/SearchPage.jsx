import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import ResultRow from './ResultRow.jsx';

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  // const [tags, setTags] = useState([]);
  const [results, setResults] = useState([]);
  const [images, setimages] = useState('');
  const rows = [];

  const handleChange = (selectedOptions, actionMeta) => {
    if (actionMeta.name === 'categories') {
      const selectedValues = selectedOptions.map((option) => option.value);
      setCategories([...new Set(selectedValues)]);
    } else if (actionMeta.name === 'neighborhoods') {
      const selectedValues = selectedOptions.map((option) => option.value);
      setNeighborhoods([...new Set(selectedValues)]);
    }
  };

  const querySQL = () => {
    const toQuery = {
      categories: categories,
      neighborhoods: neighborhoods,
    };

    const requestBody = JSON.stringify(toQuery);

    fetch('api/placeSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((output) => {
        setResults(output.searchResults);
        setimages(output.photo);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const categoriesOptions = [
    { value: 'Brewery', label: 'Brewery' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Cafe', label: 'Cafe' },
    { value: 'Library', label: 'Library' },
    { value: 'Park', label: 'Park' },
    { value: 'Coworking Space', label: 'Coworking Space' },
  ];
  const neighborhoodOptions = [
    { value: 'Battery Park City', label: 'Battery Park City' },
    { value: 'Chelsea', label: 'Chelsea' },
    { value: 'City Hall', label: 'City Hall' },
    { value: 'Clinton Hill', label: 'Clinton Hill' },
    { value: 'East Harlem', label: 'East Harlem' },
    { value: 'East Village', label: 'East Village' },
    { value: 'West Village', label: 'West Village' },
    { value: 'Gramercy Park', label: 'Gramercy Park' },
    { value: 'Hamilton Heights', label: 'Hamilton Heights' },
    { value: 'Harlem', label: 'Harlem' },
    { value: 'Lower East Side', label: 'Lower East Side' },
    { value: 'Meatpacking District', label: 'Meatpacking District' },
    { value: 'Midtown East', label: 'Midtown East' },
    { value: 'Midtown West', label: 'Midtown West' },
    { value: 'Morningside Heights', label: 'Morningside Heights' },
    { value: 'Murray Hill', label: 'Murray Hill' },
    { value: 'Noho/Soho', label: 'Noho/Soho' },
    { value: 'Theater District', label: 'Theater District' },
    { value: 'Tribeca', label: 'Tribeca' },
    { value: 'Upper East Side', label: 'Upper East Side' },
    { value: 'Upper West Side', label: 'Upper West Side' },
    { value: 'Wall Street', label: 'Wall Street' },
    { value: 'Washington Heights', label: 'Washington Heights' },
    { value: 'Park Slope', label: 'Park Slope' },
  ];
  const tagOptions = [
    { value: 'Good Coffee', label: 'Good Coffee' },
    { value: 'Strong Wifi', label: 'Strong Wifi' },
    { value: 'Quiet', label: 'Quiet' },
    { value: 'Social', label: 'Social' },
    { value: 'Clean Bathrooms', label: 'Clean Bathrooms' },
    { value: 'Abundant Outlets', label: 'Abundant Outlets' },
    { value: 'Outdoor Seating', label: 'Outdoor Seating' },
    { value: 'Big Group Friendly', label: 'Big Group Friendly' },
  ];

  return (
    <div className="searchContainer">
      <h1>Guide</h1>
      <div className="filterBar">
        <label>Category</label>
        <ReactSelect
          name="categories"
          options={categoriesOptions}
          value={categories.map((value) => ({ value, label: value }))}
          onChange={handleChange}
          isMulti
        />
        <label>Neighborhood</label>
        <ReactSelect
          name="neighborhoods"
          options={neighborhoodOptions}
          value={neighborhoods.map((value) => ({ value, label: value }))}
          onChange={handleChange}
          isMulti
        />
        {/* <label>Tags</label>
                    <ReactSelect name='tags' options={tagOptions} value={tags.map(value => ({ value, label: value }))} onChange={handleChange} isMulti/> */}
        <button onClick={querySQL}>Find!</button>
      </div>
      <div className="ml-5 grid grid-cols-4 gap-1">
        {results.map((result, index) => (
          <ResultRow
            key={index}
            result={result}
            images={images}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
