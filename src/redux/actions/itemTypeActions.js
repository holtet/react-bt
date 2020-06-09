import { TypeApi } from '../../api/typeApi';
import * as types from './actionTypes';

class ItemTypeActions {
  constructor(entity) {
    this.entity = entity; //yeastType etc
    //    this.itemType = itemType; //yeastType etc
    this.api = new TypeApi(entity);
  }

  clearError() {
    return {
      type: types.CLEAR_ERROR,
    };
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
  deleteError(error) {
    return {
      type: types.DELETE_ERROR,
      entity: this.entity,
      err: error,
    };
  }
  loadProfileSuccess(profile) {
    return {
      type: types.LOAD_PROFILE_SUCCESS,
      entity: this.entity,
      profile: profile,
    };
  }

  loadAll() {
    //  console.log('this: ' + JSON.stringify(this));
    return async function (dispatch) {
      const items = await this.api.getAll();
      // console.log('Loaded all ' + JSON.stringify(items));
      // console.log('this: ' + JSON.stringify(this));

      dispatch({
        type: types.LOAD_SUCCESS,
        entity: this.entity,
        items: items._embedded[this.entity],
      });
    }.bind(this);
  }

  deleteItemType(item) {
    return function (dispatch) {
      this.api
        .delete(item)
        .then(() => {
          dispatch(this.deleteSuccess(item._links.self.href));
        })
        .catch((error) => {
          dispatch(this.deleteError('Got error back from server ' + error));
          setTimeout(() => dispatch(this.clearError()), 2000);
        });
    }.bind(this);
  }

  saveItemType(item) {
    return function (dispatch) {
      //    debugger;
      if (item._links) {
        this.api.update(item).then((updatedItem) => {
          console.log('Got object back from update ' + updatedItem);
          dispatch(this.updateSuccess(updatedItem));
        });
      } else {
        this.api.createMaltDefinition(item).then((newItem) => {
          // console.log('Got object back from create ' + newMaltDefinition._links);
          // debugger;
          dispatch(this.createSuccess(newItem));
        });
      }
    };
  }

  getProfile() {
    return function (dispatch) {
      let a = this.api.getProfile();
      return a
        .then((profile) => {
          // debugger;
          console.log('Got profile ' + JSON.stringify(profile));
          // console.log('Got malts2 ' + malts._embedded.malts);
          dispatch(
            this.loadProfileSuccess(
              profile.alps.descriptor.find(
                (d) => (d.id = this.entity + '-representation')
              )
            )
          );
        })
        .catch((error) => {
          throw error;
        });
    }.bind(this);
  }
}

export default ItemTypeActions;
