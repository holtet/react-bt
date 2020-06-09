import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import itemActions from '../../redux/actions/equipmentActions';
import itemTypeActions from '../../redux/actions/equipmentTypeActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import ItemForm from '../common/ItemForm';
import { equipment as equipmentTemplate } from '../../tools/emptyObjects';

function EquipmentManagerPage({
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
      setItem({ ...props.item });
    }
    if (itemTypes.length === 0) {
      console.log('Loading itemTypes');
      loadItemTypes().catch((error) => {
        alert('loading itemTypes failed ' + error);
      });
    }
  }, [props.item, props.itemTypes]);

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
        toast.success('Equipment saved.');
        history.push('/equipments');
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
        equipmentType: itemTypes.find((h) => h._links.self.href == value),
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  }

  const fields = [
    { name: 'Location', field: 'location', type: 'text' },
    { name: 'Amount', field: 'amount', type: 'text' },
    { name: 'Comments', field: 'comments', type: 'textArea' },
    {
      name: 'Bought Date',
      field: 'boughtDate',
      type: 'date',
      transform: (a) => new Date(a),
    },
  ];

  const typeFields = [
    { name: 'Name', field: 'name', link: true },
    { name: 'Description', field: 'description' },
    { name: 'Manufacturer', field: 'manufacturer' },
  ];

  return itemTypes.length == 0 ? (
    <Spinner />
  ) : (
    <ItemForm
      itemTypes={itemTypes}
      itemType={item.equipmentType}
      item={item}
      errors={errors}
      onChange={handleChange}
      fields={fields}
      typeFields={typeFields}
      typeOptionFormatter={(type) => type.name}
      onSave={handleSave}
      saving={saving}
    />
  );
}

EquipmentManagerPage.propTypes = {
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
  console.log('itemTypes length:' + state.items.equipmentTypes.length);
  console.log('items length:' + state.items.equipments.length);
  //   debugger;
  const index = ownProps.match.params.index;
  const item =
    index && state.items.equipments.length > 0
      ? state.items.equipments[index]
      : equipmentTemplate;
  return {
    item,
    items: state.items.equipments,
    itemTypes: state.items.equipmentTypes,
  };
}

const mapDispatchToProps = {
  loadItems: itemActions.loadAll,
  saveItem: itemActions.saveItem,
  loadItemTypes: itemTypeActions.loadAll,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentManagerPage);
