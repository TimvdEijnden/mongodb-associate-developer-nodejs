# CRUD Operations (51%)

## Basic CRUD Operations

### Create Operations

- `insertOne()`: Insert a single document
- `insertMany()`: Insert multiple documents
- Write concern options control acknowledgment level
- New documents can be added to existing collections as long as they have unique _id values
- Documents must be less than 16MB in size

### Read Operations

- `find()`: Retrieve documents matching a query
- `findOne()`: Retrieve first matching document
- `find().toArray()`: Convert cursor to array of all matching documents
- `countDocuments()`: Count number of documents matching query
    - Returns the count of documents that match the query
    - Syntax: `countDocuments(filter, options)`
    - Filter: Specifies selection criteria using query operators
    - Options:
        - `limit`: Limits the count to a specified number of documents
        - `skip`: Skips a specified number of documents
        - `hint`: Forces use of a specific index
        - `maxTimeMS`: Maximum time to allow operation to run
    - Example:
    -
    ```js
    collection.countDocuments({ age: { $gt: 21 } }) // Count users over 21
    collection.countDocuments({ status: "active" }, { limit: 100 }) // Count first 100 active users
    ```
    - Returns a Promise that resolves to the count
    - More accurate than estimatedDocumentCount() but slower for large collections
- `estimatedDocumentCount()`: Get estimated count of documents in collection
    - Returns estimated count of all documents in collection
    - Faster than countDocuments() but less accurate
    - Does not support query filter
    - Options:
        - `maxTimeMS`: Maximum time to allow operation to run
    - Example:
      ```js
      collection.estimatedDocumentCount() // Get quick estimate of total documents
      ```

### Cursor Sort Operations

- `sort()`: Controls the order of documents returned
- Sort values: 1 for ascending, -1 for descending
- Single field sort:
  ```js
  collection.find().sort({ age: 1 }) // Sort by age ascending
  ```
- Multiple field sort:
  ```js
  collection.find().sort({ age: -1, name: 1 }) // Sort by age descending, then name ascending
  ```
- Cursor methods: `sort()`, `limit()`, `skip()`

### Cursor limit Operations

- `limit()`: Limits the number of documents returned
- `skip()`: Skips a specified number of documents
- Pagination example:
  ```js
  collection.find().skip(10).limit(5) // Skip first 10, limit to next 5
  ```
- `forEach()`: Iterate over each document in cursor
- `map()`: Transform each document in cursor
- `toArray()`: Convert cursor to array of documents
- `next()`: Get next document in cursor
- `hasNext()`: Check if cursor has more documents
- `close()`: Close the cursor
- `rewind()`: Reset cursor to first document
- `isExhausted()`: Check if cursor has been fully iterated
- `isDead()`: Check if cursor is closed or exhausted
- `isClosed()`: Check if cursor is closed
- `isAlive()`: Check if cursor is still open
- `isNotExhausted()`: Check if cursor has more documents
- `isNotClosed()`: Check if cursor is not closed
- `isNotAlive()`: Check if cursor is not open
- `isNotDead()`: Check if cursor is not exhausted

### Using Limit with Sort

- `limit()` can be used with `sort()` to control the number of documents returned
- Example:
  ```js
  collection.find().sort({ age: -1 }).limit(5) // Get top 5 oldest users
  ```
- `limit()` can be used with `skip()` for pagination
- Example:
  ```js
  collection.find().sort({ age: -1 }).skip(10).limit(5) // Get users 11-15 sorted by age
  ```
- `limit()` can be used with `count()` to limit the number of documents counted
- Example:
  ```js
  collection.find().limit(5).count() // Count first 5 documents
  ```

## Using Projection

- `projection`: Specify fields to include or exclude in results
- Include fields with 1, exclude with 0
- Cannot mix inclusion and exclusion except for _id
- `_id` field is included by default unless explicitly excluded
- Examples:
  ```js
  // Include only specified fields
  collection.find({}, { name: 1, age: 1 })

  // Exclude specific fields
  collection.find({}, { password: 0, secretKey: 0 })

  // Exclude _id and include specific fields
  collection.find({}, { _id: 0, name: 1, age: 1 })
  ```
- Projection with embedded documents:
  ```js
  // Include specific fields in embedded document
  collection.find({}, { "address.city": 1, "address.country": 1 })

  // Exclude specific fields in embedded document
  collection.find({}, { "address.zipCode": 0 })
  ```
- Array projection operators:
    - `$slice`: Limit array elements
    - `$elemMatch`: Match and project array elements
    - `$`: Project first matching array element

### Projection Restrictions

- Cannot combine inclusion and exclusion projection operators in a single projection, except for the exclusion of the _
  id field
- For array fields, cannot combine multiple projection operators, except:
    - `$slice` with `$elemMatch`
    - `$slice` with `$`
- Cannot use projection operators with geoNear command
- Cannot use `$` projection operator without a corresponding array field match in query

### Update Operations

- `updateOne()`: Modify first matching document
- `updateMany()`: Modify all matching documents
- Update operators: `$set`, `$inc`, `$push`, `$pull`
- Upsert option to create if not exists:
  ```js
  collection.updateOne(
    { email: "user@example.com" },
    { $set: { name: "John", age: 30 } },
    { upsert: true }  // Creates document if no match found
  )
  ```

### Delete Operations

- `deleteOne()`: Remove first matching document
- `deleteMany()`: Remove all matching documents
- Use filters to specify documents to delete

## Extended CRUD Operations

### Advanced Update Operations

- `findOneAndUpdate()`: Update and return document - Returns the original document by default.
- `replaceOne()`: Replace entire document except _id
- `replaceMany()`: Replace multiple documents

### Advanced Delete Operations

- `findOneAndDelete()`: Delete and return document

## Query Operators

### Comparison Operators

- `$eq`: Equals
- `$ne`: Not equals
- `$gt`: Greater than
- `$lt`: Less than
- `$gte`: Greater than or equal
- `$lte`: Less than or equal
- `$in`: Match any value in array
- `$nin`: Not match any value in array

### Logical Operators

- `$and`: Match all conditions
- `$or`: Match any condition
- `$not`: Negate condition
- `$nor`: Not match any condition

### Element Operators

- `$exists`: Field exists check
- `$type`: BSON type check

### Array Operators

- `$all`: Match all elements
- `$elemMatch`: Match array element
- `$size`: Array length match

## Bulk Operations

### Ordered Operations

- Execute in sequence
- Stop on first error
- Use `bulkWrite()` with ordered: true

### Unordered Operations

- Execute in parallel
- Continue on error
- Use `bulkWrite()` with ordered: false

### Bulk Write Operations

- insertOne
- updateOne
- updateMany
- deleteOne
- deleteMany
- replaceOne

