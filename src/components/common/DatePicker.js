import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';

import nb from 'date-fns/locale/nb';

const DatePick = ({ name, label, startDate, onChange }) => {
  registerLocale('nb', nb);
  let wrapperClass = 'form-group';
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <DatePicker
          locale="nb"
          dateFormat="dd.MM.yyyy"
          className="form-control"
          selected={startDate}
          //   onChange={(valu) => onChange({ target: { name, value: valu } })}
          onChange={(newDate) => onChange({ target: { name, value: newDate } })}
        />
      </div>
    </div>
  );
};

DatePick.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  //setStartDate: PropTypes.func.isRequired,
};

export default DatePick;
