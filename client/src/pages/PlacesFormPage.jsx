import { useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  async function addNewPlace(ev) {
    ev.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescrpition(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescrpition(description)}
      </>
    );
  }
  return (
    <div>
      <AccountNav />
      <form className="" onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lonely app"
        />
        {preInput("Address", "Address for this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="adress"
        />
        {preInput("Photos", "Photos with your place")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput(
          "Extra info",
          "Extra informations about the place ex. house rules, etc..."
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check in & out times, max guests",
          "Add checkin and out times, remember to have some time for cleaning the rooms"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="mt-2 -mb-1">
            <h3>Check in Time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out Time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="12"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max size</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="1"
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}