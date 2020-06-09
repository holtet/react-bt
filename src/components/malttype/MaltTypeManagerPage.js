import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/maltTypeActions';
import PropTypes from 'prop-types';
import ItemTypeForm from '../common/ItemTypeForm';
import { toast } from 'react-toastify';
import { maltType as maltTypeTemplate } from '../../tools/emptyObjects';
import Spinner from '../common/Spinner';

function MaltTypeManagerPage({
  items,
  loadItems,
  // profile,
  // getProfile,
  saveItem,
  history,
  ...props
}) {
  const [item, setItem] = useState({
    ...props.item,
  });

  useEffect(() => {
    if (items.length === 0) {
      loadItems().catch((error) => {
        toast.error('loading types failed  ' + error);
      });
    } else {
      setItem(props.item);
    }
    // if (profile == undefined) {
    //   getProfile();
    // } else {
    //   console.log('we have profile ' + JSON.stringify(profile));
    // }
  }, [props.item]);

  function handleSave(event) {
    event.preventDefault();
    saveItem(item);
    toast.success('Malt type was saved');
    history.push('/maltTypes');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    // console.log('Handle change ' + name + ' = ' + value);
    setItem((prevMaltDef) => ({ ...prevMaltDef, [name]: value }));
  }

  const fields = [
    { name: 'Name', field: 'name', type: 'text' },
    {
      name: 'EBC',
      field: 'ebc',
      type: 'number',
    },
    { name: 'Country', field: 'country', type: 'text' },
    { name: 'Manufacturer', field: 'manufacturer', type: 'text' },
  ];

  return items.length == 0 ? (
    <Spinner />
  ) : (
    <ItemTypeForm
      fields={fields}
      // profile={profile}
      item={item}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

MaltTypeManagerPage.propTypes = {
  items: PropTypes.array.isRequired,
  loadItems: PropTypes.func.isRequired,
  profile: PropTypes.object,
  // getProfile: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const index = ownProps.match.params.index;
  const item =
    index && state.items.maltTypes.length > 0
      ? state.items.maltTypes[index]
      : maltTypeTemplate;
  return {
    item: item,
    items: state.items.maltTypes,
    profile: state.profiles.maltTypes,
  };
}

const mapDispatchToProps = {
  loadItems: actions.loadAll,
  // getProfile: actions.getProfile,
  saveItem: actions.saveItemType,
  // deleteItem: actions.deleteMaltType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaltTypeManagerPage);
