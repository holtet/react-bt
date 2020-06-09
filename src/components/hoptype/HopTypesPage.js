import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/hopTypeActions';
import PropTypes from 'prop-types';
import ErrorBoundary from '../common/ErrorBoundary';
import ItemsPageView from '../common/ItemsPageView';

function HopTypesPage({ items, loadAll, deleteItem, ...props }) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      loadAll().catch((error) => {
        alert('loading hop types failed ' + error);
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
        itemPage="/hoptype"
        newItem={() => setRedirect(true)}
        fields={fields}
      />
    </ErrorBoundary>
  );
}

HopTypesPage.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  loadAll: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    items: state.items.hopTypes,
  };
}

const mapDispatchToProps = {
  loadAll: actions.loadAll,
  deleteItem: actions.deleteItemType,
};

export default connect(mapStateToProps, mapDispatchToProps)(HopTypesPage);
