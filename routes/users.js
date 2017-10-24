const router = module.exports = require('express').Router()
const hash = require('../hash')
const users = {}; // in memory; dummy data source


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
  const user = users.find(user => user.id === req.params.id)
  if (!user) return next({ status: 404, message: 'user not found.' })
  res.status(200).json({ data: user })
}
function create(req, res, next) {
  // const o = {...req.body, id: (Math.random() * 1000000)} 
  const o = req.body
  o.id = (Math.random() * 1000000)
  o.password = hash(o.password)
  users.push(o)
  res.status(201).json({ data: o })
}
function update(req, res, next) {
  const { id } = req.params
  const previous = users.findIndex(user => user.id === id)
  if (previous === -1) return next({ status: 404, message: 'user not found.' })

  users[previous] = { id: users[previous].id, brand, name }
  res.status(200).json({ data: users[previous] })
}

function remove(req, res, next) {
  const { id } = req.params
  const previous = users.findIndex(user => user.id === id)

  if (previous === -1) return next({ status: 404, message: 'user not found.' })

  users.splice(previous, 1)
  res.status(204).json()
}
