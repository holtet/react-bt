import * as types from './actionTypes';
import { ItemApi } from '../../api/itemApi';
import { TypeApi } from '../../api/typeApi';

class ItemActions {
  constructor(entity, itemType, itemTypeEntity) {
    this.entity = entity;
    this.itemType = itemType; //yeastType etc
    this.api = new ItemApi(entity, itemType);
    this.typeApi = new TypeApi(itemTypeEntity); //yeastTypes
  }

  loadAllSuccess(items) {
    return { type: types.LOAD_SUCCESS, entity: this.entity, items: items };
  }
  updateSuccess(item) {
    return { type: types.UPDATE_SUCCESS, entity: this.entity, item: item };
  }
  createSuccess(item) {
    return { type: types.CREATE_SUCCESS, entity: this.entity, item: item };
  }
  deleteSuccess(itemHref) {
    return {
      type: types.DELETE_SUCCESS,
      entity: this.entity,
      itemHref: itemHref,
    };
  }
  loadAll() {
    // console.log('this: ' + JSON.stringify(this));
    return async function (dispatch) {
      const items = await this.api.getAll();
      // console.log('Loaded all ' + JSON.stringify(items));
      // console.log('this: ' + JSON.stringify(this));

      // dispatch({
      //   type: types.LOAD_SUCCESS,
      //   entity: this.entity,
      //   items: items._embedded[this.entity],
      // });
      dispatch(this.loadAllSuccess(items._embedded[this.entity]));
    }.bind(this);
  }

  saveItem(item) {
    return async function (dispatch) {
      if (item._links) {
        console.log('Save updated item ' + JSON.stringify(item));
        const updatedItem = await this.api.update({
          ...item,
          typeName: undefined,
          [this.itemType]: undefined,
        });
        if (item.newItemType != undefined) {
          console.log('Change type to ' + item.newItemType);
          updatedItem._links[this.itemType].href = item.newItemType;
          this.api.update(item);
        }
        console.log('Got updated back ' + JSON.stringify(updatedItem));
        console.log('type url  updatedItem._links ' + this.itemType);

        this.typeApi
          .getType(updatedItem._links[this.itemType].href)
          .then((type) => {
            console.log('Setting type to ' + JSON.stringify(type));
            updatedItem[this.itemType] = type;
            dispatch(this.updateSuccess(updatedItem));
          });
      } else {
        console.log('Create new item ' + JSON.stringify(item));
        const newItem = await this.api.create(item);
        this.typeApi
          .getType(newItem._links[this.itemType].href)
          .then((type) => {
            newItem[this.itemType] = type;
            dispatch(this.createSuccess(newItem));
          });
      }
    }.bind(this);
  }

  deleteItem(item) {
    return function (dispatch) {
      this.api.delete(item).then(() => {
        dispatch(this.deleteSuccess(item._links.self.href));
      });
    }.bind(this);
  }
}

export default ItemActions;
