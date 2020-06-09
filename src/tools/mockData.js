const yeastTypes = [
  {
    name: 'Saf5',
    manufacturer: 'Safale',
    country: 'England',
    format: 'DRY',
    _links: {
      self: {
        href: 'http://localhost:8080/yeastTypes/14',
      },
      yeastType: {
        href: 'http://localhost:8080/yeastTypes/14',
      },
    },
  },
  {
    name: 'WLP400',
    manufacturer: 'WyEast',
    country: 'Belgium',
    format: 'LIQUID',
    _links: {
      self: {
        href: 'http://localhost:8080/yeastTypes/15',
      },
      yeastType: {
        href: 'http://localhost:8080/yeastTypes/15',
      },
    },
  },
];
const hopTypes = [
  {
    name: 'Cascade',
    manufacturer: 'US Hop Co',
    country: 'USA',
    format: 'PELLETS',
    _links: {
      self: {
        href: 'http://localhost:8080/hopTypes/10',
      },
      hopType: {
        href: 'http://localhost:8080/hopTypes/10',
      },
    },
  },
  {
    name: 'hallertau',
    manufacturer: 'Hops GMBH',
    country: 'Germany',
    format: 'PELLETS',
    _links: {
      self: {
        href: 'http://localhost:8080/hopTypes/11',
      },
      hopType: {
        href: 'http://localhost:8080/hopTypes/11',
      },
    },
  },
];
const hops = [
  {
    year: 2017,
    alpha: 3.7,
    grams: 90,
    boughtDate: '2020-05-29',
    comments: '',
    openedDate: null,
    hopType: {
      name: 'Cascade',
      manufacturer: 'US Hop Co',
      country: 'USA',
      format: 'PELLETS',
    },
    type: {
      name: 'Cascade',
      manufacturer: 'US Hop Co',
      country: 'USA',
      format: 'PELLETS',
    },
    _links: {
      self: {
        href: 'http://localhost:8080/hops/12',
      },
      hop: {
        href: 'http://localhost:8080/hops/12{?projection}',
        templated: true,
      },
      type: {
        href: 'http://localhost:8080/hops/12/type',
      },
    },
  },
  {
    year: 2018,
    alpha: 5.3,
    grams: 15,
    boughtDate: '2020-05-29',
    comments: '',
    openedDate: null,
    hopType: {
      name: 'hallertau',
      manufacturer: 'Hops GMBH',
      country: 'Germany',
      format: 'PELLETS',
    },
    _links: {
      self: {
        href: 'http://localhost:8080/hops/13',
      },
      hop: {
        href: 'http://localhost:8080/hops/13{?projection}',
        templated: true,
      },
      type: {
        href: 'http://localhost:8080/hops/13/type',
      },
    },
  },
];
const apiHops = { _embedded: { hops: hops } };
const newHop = { id: null, comments: '' };
module.exports = {
  hopTypes,
  hops,
  apiHops,
  newHop,
  yeastTypes,
};
