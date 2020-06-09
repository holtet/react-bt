import ItemTypeActions from './itemTypeActions';

const actions = new ItemTypeActions('equipmentTypes');

export default {
  loadAll: actions.loadAll.bind(actions),
  deleteItemType: actions.deleteItemType.bind(actions),
};
