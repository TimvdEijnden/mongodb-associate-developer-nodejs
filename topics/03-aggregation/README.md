# Aggregation Pipeline (8%)

## Pipeline Stages

Each stage transforms documents and passes results to next stage:

### $match
- Filters documents like find() query
- Uses MongoDB query syntax
- Should be early in pipeline for better performance
- Example: `{ $match: { status: "active", age: { $gte: 21 } } }`

### $group 
- Groups documents by specified expression
- Performs aggregations within groups
- Creates one document per unique group
- Example: `{ $group: { _id: "$category", total: { $sum: "$amount" }, avg: { $avg: "$price" } } }`

### $sort

- Sorts documents by specified fields
- Can sort by multiple fields with different directions
- Example: `{ $sort: { age: -1, name: 1 } }`

### $project

- Reshapes documents by including, excluding, or transforming fields
- Can create computed fields
- Example: `{ $project: { name: 1, fullName: { $concat: ["$firstName", " ", "$lastName"] }, _id: 0 } }`

### $skip

- Skips specified number of documents
- Useful for pagination
- Example: `{ $skip: 10 }`

### $lookup

- Performs left outer join with another collection
- Adds matching documents from joined collection as array
- Example: `{ $lookup: { from: "orders", localField: "customerId", foreignField: "_id", as: "orders" } }`

### $unwind

- Deconstructs array field to create document for each element
- Creates multiple documents from single document with array
- Example: `{ $unwind: "$tags" }`

### $out

- Writes aggregation results to specified collection
- Must be last stage in pipeline
- Replaces existing collection if it exists
- Example: `{ $out: "outputCollection" }`


### $merge
- Similar to $out but allows merging with existing collection
- Can specify merge strategy (insert, update, replace)
- Example: `{ $merge: { into: "outputCollection", whenMatched: "merge", whenNotMatched: "insert" } }`
- Can also specify merge options like upsert, bypassDocumentValidation, etc.
- Example: `{ $merge: { into: "outputCollection", whenMatched: "replace", whenNotMatched: "insert", bypassDocumentValidation: true } }`

## Aggregation Operators
- `$sum`: Calculates sum of numeric values
- Example: `{ $group: { _id: "$category", total: { $sum: "$amount" } } }`
- `$avg`: Calculates average of numeric values
- Example: `{ $group: { _id: "$category", average: { $avg: "$price" } } }`
- `$min`: Finds minimum value
- Example: `{ $group: { _id: "$category", minPrice: { $min: "$price" } } }`
- `$max`: Finds maximum value
- Example: `{ $group: { _id: "$category", maxPrice: { $max: "$price" } } }`
- `$push`: Adds values to array
- Example: `{ $group: { _id: "$category", items: { $push: "$item" } } }`
- `$addToSet`: Adds unique values to array
- Example: `{ $group: { _id: "$category", uniqueItems: { $addToSet: "$item" } } }`
- `$first`: Returns first value in group
- Example: `{ $group: { _id: "$category", firstItem: { $first: "$item" } } }`
- `$last`: Returns last value in group
- Example: `{ $group: { _id: "$category", lastItem: { $last: "$item" } } }`
- `$concat`: Concatenates strings
- Example: `{ $project: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }`
- `$substr`: Extracts substring
- Example: `{ $project: { shortName: { $substr: ["$name", 0, 5] } } }`
- `$toUpper`: Converts string to uppercase
- Example: `{ $project: { upperName: { $toUpper: "$name" } } }`
- `$toLower`: Converts string to lowercase
- Example: `{ $project: { lowerName: { $toLower: "$name" } } }`
- `$dateToString`: Formats date as string
- Example: `{ $project: { formattedDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } } }`
- `$dateAdd`: Adds time to date
- Example: `{ $project: { newDate: { $dateAdd: { startDate: "$date", unit: "day", amount: 5 } } } }`
- `$dateDiff`: Calculates difference between two dates

```javascript
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'myDatabase';
const collectionName = 'myCollection';
const pipeline = [
    { $match: { status: 'active' } },
    { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
    { $sort: { totalAmount: -1 } },
    { $project: { category: '$_id', totalAmount: 1 } }
];

async function run() {
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const results = await collection.aggregate(pipeline).toArray();
        console.log('Aggregation Results:', results);
        // expected output:
        // Aggregation Results: [
        // { _id: 'A', category: 'A', totalAmount: 100 },
        // { _id: 'B', category: 'B', totalAmount: 50 },
        // { _id: 'C', category: 'C', totalAmount: 25 }
        // ]
    } finally {
        await client.close();
    }
}

run().catch(console.error);
```
