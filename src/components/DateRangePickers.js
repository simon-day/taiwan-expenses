import React from 'react';
import DatePicker from 'react-datepicker';

const DateRangePickers = props => {
  return (
    <>
      <div className="col s6">
        <DatePicker
          withPortal
          placeholderText="Select start date"
          dateFormat="dd/MM"
          selected={props.startDate}
          onChange={date => props.setStartDate(date)}
          todayButton="Go To Today"
        />
      </div>
      <div className="col s6">
        <DatePicker
          withPortal
          placeholderText="Select end date"
          dateFormat="dd/MM"
          selected={props.endDate}
          onChange={date => props.setEndDate(date)}
          todayButton="Go To Today"
        />
      </div>
    </>
  );
};

export default DateRangePickers;
