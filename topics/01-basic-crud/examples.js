async function practiceBasicCrud(client) {
    const collection = client.db().collection('users');
    console.log('\n=== CRUD Operations ===');

    // Insert
    const insertResult = await collection.insertOne({
        name: "John Doe",
        email: "john@example.com",
        created: new Date()
    });
    console.log('Insert Result:', insertResult);

    // Bulk Insert
    const bulkInsertResult = await collection.insertMany([
        { name: "Alice", email: "alice@example.com", age: 28, created: new Date() },
        { name: "Bob", email: "bob@example.com", age: 32, created: new Date() },
        { name: "Carol", email: "carol@example.com", age: 25, created: new Date() },
        { name: "Dave", email: "dave@example.com", age: 35, created: new Date() }
    ]);
    console.log('Bulk Insert Result:', bulkInsertResult);

    // Find
    const findResult = await collection.find({ name: "John Doe" }).toArray();
    console.log('Find Result:', findResult);

    // Update
    const updateResult = await collection.updateOne(
        { name: "John Doe" },
        { $set: { status: "active" } }
    );
    console.log('Update Result:', updateResult);

    // Update with Upsert
    const upsertResult = await collection.updateOne(
        {name: "Emma Wilson"},
        {
            $set: {
                email: "emma@example.com",
                status: "pending",
                created: new Date()
            }
        },
        {upsert: true}
    );
    console.log('Upsert Result:', upsertResult);


    // Replace
    const replaceResult = await collection.replaceOne(
        {name: "Alice"},
        {name: "Alice Smith", email: "alice.smith@example.com", level: "expert", updated: new Date()}
    );
    console.log('Replace Result:', replaceResult);

    // Delete
    const deleteResult = await collection.deleteOne({ name: "John Doe" });
    console.log('Delete Result:', deleteResult);
}

async function practiceQueryOperators(client) {
    const collection = client.db().collection('products');
    console.log('\n=== Query Operators ===');

    // Insert sample data
    await collection.insertMany([
        { name: "Laptop", price: 999, category: "Electronics", inStock: true, rating: 4.5 },
        { name: "Phone", price: 699, category: "Electronics", inStock: true, rating: 4.2 },
        { name: "Tablet", price: 499, category: "Electronics", inStock: true, rating: 3.8 },
        { name: "Book", price: 29, category: "Books", inStock: false, rating: 4.8 },
        { name: "Headphones", price: 149, category: "Electronics", inStock: true, rating: 4.0 },
        { name: "Monitor", price: 349, category: "Electronics", inStock: true, rating: 4.3 },
        { name: "Keyboard", price: 79, category: "Electronics", inStock: true, rating: 3.5 }
    ]);

    // Comparison operators
    const comparisonResult = await collection.find({
        price: { $gt: 500 }
    }).toArray();
    console.log('Products over $500:', comparisonResult);

    // Logical operators
    const logicalResult = await collection.find({
        $and: [
            { category: "Electronics" },
            { inStock: true }
        ]
    }).toArray();
    console.log('In-stock electronics:', logicalResult);

    // Cleanup for next examples
    // await collection.drop();
}

// New function to demonstrate modifying query results
async function practiceModifyingResults(client) {
    const collection = client.db().collection('products');
    console.log('\n=== Modifying Query Results ===');

    // 1. Sort results
    console.log('\n--- Sorting ---');
    
    // Sort by price (highest to lowest)
    const sortedByPrice = await collection.find()
        .sort({ price: -1 })
        .toArray();
    console.log('Products sorted by price (highest first):', 
        sortedByPrice.map(p => ({ name: p.name, price: p.price })));
    
    // Sort by multiple fields (category ascending, then rating descending)
    const sortedByMultiple = await collection.find()
        .sort({ category: 1, rating: -1 })
        .toArray();
    console.log('Products sorted by category then rating:', 
        sortedByMultiple.map(p => ({ name: p.name, category: p.category, rating: p.rating })));

    // 2. Limit results
    console.log('\n--- Limiting ---');
    
    // Get top 3 most expensive products
    const topExpensive = await collection.find()
        .sort({ price: -1 })
        .limit(3)
        .toArray();
    console.log('Top 3 most expensive products:', 
        topExpensive.map(p => ({ name: p.name, price: p.price })));
    
    // Skip and limit (pagination)
    const page2 = await collection.find()
        .sort({ name: 1 })
        .skip(2)  // Skip first 2 products
        .limit(2) // Get next 2 products
        .toArray();
    console.log('Page 2 (items 3-4):', 
        page2.map(p => ({ name: p.name })));

    // 3. Projection
    console.log('\n--- Projection ---');
    
    // Include only specific fields
    console.log('\n--- using .project() ---');
    const nameAndPrice1 = await collection.find({}).project( {
        name: 1,
        price: 1,
        _id: 0  // Exclude _id
    }).toArray();
    console.log('Only name and price:', nameAndPrice1);

    // Include only specific fields with options
    console.log('\n--- using .find({}, { projection: ... }) ---');
    const nameAndPrice2 = await collection.find({}, { projection: {
            name: 1,
            price: 1,
            _id: 0  // Exclude _id
        }}).toArray();
    console.log('Only name and price:', nameAndPrice2);
    
    // Exclude specific fields
    const withoutDetails = await collection.find({}).project( {
        inStock: 0,
        rating: 0
    }).toArray();
    console.log('Without stock and rating details:', 
        withoutDetails.map(p => Object.keys(p)));

    // 4. Counting
    console.log('\n--- Counting ---');
    
    // Count all documents
    const totalCount = await collection.countDocuments();
    console.log('Total products:', totalCount);
    
    // Count documents matching a query
    const electronicsCount = await collection.countDocuments({ category: "Electronics" });
    console.log('Electronics products:', electronicsCount);
    
    const highPricedCount = await collection.countDocuments({ price: { $gte: 300 } });
    console.log('High-priced products ($300+):', highPricedCount);

    // 5. Combining methods
    console.log('\n--- Combined Operations ---');
    
    // Complex query - top 2 highest rated in-stock electronics
    const topRatedElectronics = await collection.find({
        category: "Electronics",
        inStock: true
    })
        .sort({ rating: -1 })
        .limit(2)
        .project({ name: 1, waardering: '$rating', price: 1, _id: 0 })
        .toArray();
    
    console.log('Top rated electronics:', topRatedElectronics);

    // Clean up
    await collection.drop();
}

async function practiceReplaceOperations(client) {
    const collection = client.db().collection('employees');
    console.log('\n=== Replace Operations ===');

    // Insert initial document
    await collection.insertOne({
        name: "Jane Smith",
        position: "Developer",
        skills: ["JavaScript", "Python"],
        contact: {
            email: "jane@company.com",
            phone: "123-456-7890"
        }
    });

    // Replace entire document
    const replaceResult = await collection.replaceOne(
        {name: "Jane Smith"},
        {
            name: "Jane Wilson",
            title: "Senior Developer",
            department: "Engineering",
            performance: {
                rating: 5,
                lastReview: new Date()
            }
        }
    );
    console.log('Replace Result:', replaceResult);

    // Show document before cleanup
    const finalDoc = await collection.findOne({name: "Jane Wilson"});
    console.log('Final Document:', finalDoc);

    // Cleanup
    await collection.drop();
}

async function practiceFindAndModify(client) {
    const collection = client.db().collection('employees');
    console.log('\n=== Find and Modify Operations ===');

    // Insert initial documents
    await collection.insertMany([
        {
            name: "John Smith",
            position: "Developer",
            salary: 75000,
            skills: ["JavaScript", "Python"],
            projects: ["Alpha", "Beta"]
        },
        {
            name: "Mary Johnson",
            position: "Manager",
            salary: 85000,
            skills: ["Leadership", "Communication"],
            projects: ["Gamma"]
        }
    ]);

    // Find and update with projection
    const result = await collection.findOneAndUpdate(
        {position: "Developer"},
        {
            $set: {salary: 80000},
            $push: {projects: "Delta"}
        },
        {
            projection: { fullName: '$name', position: 1, salary: 1, _id: 0, projects: 1},
            returnDocument: 'after'
        }
    );
    console.log('FindOneAndUpdate Result:', result);

    // Cleanup
    await collection.drop();
}


async function practiceArrayOperators(client) {
    const collection = client.db().collection('students');
    console.log('\n=== Array Operators ===');

    // Insert sample data
    await collection.insertMany([
        { name: "Alice", scores: [85, 92, 78], enrolled: true },
        { name: "Bob", scores: [88, 90, 95], enrolled: false },
        { name: "Charlie", scores: [70, 75, 80], enrolled: true },
        { name: "David", scores: [90, 85, 88], enrolled: false }
    ]);

    // Query with $elemMatch
    const elemMatchResult = await collection.find({
        scores: { $elemMatch: { $gt: 90 } }
    }).toArray();
    console.log('Students with a score greater than 90:', elemMatchResult);

    // Query with $all
    const allResult = await collection.find({
        scores: { $all: [85, 90] }
    }).toArray();
    console.log('Students with scores of 85 and 90:', allResult);

    // Cleanup
    await collection.drop();
}


module.exports = {
    practiceBasicCrud,
    practiceQueryOperators,
    practiceArrayOperators,
    practiceModifyingResults,
    practiceReplaceOperations,
    practiceFindAndModify,
};
