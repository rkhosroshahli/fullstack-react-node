import React, { useState, useContext } from 'react';

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from '../../shared/context/auth-context';

import './PlaceItem.css';


function PlaceItem(props) {

  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);

  const [showConfirmModalDel, setShowConfirmModalDel] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const openDelWarningHandler = () => setShowConfirmModalDel(true);

  const cancelDelHandler = () => setShowConfirmModalDel(false);

  const confirmDelHandler = () => {
    cancelDelHandler();
    console.log("Delete in progress...");
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        header={props.address}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        header="Are you sure?"
        show={showConfirmModalDel}
        onCancel={cancelDelHandler}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={cancelDelHandler}>Cancel</Button>
            <Button onClick={confirmDelHandler}>Delete</Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place?
                </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__action">
            <Button inverse onClick={openMapHandler}>View on map</Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
            {auth.isLoggedIn && <Button danger onClick={openDelWarningHandler}>Delete</Button>}


          </div>
        </Card>
      </li>
    </>

  );
};

export default PlaceItem;
