async function practiceIndexes(client) {
    const collection = client.db().collection('books');
    console.log('\n=== Indexes ===');

    // Create indexes
    await collection.createIndex({title: 1});
    await collection.createIndex({author: 1, year: -1});

    // Insert sample data
    await collection.insertMany([
        {title: "MongoDB Basics", author: "John Smith", year: 2023},
        {title: "Advanced MongoDB", author: "Jane Doe", year: 2024}
    ]);

    // Get indexes
    const indexes = await collection.indexes();
    console.log('Indexes:', indexes);

    // Query using index
    const result = await collection.find({author: "John Smith"})
        .explain('executionStats');
    console.log('Query Execution Stats:', result.executionStats);

    // Query using compound index
    const compoundResult = await collection.find({author: "John Smith", year: {$lte: 2023}})
        .explain('executionStats');
    console.log('Compound Index Query Stats:', compoundResult.executionStats);

    // Drop index
    await collection.dropIndex({author: 1, year: -1});

    // Check if index is dropped
    const indexesAfterDrop = await collection.indexes();
    console.log('Indexes after drop:', indexesAfterDrop);

    await collection.createIndex({author: -1, year: 1});

    // Check if index is created
    const indexesAfterCreate = await collection.indexes();
    console.log('Indexes after create:', indexesAfterCreate);

    // Query using the new index
    const newIndexResult = await collection.find({author: "Jane Doe"}).sort({year: -1}).explain('executionStats');
    console.log('New Index Query Stats:', newIndexResult.executionStats);

    // Create a unique index
    await collection.dropIndex({title: 1});
    await collection.createIndex({title: 1}, {unique: true});
    try {
        // Attempt to insert a duplicate title
        console.log('Inserting duplicate title...');
        await collection.insertOne({title: "MongoDB Basics", author: "John Doe", year: 2025});
    } catch (error) {
        console.error('Error inserting duplicate title:', error.message);
    }

    // Cleanup
    await collection.drop();
}

async function practiceTextSearch(client) {
    const collection = client.db().collection('products');
    console.log('\n=== Text Search ===');

    // Create a text index on the 'name' and 'description' fields
    await collection.createIndex({name: 'text', description: 'text'});

    // Insert sample data
    await collection.insertMany([
        {name: "Apple iPhone", description: "Latest apple model with advanced features"},
        {name: "Samsung Galaxy", description: "High-performance smartphone"},
        {name: "Google Pixel", description: "Smartphone with excellent camera"},
        {name: "Apple MacBook", description: "Powerful laptop for professionals"},
        {name: "Dell XPS", description: "High-end laptop with stunning display"}
    ]);

    // Basic text search
    const basicSearch = await collection.find({$text: {$search: "Apple"}}).toArray();
    console.log('Basic Text Search (Apple):', basicSearch);

    // Phrase search
    const phraseSearch = await collection.find({$text: {$search: "\"smartphone\""}}).toArray();
    console.log('Phrase Search (smartphone):', phraseSearch);

    // Exclude words from search
    const excludeWordsSearch = await collection.find({$text: {$search: "smartphone -Apple"}}).toArray();
    console.log('Exclude Words Search (smartphone -Apple):', excludeWordsSearch);

    // Sort result set by a relevance score computed by MongoDB
    const sortedSearch = await collection.find(
        {$text: {$search: "Apple"}},
    )
        .sort({score: {$meta: "textScore"}})
        .project({score: {$meta: "textScore"}, _id: 0, 'productName': '$name'})
        .toArray();
    console.log('Sorted Text Search (Apple):', sortedSearch);

    // Cleanup
    await collection.drop();
}

async function practiceHideIndex(client) {
    const collection = client.db().collection('books');
    console.log('\n=== Hide/Unhide Index ===');

    // Create index
    await collection.createIndex({title: 1});

    // Insert sample data
    await collection.insertMany([
        {title: "Book One", author: "Author A"},
        {title: "Book Two", author: "Author B"}
    ]);

    // Check execution stats before hiding
    let result = await collection.find({title: "Book One"})
        .explain('executionStats');
    console.log('Before hiding index:', result.executionStats);

    // Hide index using command
    await client.db().command({
        "collMod": "books",
        "index": {
            "keyPattern": {"title": 1},
            "hidden": true
        }
    });

    // Check execution stats after hiding
    result = await collection.find({title: "Book One"})
        .explain('executionStats');
    console.log('After hiding index:', result.executionStats);

    // Unhide index using command
    await client.db().command({
        "collMod": "books",
        "index": {
            "keyPattern": {"title": 1},
            "hidden": false
        }
    });

    // Check execution stats after unhiding
    result = await collection.find({title: "Book One"})
        .explain('executionStats');
    console.log('After unhiding index:', result.executionStats);

    // Cleanup
    await collection.drop();
}


module.exports = {practiceIndexes, practiceTextSearch, practiceHideIndex};
