import ItemTypeActions from './itemTypeActions';

const actions = new ItemTypeActions('yeastTypes');

export default {
  loadAll: actions.loadAll.bind(actions),
  deleteItemType: actions.deleteItemType.bind(actions),
};
