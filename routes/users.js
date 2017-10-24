const router = module.exports = require('express').Router()
const hash = require('../hash')
const users = [];


// Standard CRUD routes:
router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

function getAll(req, res, next) {
  res.json({ data: users })
}

function getOne(req, res, next) {
  const item = users.find(item => item.id === req.params.id)
  if (!item) return next({ status: 404, message: 'Item not found.' })
  res.status(200).json({ data: item })
}
function create(req, res, next) {
  // const { brand, name } = req.body
  // if (!brand || !name) return next({ status: 400, message: 'Could not create new item.' })
  const o = {...req.body, id: (Math.random() * 1000000)}
  users.push(o)
  res.status(201).json({ data: o })
}
function update(req, res, next) {
  const { id } = req.params
  const previous = users.findIndex(item => item.id === id)
  if (previous === -1) return next({ status: 404, message: 'Item not found.' })

  // const { brand, name } = req.body
  // if (!brand || !name) return next({ status: 400, message: 'Could not update existing item.' })

  users[previous] = { id: users[previous].id, brand, name }
  res.status(200).json({ data: users[previous] })
}

function remove(req, res, next) {
  const { id } = req.params
  const previous = users.findIndex(item => item.id === id)

  if (previous === -1) return next({ status: 404, message: 'Item not found.' })

  users.splice(previous, 1)
  res.status(204).json()
}
