import { utilService } from './util.service.js'
import { httpService } from './http-service.js'
import { storageService } from './async-storage.service.js'

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]
const TOY_LIST = 'toy-list'
const TOY_URL = 'toy/'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

function query(filterBy) {
  console.log(filterBy)
  return httpService.get(TOY_URL, filterBy)
  
  // return storageService.queryWithDelay(TOY_LIST).then((toys) => {
  //   // console.log('toys:', toys)
  //   if (!toys || !toys.length) {
  //     toys = _createToys()
  //     storageService.postMany(TOY_LIST, toys)
  //   }
  //   return toys
  // })
}

function save(toy) {
  if (toy._id) return httpService.put(TOY_URL + toy._id, toy)
  return httpService.post(TOY_URL, toy)
  // return toy._id ? _update(toy) : _add(toy)
}

// function _add(addedToy) {
//   return storageService.post(TOY_LIST, addedToy)
// }

// function _update(updatedToy) {
//   updatedToy.modifiedAt = Date.now()
//   return storageService.put(TOY_LIST, updatedToy)
// }

function remove(toyId) {
  return httpService.delete(TOY_URL + toyId)
  // return storageService.remove(TOY_LIST, toyId)
}

function getById(toyId) {
  return httpService.get(TOY_URL + toyId)
  // return storageService.get(TOY_LIST, toyId)
}

function getEmptyToy() {
  return {
    name: '',
    inStock: true,
    price: 0,
    createdAt: Date.now(),
    labels: ['Doll', 'Battery Powered'],
    reviews: [],
  }
}

function _createToys() {
  return [
    _createToy('Toy computer'),
    _createToy('Race car'),
    _createToy('Lego'),
    _createToy('Robobot'),
    _createToy('Walk the dog'),
    _createToy('Water toys'),
  ]
}

function _createToy(name, labels = ['Box game', 'Art', 'Baby'], price = 123) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    createdAt: Date.now(),
    inStock: true,
  }
}
