import React from 'react';

import { useParams } from 'react-router-dom';
import PlaceList from "../components/PlaceList";

const PLACES = [
  {
    id: 'p1',
    image: 'https://images.kojaro.com/2020/9/75d0f4b7-67ba-4632-b6f9-95689f9c4093.jpg',
    title: 'Azadi Tower',
    description: 'Landmark tower with an underground museum, gallery & an observation deck with views of the city.',
    address: 'Tehran Province, Tehran, District 10, Azadi Square, Iran',
    location: {
      lat: 35.6997315,
      lng: 51.3380857
    },
    creatorID: 'u1'
  },
  {
    id: 'p2',
    image: 'https://mohajerist.com/wp-content/uploads/2021/03/milad.jpg',
    title: 'Milad Tower',
    description: '435m telecommunications tower opened in 2007, with an observation deck & a revolving restaurant.',
    address: 'Tehran, Tehran Province, Iran',
    location: {
      lat: 35.7448459,
      lng: 51.3731325
    },
    creatorID: 'u2'
  }
];

function UserPlaces(props) {

  const userID = useParams().userID;
  const loadedPlaces = PLACES.filter(place => place.creatorID === userID)

  return (
    <PlaceList items={loadedPlaces} />
  );
}

export default UserPlaces;
