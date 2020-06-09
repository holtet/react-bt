import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ItemsPageView = ({
  items,
  newItem,
  deleteItem,
  redirectToItemPage,
  itemPage,
  fields,
}) => (
  <>
    {redirectToItemPage && <Redirect to={itemPage} />}
    <table className="table table-sm">
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.name}>{field.name}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          return (
            <tr key={item._links.self.href}>
              {fields.map((field) => {
                let a = field.transform
                  ? field.transform(item[field.field])
                  : item[field.field] || field.default;
                return (
                  <td key={item._links.self.href + field.name}>
                    {field.link ? (
                      <Link to={`${itemPage}/${index}`}>{a}</Link>
                    ) : (
                      a
                    )}
                  </td>
                );
              })}
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => submit(() => deleteItem(item))}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <button
      style={{ marginBottom: 20 }}
      className="btn btn-primary"
      onClick={newItem}
    >
      Add
    </button>
  </>
);

const submit = (func) => {
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => func(),
      },
      {
        label: 'No',
        onClick: () => {
          return false;
        },
      },
    ],
  });
};

ItemsPageView.propTypes = {
  items: PropTypes.array.isRequired,
  newItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  redirectToItemPage: PropTypes.bool.isRequired,
  itemPage: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
};

export default ItemsPageView;
