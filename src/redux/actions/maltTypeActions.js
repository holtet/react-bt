import ItemTypeActions from './itemTypeActions';

const actions = new ItemTypeActions('maltTypes');

export default {
  loadAll: actions.loadAll.bind(actions),
  saveItemType: actions.saveItemType.bind(actions),
  deleteItemType: actions.deleteItemType.bind(actions),
  getProfile: actions.getProfile.bind(actions),
};
