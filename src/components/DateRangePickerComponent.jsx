import React, { useState, useRef, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import TextField from '@mui/material/TextField';
const DateRangePickerComponent = ({ onChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const inputRef = useRef(null);
    const pickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target) && showPicker) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
        setShowPicker(false);
        // Call the onChange callback with the selected date range
        onChange && onChange(ranges.selection);
    };

    const formatDateRange = () => {
        const startDate = dateRange[0].startDate.toDateString();
        const endDate = dateRange[0].endDate.toDateString();
        return `${startDate} to ${endDate}`;
    };

    const handleInputClick = () => {
        setShowPicker(true);
    };

    const handleInputChange = (event) => {
        // Update the input value with the entered date range
        const value = event.target.value;
        // Split the input value into start date and end date strings
        const [startDateString, endDateString] = value.split(' to ');
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            // If both dates are valid, update the date range state
            setDateRange([{ startDate, endDate, key: 'selection' }]);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
              <TextField
       
       label="Enter Date"
       sx={{width:"600px !important"}}
       value={formatDateRange()}
                onChange={handleInputChange}
                onClick={handleInputClick}
                ref={inputRef}
       variant="outlined"
       margin="normal"
     />
            {/* <input
                type="text"
                value={formatDateRange()}
                onChange={handleInputChange}
                onClick={handleInputClick}
                ref={inputRef}
                style={{ marginTop: '10px' }}
            /> */}
            {showPicker && (
                <div ref={pickerRef} style={{ position: 'absolute', zIndex: '999', top: '40px', left: '0' }}>
                    <DateRangePicker
                        showPreview={false}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        direction="horizontal"
                        className={'PreviewArea'}
                        editableDateInputs={true}
                    />
                </div>
            )}
        </div>
    );
};

export default DateRangePickerComponent;
