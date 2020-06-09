import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import itemActions from '../../redux/actions/hopActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import itemTypeActions from '../../redux/actions/hopTypeActions';
import { toast } from 'react-toastify';
import ItemForm from '../common/ItemForm';
import { hop as hopTemplate } from '../../tools/emptyObjects';
import { itemWrapper } from '../common/ItemWrapper';

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function HopManagerPage({
  itemTypes,
  items,
  loadItems,
  loadItemTypes,
  saveItem,
  history,
  ...props
}) {
  const [item, setItem] = useState(props.item);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      console.log('Loading hops');
      loadItems().catch((error) => {
        alert('loading hops failed ' + error);
      });
    } else {
      setItem({ ...props.item });
    }
    if (itemTypes.length === 0) {
      console.log('Loading hopTypes');
      loadItemTypes().catch((error) => {
        alert('loading hopDefs failed ' + error);
      });
    }
  }, [props.item, props.itemTypes]); //TODO: props.hopTypes => hopTypes??

  function formIsValid() {
    const { grams, hopType, newItemType } = item;
    console.log('hopType' + JSON.stringify(hopType));
    const errors = {};
    if (isNaN(grams)) errors.grams = 'Not a valid number';
    if (!(hopType.name || newItemType)) errors.type = 'Hop type is required';
    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    console.log('Handle save');
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveItem(item)
      .then(() => {
        toast.success('Hop saved.');
        history.push('/hops');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log('Handle change ' + name + ' = ' + value);

    if (name == 'type' && value != '') {
      setItem((prevItem) => ({
        ...prevItem,
        newItemType: value,
        hopType: itemTypes.find((h) => h._links.self.href == value),
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  }

  const fields = [
    { name: 'Grams', field: 'grams', type: 'text' },
    { name: 'Year', field: 'year', type: 'text' },
    { name: 'Alpha', field: 'alpha', type: 'text' },
    { name: 'Comments', field: 'comments', type: 'textArea' },
    {
      name: 'Bought Date',
      field: 'boughtDate',
      type: 'date',
      transform: (a) => new Date(a),
    },
    {
      name: 'Opened Date',
      field: 'openedDate',
      type: 'date',
      transform: (a) => (a == undefined ? undefined : new Date(a)),
    },
  ];

  const typeFields = [
    { name: 'Name', field: 'name', link: true },
    { name: 'Country', field: 'country' },
    { name: 'Format', field: 'format', transform: (a) => capitalizeFirst(a) },
    { name: 'Manufacturer', field: 'manufacturer' },
  ];
  return itemTypes.length == 0 ? (
    <Spinner />
  ) : (
    <ItemForm
      itemTypes={itemTypes} //.filter((it) => it.name != item.hopType.name)}
      item={item}
      itemType={item.hopType}
      errors={errors}
      onChange={handleChange}
      fields={fields}
      typeFields={typeFields}
      typeOptionFormatter={(type) =>
        type.name + ' | ' + capitalizeFirst(type.format)
      }
      onSave={handleSave}
      saving={saving}
    />
  );
}

HopManagerPage.propTypes = {
  loadItems: PropTypes.func.isRequired,
  loadItemTypes: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  itemTypes: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const index = ownProps.match.params.index;
  const item =
    index && state.items.hops.length > 0
      ? state.items.hops[index]
      : hopTemplate;
  // console.log('Index: ' + index);
  // console.log('Hop year: ' + hop.year);
  // let hopType = { name: '' };
  // if (hop._links != undefined) {
  //   hopType = state.getHopType(hop._links.hopType.href);
  //   console.log('Fetched hopDef' + hopType);
  // }
  return {
    item,
    items: state.items.hops,
    itemTypes: state.items.hopTypes,
  };
}

const mapDispatchToProps = {
  loadItems: itemActions.loadAll,
  saveItem: itemActions.saveItem,
  loadItemTypes: itemTypeActions.loadAll,
};

export default itemWrapper(
  connect(mapStateToProps, mapDispatchToProps)(HopManagerPage)
);
