import React from 'react';
import Autocomplete from "react-google-autocomplete";

const AddressFormComp = () => {
const googleAPI = process.env.GOOGLE_API;
console.log(googleAPI);
  return (
    <>
    <Autocomplete 
    apiKey="AIzaSyAMCaxP6F-y0gi0RugCFluqm_9RT9TifAg"
    onPlaceSelected={(place) => {
      console.log(place);
    }}
  />
  </>
  );
};

export default AddressFormComp;