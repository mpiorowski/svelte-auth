migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23v4dwj9be5tm28")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23v4dwj9be5tm28")

  collection.listRule = null

  return dao.saveCollection(collection)
})
