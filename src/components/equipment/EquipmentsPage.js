import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/equipmentActions';
import PropTypes from 'prop-types';
import ItemsPageView from '../common/ItemsPageView';

function EquipmentsPage({ items, loadAll, deleteItem, ...props }) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (items.length == 0) {
      loadAll().catch((error) => {
        alert('loading items failed ' + error);
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
    {
      name: 'Name',
      field: 'equipmentType',
      link: true,
      transform: (a) => a.name,
    },
    { name: 'Amount', field: 'amount' },
  ];

  return (
    <ItemsPageView
      items={items}
      deleteItem={handleDelete}
      redirectToItemPage={redirect}
      itemPage="/equipment"
      newItem={() => setRedirect(true)}
      fields={fields}
    />
  );
}

EquipmentsPage.propTypes = {
  loadAll: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  console.log(JSON.stringify(state));
  return {
    items: state.items.equipments,
  };
}

const mapDispatchToProps = {
  loadAll: actions.loadAll,
  deleteItem: actions.deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentsPage);
