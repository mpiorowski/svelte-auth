migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23v4dwj9be5tm28")

  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23v4dwj9be5tm28")

  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
