import React from 'react';
import Autocomplete from "react-google-autocomplete";

const AddressFormComp = () => {
const googleAPI = process.env.GOOGLE_API;
console.log(googleAPI);
  return (
    <>
    <Autocomplete 
    apiKey={googleAPI}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
  />
  </>
  );
};

export default AddressFormComp;