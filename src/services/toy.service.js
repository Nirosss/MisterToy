import { utilService } from './util.service.js'
// import { storageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle","Outdoor"]
const TOY_LIST = 'toy-list'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

function query() {
  return storageService.queryWithDelay(TOY_LIST).then((toys) => {
    // console.log('toys:', toys)
    if (!toys || !toys.length) {
      toys = _createToys()
      storageService.postMany(TOY_LIST, toys)
    }
    return toys
  })
}

function save(toy) {
  return toy._id ? _update(toy) : _add(toy)
}

function _add(addedToy) {
  const newToy = _createToy(addedToy.txt)
  return storageService.post(TOY_LIST, newToy)
}

function _update(updatedToy) {
  updatedToy.modifiedAt = Date.now()
  return storageService.put(TOY_LIST, updatedToy)
}

function remove(toyId) {
  return storageService.remove(TOY_LIST, toyId)
}

function getById(toyId) {
  return storageService.get(TOY_LIST, toyId)
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels:'',
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

function _createToy(name,labels = ["Box game", "Art", "Baby"]) {
  return {
    _id: utilService.makeId(),
    name,
    price: 123,
    labels,
    createdAt: Date.now(),
    inStock: true,
  }
}
