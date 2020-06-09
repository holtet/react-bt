import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import itemActions from '../../redux/actions/yeastActions';
import itemTypeActions from '../../redux/actions/yeastTypeActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
//import { loadHopTypes } from '../../redux/actions/hopTypeActions';
import { toast } from 'react-toastify';
import ItemForm from '../common/ItemForm';
import { yeast as yeastTemplate } from '../../tools/emptyObjects';

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function YeastManagerPage({
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
      console.log('Loading items');
      loadItems().catch((error) => {
        alert('loading items failed ' + error);
      });
    } else {
      setItem(props.item);
    }
    if (itemTypes.length === 0) {
      console.log('Loading itemTypes');
      loadItemTypes().catch((error) => {
        alert('loading itemTypes failed ' + error);
      });
    }
  }, [props.item, props.itemTypes]); //TODO: props.hopTypes => hopTypes??

  function formIsValid() {
    // const { grams, type, newHopDef } = item;
    // console.log('hopType' + JSON.stringify(type));
    const errors = {};
    // if (isNaN(grams)) errors.grams = 'Not a valid number';
    // if (!(type.name || newHopDef)) errors.type = 'Hop type is required';
    // setErrors(errors);
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
        toast.success('Yeast saved.');
        history.push('/yeasts');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log('Handle change ' + name + ' = ' + value);
    if (name == 'type') {
      if (value != '') {
        setItem((prevItem) => ({
          ...prevItem,
          newItemType: value,
          yeastType: itemTypes.find((h) => h._links.self.href == value),
        }));
      }
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  }

  const fields = [
    { name: 'Grams', field: 'grams', type: 'text' },
    { name: 'Packages', field: 'packages', type: 'text' },
    { name: 'Comments', field: 'comments', type: 'textArea' },
    {
      name: 'Package Date',
      field: 'packageDate',
      type: 'date',
      transform: (a) => (a == undefined ? undefined : new Date(a)),
    },
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
    { name: 'Description', field: 'description' },
    { name: 'Format', field: 'format', transform: (a) => capitalizeFirst(a) },
    { name: 'Manufacturer', field: 'manufacturer' },
  ];
  return itemTypes.length == 0 ? (
    <Spinner />
  ) : (
    <ItemForm
      itemTypes={itemTypes} //.filter((it) => it.name != item.yeastType.name)}
      itemType={item.yeastType}
      item={item}
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

YeastManagerPage.propTypes = {
  loadItems: PropTypes.func.isRequired,
  loadItemTypes: PropTypes.func.isRequired,
  saveItem: PropTypes.func.isRequired,
  itemTypes: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log('Map State to Props');
  console.log('itemTypes length:' + state.items.yeastTypes.length);
  console.log('items length:' + state.items.yeasts.length);
  //   debugger;
  const index = ownProps.match.params.index;
  const item =
    index && state.items.yeasts.length > 0
      ? state.items.yeasts[index]
      : yeastTemplate;
  return {
    item,
    items: state.items.yeasts,
    itemTypes: state.items.yeastTypes,
  };
}

const mapDispatchToProps = {
  loadItems: itemActions.loadAll,
  saveItem: itemActions.saveItem,
  loadItemTypes: itemTypeActions.loadAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(YeastManagerPage);
