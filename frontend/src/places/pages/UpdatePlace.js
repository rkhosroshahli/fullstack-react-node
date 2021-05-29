import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hooks';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';

import './FormPlaces.css';

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

const UpdatePlace = (props) => {

  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  },
    false
  );

  const identifiedPlace = PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const formSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find any place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Loading...</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form ">
      <Input
        id="title"
        element="input"
        label="Title"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[
          VALIDATOR_MINLENGTH(5)
        ]}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid} onClick={formSubmitHandler}>
        Update Place
      </Button>
    </form>
  )
};

export default UpdatePlace;
