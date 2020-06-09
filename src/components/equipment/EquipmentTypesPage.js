import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/equipmentTypeActions';
import PropTypes from 'prop-types';
import ErrorBoundary from '../common/ErrorBoundary';
import ItemsPageView from '../common/ItemsPageView';

function EquipmentTypesPage({ items, loadAll, deleteItem, ...props }) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      loadAll().catch((error) => {
        alert('loading equipment types failed ' + error);
      });
    }
  }, [props.items]);

  function handleDelete(item) {
    try {
      deleteItem(item);
    } catch (error) {
      console.log('Failed to delete ' + error.message);
      throw error;
    }
  }
  const fields = [
    { name: 'Name', field: 'name', link: true },
    { name: 'Manufacturer', field: 'manufacturer' },
  ];
  return (
    <ErrorBoundary>
      <ItemsPageView
        items={items}
        deleteItem={handleDelete}
        redirectToItemPage={redirect}
        itemPage="/equipmenttype"
        newItem={() => setRedirect(true)}
        fields={fields}
      />
    </ErrorBoundary>
  );
}

EquipmentTypesPage.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  loadAll: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    items: state.items.equipmentTypes,
  };
}

const mapDispatchToProps = {
  loadAll: actions.loadAll,
  deleteItem: actions.deleteItemType,
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentTypesPage);
