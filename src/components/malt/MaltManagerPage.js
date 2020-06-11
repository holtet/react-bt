import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import itemActions from '../../redux/actions/maltActions';
import itemTypeActions from '../../redux/actions/maltTypeActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import ItemForm from '../common/ItemForm';
import { malt as maltTemplate } from '../../tools/emptyObjects';

function MaltManagerPage({
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
  }, [props.item, props.itemTypes]);

  function formIsValid() {
    const errors = {};
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    console.log('Handle save');
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveItem(item)
      .then(() => {
        toast.success('Malt saved.');
        history.push('/malts');
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
          maltType: itemTypes.find((h) => h._links.self.href == value),
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
    { name: 'Description', field: 'description' },
    { name: 'Manufacturer', field: 'manufacturer' },
  ];
  return itemTypes.length == 0 ? (
    <Spinner />
  ) : (
    <ItemForm
      itemTypes={itemTypes}
      itemType={item.maltType}
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

MaltManagerPage.propTypes = {
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
  console.log('itemTypes length:' + state.items.maltTypes.length);
  console.log('items length:' + state.items.malts.length);

  const index = ownProps.match.params.index;
  const item =
    index && state.items.malts.length > 0
      ? state.items.malts[index]
      : maltTemplate;
  return {
    item,
    items: state.items.malts,
    itemTypes: state.items.maltTypes,
  };
}

const mapDispatchToProps = {
  loadItems: itemActions.loadAll,
  saveItem: itemActions.saveItem,
  loadItemTypes: itemTypeActions.loadAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(MaltManagerPage);
