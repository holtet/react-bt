import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';

const SelectInputProfiled = ({
  name,
  onChange,
  defaultOption,
  value,
  error,
  profile,
}) => {
  if (profile != null) {
    console.log(JSON.stringify(profile));
  }
  const optionDescriptor =
    profile == undefined
      ? undefined
      : profile.descriptor.find(
          (d) => (d.name = { name } && d.doc != undefined)
        );

  console.log(JSON.stringify(optionDescriptor));

  const options =
    optionDescriptor == null
      ? []
      : optionDescriptor.doc.value
          .split(',')
          .map((opt) => ({ text: opt, value: opt }));
  console.log(JSON.stringify(options));

  return (
    <SelectInput
      name={name}
      label={name}
      onChange={onChange}
      defaultOption={defaultOption}
      value={value}
      error={error}
      options={options}
    />
  );
};

SelectInputProfiled.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  profile: PropTypes.object,
};

export default SelectInputProfiled;
