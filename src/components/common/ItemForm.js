import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import LogOverlay from '../common/LogOverlay';
import DatePick from '../common/DatePicker';
import { getLogEntries } from '../../api/logApi';
import TextAreaInput from '../common/TextAreaInput';

const ItemForm = ({
  item,
  itemType,
  itemTypes,
  onSave,
  onChange,
  saving = false,
  errors = {},
  fields,
  typeFields,
  typeOptionFormatter,
}) => {
  const [style, setStyle] = useState({ width: 0 });
  const [log, setLog] = useState([]);

  const loadLog = () => {
    getLogEntries(item._links.self.href).then((entries) =>
      setLog(entries._embedded.logEntries)
    );
  };

  const openNav = () => {
    loadLog();
    setStyle({ width: '75%' });
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
    document.addEventListener('click', closeNav);
  };

  const closeNav = () => {
    document.removeEventListener('click', closeNav);
    setStyle({ width: 0 });
    document.body.style.backgroundColor = '#F3F3F3';
  };
  const getField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextInput
            key={field.field}
            name={field.field}
            label={field.name}
            value={
              item[field.field] == undefined
                ? undefined
                : item[field.field].toString()
            }
            onChange={onChange}
            error={errors[field.name]}
          />
        );
      case 'textArea':
        return (
          <TextAreaInput
            key={field.field}
            name={field.field}
            label={field.name}
            value={item[field.field].toString()}
            onChange={onChange}
            error={errors[field.name]}
          />
        );
      case 'date':
        return (
          <DatePick
            key={field.field}
            name={field.field}
            label={field.name}
            startDate={field.transform(item[field.field])}
            onChange={onChange}
            error={errors[field.name]}
          />
        );
    }
  };

  return (
    <div>
      <LogOverlay log={log} style={style} closeNav={closeNav} />
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Edit item</div>
            <div className="card-body">
              <form onSubmit={onSave}>
                {errors.onSave && (
                  <div className="alert alert-danger" role="alert">
                    {errors.onSave}
                  </div>
                )}

                {fields.map((field) => getField(field))}

                <SelectInput
                  name="type"
                  label="Type"
                  onChange={onChange}
                  error={errors.type}
                  options={itemTypes
                    .filter((it) => it.name != itemType.name)
                    .map((it) => ({
                      text: typeOptionFormatter(it),
                      value: it._links.self.href,
                    }))}
                  defaultOption={
                    itemType == undefined ? '' : typeOptionFormatter(itemType)
                  }
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header">Type</div>
            <div className="card-body bg-light">
              <table className="table table-sm">
                <tbody>
                  {typeFields.map((field) => (
                    <tr key={field.name}>
                      <td>{field.name}</td>
                      <td>
                        {field.transform
                          ? field.transform(itemType[field.field])
                          : itemType[field.field]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="btn btn-primary" onClick={openNav}>
            Log
          </button>
        </div>
      </div>
    </div>
  );
};

ItemForm.propTypes = {
  item: PropTypes.object.isRequired,
  itemType: PropTypes.object.isRequired,
  itemTypes: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  typeFields: PropTypes.array.isRequired,
  typeOptionFormatter: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  //   onChangeBoughtDate: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ItemForm;
