import ItemTypeActions from './itemTypeActions';

const actions = new ItemTypeActions('hopTypes');

export default {
  loadAll: actions.loadAll.bind(actions),
  deleteItemType: actions.deleteItemType.bind(actions),
  saveItemType: actions.saveItemType.bind(actions),
  getProfile: actions.getProfile.bind(actions),
};
