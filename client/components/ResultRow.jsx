import React from 'react';

const ResultRow = (props) => {
    const { place_name, category, address, neighborhood } = props.result

    // add function that calls an endpoint to save the place

    return (
        <tr>
            <td>{place_name}</td>
            <td>{address}</td>
            <button>Save</button>
        </tr>
    );
}

export default ResultRow;