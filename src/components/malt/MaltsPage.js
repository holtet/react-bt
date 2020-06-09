import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/maltActions';
import PropTypes from 'prop-types';
import ItemsPageView from '../common/ItemsPageView';
import { date } from '../common/DateFormatter';

function MaltsPage({ items, loadAll, deleteItem, ...props }) {
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
      field: 'maltType',
      link: true,
      transform: (a) => a.name,
    },
    { name: 'Grams', field: 'grams', transform: (a) => a + ' g' },
    {
      name: 'Bought Date',
      field: 'boughtDate',
      transform: (a) => (a == undefined ? 'Unknown' : date(a)),
    },
    {
      name: 'Opened Date',
      field: 'openedDate',
      default: 'Unopened',
      transform: (a) => (a == undefined ? 'Unopened' : date(a)),
    },
  ];

  return (
    <ItemsPageView
      items={items}
      deleteItem={handleDelete}
      redirectToItemPage={redirect}
      itemPage="/malt"
      newItem={() => setRedirect(true)}
      fields={fields}
    />
  );
}

MaltsPage.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  loadAll: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  console.log(JSON.stringify(state));
  return {
    items: state.items.malts,
  };
}

const mapDispatchToProps = {
  loadAll: actions.loadAll,
  deleteItem: actions.deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(MaltsPage);
