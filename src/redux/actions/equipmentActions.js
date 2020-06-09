import ItemActions from './itemActions';

const actions = new ItemActions(
  'equipments',
  'equipmentType',
  'equipmentTypes'
);

export default {
  loadAll: actions.loadAll.bind(actions),
  saveItem: actions.saveItem.bind(actions),
  deleteItem: actions.deleteItem.bind(actions),
};
