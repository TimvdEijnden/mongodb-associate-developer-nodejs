# Indexes (17%)

Indexes are special data structures that store a small portion of the collection's data set in an easy-to-traverse form. MongoDB uses indexes to improve query performance. Without indexes, MongoDB must perform a collection scan, i.e., scan every document in a collection, to select those documents that match the query statement.

## Single Field Indexes

MongoDB supports creating indexes on a single field of a document. For these indexes, the sort order (ascending/descending) of the index key does not matter because MongoDB can traverse the index in either direction.

**Example:** Create an ascending index on the `title` field:
```javascript
db.collection.createIndex({ title: 1 })
```

## Compound Indexes

MongoDB also supports indexes on multiple fields, known as compound indexes. The order of fields listed in a compound index is important. For instance, an index on `{ userid: 1, score: -1 }` first sorts by `userid` (ascending) and then, within each `userid`, sorts by `score` (descending).

**Example:** Create a compound index on `author` (ascending) and `year` (descending):
```javascript
db.collection.createIndex({ author: 1, year: -1 })
```

## Text Indexes

Text indexes support text search queries on string content. A collection can have **at most one** text index. A text index can cover multiple fields.

### Text Index Creation
To create a text index, use the `createIndex()` method and specify the field(s) to be indexed with the value `"text"`.

**Example:** Create a text index on the `fullplot` field:
```javascript
db.movies.createIndex({ fullplot: "text" })
```
If you want to include multiple fields in a text index:
```javascript
db.articles.createIndex({ title: "text", content: "text" })
```

### Text Search Query with Sorting

When performing text search in MongoDB, you can sort results by relevance score using the `$meta` operator. The query
components are:

1. `$text`: Performs text search
2. `$meta`: Accesses metadata like text score
3. `sort`: Orders results by score
4. `limit`: Restricts number of returned documents

Suppose you have a movies collection with the following document structure:

```json
{
    _id: ObjectId("573a1390f29313caabcd60e4"),
    title: 'The Immigrant',
    fullplot: "Charlie is on his way to the USA. He wins in a card game, puts the money in Edna's bag (she and her sick mother have been robbed of everything). When he retrieves a little for himself he is accused of being a thief. Edna clears his name. Later, broke, Charlie finds a coin and goes into a restaurant."
}
```

You want to sort result set by a relevance score computed by MongoDB in text search query and extract only three
documents with the highest score. Which query do you need to use?

```javascript
db.movies.find(
  { $text: { $search: "Charlie Edna" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } }).limit(3)
```

## Index Properties

Indexes can have several properties that affect their behavior.

### Unique Indexes
A unique index ensures that the indexed fields do not store duplicate values. By default, MongoDB creates non-unique indexes.

**Example:** Create a unique index on the `title` field:
```javascript
db.collection.createIndex({ title: 1 }, { unique: true })
```
If you attempt to insert a document with a `title` that already exists in an indexed document, the operation will fail.

### Partial Indexes (MongoDB 3.2+)
Partial indexes only index documents in a collection that meet a specified filter expression. By indexing a subset of the documents in a collection, partial indexes have lower storage requirements and reduced performance costs for index creation and maintenance.

**Example:** Create an index on users who have an age greater than 21:
```javascript
db.users.createIndex(
   { name: 1 },
   { partialFilterExpression: { age: { $gt: 21 } } }
)
```

### TTL Indexes
TTL (Time-To-Live) indexes are special single-field indexes that MongoDB can use to automatically remove documents from a collection after a certain amount of time or at a specific clock time. This is ideal for data that only needs to persist for a finite period, such as session data, logs, or event data.

**Example:** Create a TTL index on a `createdAt` field, so documents expire after 3600 seconds (1 hour):
```javascript
db.log_events.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )
```

## Managing Indexes

MongoDB provides several commands to manage indexes.

### Listing Indexes
You can retrieve a list of all indexes for a collection using the `getIndexes()` method.
```javascript
db.collection.getIndexes()
```

### Dropping Indexes
You can remove an existing index using the `dropIndex()` method. You can specify the index by its name or by its key specification.

**Example (by key specification):**
```javascript
db.collection.dropIndex({ author: 1, year: -1 })
```
**Example (by name - assuming the index name is `author_1_year_-1`):**
```javascript
db.collection.dropIndex("author_1_year_-1")
```
To drop all non-`_id` indexes, use `dropIndexes()`.

## Index Selection

MongoDB's query optimizer processes queries and chooses the most efficient query plan for a query given the available indexes. You can view the query plan and index usage for a query using the `explain()` method.

**Example:** View execution statistics for a query to understand index usage:
```javascript
db.collection.find({ author: "John Smith" }).explain('executionStats')
```
This helps in analyzing whether queries are using indexes effectively and can guide decisions on creating or modifying indexes.

