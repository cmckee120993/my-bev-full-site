import React, { useState } from 'react';
import './style.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {

    const [startDate, setStartDate] = useState(new Date(Date.now() + 604800000)); 

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !==1 && day !==3 && day !==5 && day !== 6;
      };
    

    return (
        <>
            <DatePicker
            className='date-picker'
                minDate={new Date(Date.now() + 604800000)}
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                filterDate={isWeekday}
            /> 
        </>

    )
};

export default Calendar;

