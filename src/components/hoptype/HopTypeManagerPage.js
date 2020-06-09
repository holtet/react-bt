import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/hopTypeActions';
import PropTypes from 'prop-types';
// import HopTypeForm from './HopTypeForm';
import { toast } from 'react-toastify';
import { hopType as hopTypeTemplate } from '../../tools/emptyObjects';
import Spinner from '../common/Spinner';
import ItemTypeForm from '../common/ItemTypeForm';

function HopTypeManagerPage({
  items,
  loadItems,
  profile,
  getProfile,
  // formatOptions,
  saveItem,
  history,
  ...props
}) {
  const [item, setItem] = useState({
    ...props.item,
  });
  // const [formatOptions, setFormatOptions] = useState(props.formatOptions);

  useEffect(() => {
    if (items.length === 0) {
      loadItems().catch((error) => {
        toast.error('loading types failed  ' + error);
      });
    } else {
      setItem(props.item);
    }
    if (profile == undefined) {
      getProfile();
    } else {
      console.log('we have profile ' + JSON.stringify(profile));
    }
  }, [props.item, props.profile, props.formatOptions]);

  function handleSave(event) {
    event.preventDefault();
    saveItem(item);
    toast.success('Hop type was saved');
    history.push('/hopTypes');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    // console.log('Handle change ' + name + ' = ' + value);
    setItem((prevMaltDef) => ({ ...prevMaltDef, [name]: value }));
  }

  function getFormatProfile() {
    return profile;
  }
  function getFormatOptions() {
    if (profile == undefined) {
      return [];
    }

    const optionDescriptor = profile.descriptor.find(
      (d) => d.name == 'format' && d.doc != undefined
    );

    console.log('optionDescriptor: ' + JSON.stringify(optionDescriptor));

    const formatOptions =
      optionDescriptor == null
        ? []
        : optionDescriptor.doc.value
            .split(',')
            .map((opt) => ({ text: opt, value: opt }));
    console.log('formatOptions: ' + JSON.stringify(formatOptions));
    return formatOptions;
  }

  const fields = [
    { name: 'Name', field: 'name', type: 'text' },
    { name: 'Country', field: 'country', type: 'text' },
    { name: 'Manufacturer', field: 'manufacturer', type: 'text' },
    {
      name: 'Format',
      field: 'format',
      type: 'selectProfiled',
      getProfile: getFormatProfile,
      profile: profile,
      //      options: formatOptions,
      //      defaultOption: (item) => item.format,
    },
    {
      name: 'Format2',
      field: 'format',
      type: 'select',
      //      getProfile: getFormatProfile,
      // profile: profile,
      profileOptions: getFormatOptions,
      //      options: formatOptions,
      //      defaultOption: (item) => item.format,
    },
  ];
  return items.length == 0 || profile == undefined ? (
    <Spinner />
  ) : (
    <ItemTypeForm
      fields={fields}
      item={item}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

HopTypeManagerPage.propTypes = {
  items: PropTypes.array.isRequired,
  loadItems: PropTypes.func.isRequired,
  profile: PropTypes.object,
  formatOptions: PropTypes.array,
  getProfile: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const index = ownProps.match.params.index;
  const item =
    index && state.items.hopTypes.length > 0
      ? state.items.hopTypes[index]
      : hopTypeTemplate;
  const profile = state.profiles.hopTypes;
  const formatOptions = undefined;
  if (profile != undefined) {
    const optionDescriptor = profile.descriptor.find(
      (d) => d.name == 'format' && d.doc != undefined
    );

    console.log('optionDescriptor: ' + JSON.stringify(optionDescriptor));

    const formatOptions =
      optionDescriptor == null
        ? []
        : optionDescriptor.doc.value
            .split(',')
            .map((opt) => ({ text: opt, value: opt }));
    console.log('formatOptions: ' + JSON.stringify(formatOptions));
  }
  return {
    item,
    items: state.items.hopTypes,
    profile, //: state.profiles.hopTypes,
    formatOptions,
  };
}

const mapDispatchToProps = {
  loadItems: actions.loadAll,
  getProfile: actions.getProfile,
  saveItem: actions.saveItemType,
  // deleteItem: actions.deleteHopType,
};

export default connect(mapStateToProps, mapDispatchToProps)(HopTypeManagerPage);
