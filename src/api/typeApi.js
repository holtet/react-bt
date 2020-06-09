import { handleResponse, handleError } from './apiUtils';

export class TypeApi {
  constructor(entity) {
    //, typeName
    this.profileUrl = `${process.env.API_URL}/profile/${entity}`;
    this.baseUrl = `${process.env.API_URL}/${entity}`;
    //    this.typeName = typeName;
  }

  async getAll() {
    console.log('Get ' + this.baseUrl);
    try {
      let response = await fetch(this.baseUrl);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }

  update(type) {
    // debugger;
    return fetch(type._links.self.href, {
      method: 'PUT', // PUT to update when id already exists.
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(type),
    })
      .then(handleResponse)
      .catch(handleError);
  }

  create(type) {
    return fetch(this.baseUrl, {
      method: 'POST', // POST for create
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(type),
    })
      .then(handleResponse)
      .catch(handleError);
  }

  delete(type) {
    console.log('Delete one ' + JSON.stringify(type));

    return fetch(type._links.self.href, { method: 'DELETE' })
      .then(handleResponse)
      .catch(handleError);
  }

  getType(typeHref) {
    console.log('Get ' + typeHref);
    return fetch(typeHref, { method: 'GET' })
      .then(handleResponse)
      .catch(handleError);
  }

  updateLinkedType(item) {
    console.log(
      'Update linked Type on ' +
        item._links.self.href +
        ' to ' +
        item.newTypeDef
    );
    return fetch(item._links.self.href + this.typeName, {
      method: 'PUT',
      headers: { 'content-type': 'text/uri-list' },
      body: item.newTypeDef,
    })
      .then(handleResponse)
      .then(() => {
        return item;
      })
      .catch(handleError);
  }

  getProfile() {
    console.log('Get ' + this.profileUrl);
    return fetch(this.profileUrl, { method: 'GET' })
      .then(handleResponse)
      .catch(handleError);
  }
}
