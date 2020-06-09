import React from 'react';
import PropTypes from 'prop-types';

export function itemWrapper(ManagerPage) {
  return class A extends React.Component {
    propTypes = {
      item: PropTypes.object.isRequired,
      itemTypes: PropTypes.array.isRequired,
    };

    constructor(props) {
      console.log(JSON.stringify(props));

      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = { item: props.item, itemTypes: props.itemTypes };
    }

    handleChange(event) {
      const { name, value } = event.target;
      console.log('Handle change ' + name + ' = ' + value);

      //   if (name == 'type' && value != '') {
      //     setItem((prevItem) => ({
      //       ...prevItem,
      //       newItemType: value,
      //       hopType: itemTypes.find((h) => h._links.self.href == value),
      //     }));
      //   } else {
      //     setItem((prevItem) => ({
      //       ...prevItem,
      //       [name]: value,
      //     }));
      //   }
    }

    render() {
      return <ManagerPage {...this.props} />;
    }
  };
}
// to pass in: typeOptionFormatter?, hop, hopTypes as strings, redirect to page, form is valid?

itemWrapper.propTypes = {
  //   ManagerPage: PropTypes.object.isRequired,
  //   loadItems: PropTypes.func.isRequired,
  //   loadItemTypes: PropTypes.func.isRequired,
  //   saveItem: PropTypes.func.isRequired,
  itemTypes: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  //   items: PropTypes.array.isRequired,
  //   history: PropTypes.object.isRequired,
};
// export default ItemWrapper;
