import React from 'react';

import './PlaceList.css';
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from '../../shared/components/FormElements/Button';

function PlaceList(props) {
  if (props.items.length === 0)
    return <div className="place-list center">
      <Card>
        <h2>No places found. Do you want to add?</h2>
        <Button type="" to={`/places/new`}>Share place!</Button>
      </Card>
    </div>
  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          coordinates={place.location}
          creatorID={place.creator}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
