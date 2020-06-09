import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.API_URL + '/logEntries/';
// const entity = 'Malt';

// export function getMaltLogEntries(id) {
//   return fetch(
//     `${baseUrl}search/findByEntityAndEntityId?entity=${entity}&entityId=${id}`
//   )
//     .then(handleResponse)
//     .catch(handleError);
// }
export function getLogEntries(href) {
  return fetch(`${baseUrl}search/findByHref?href=${href}`)
    .then(handleResponse)
    .catch(handleError);
}
