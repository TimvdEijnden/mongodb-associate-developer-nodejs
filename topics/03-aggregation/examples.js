async function practiceAggregation(client) {
    const collection = client.db().collection('sales');
    console.log('\n=== Aggregation Pipeline ===');

    // Insert sample data
    await collection.insertMany([
        {product: "A", category: "Electronics", price: 100, date: new Date("2024-01-15")},
        {product: "B", category: "Electronics", price: 200, date: new Date("2024-01-16")},
        {product: "C", category: "Books", price: 30, date: new Date("2024-01-15")},
        {product: "D", category: "Books", price: 45, date: new Date("2024-01-16")},
        {product: "E", category: "Electronics", price: 300, date: new Date("2024-01-17")},
        {product: "F", category: "Clothing", price: 59.99, date: new Date("2024-01-15")},
        {product: "G", category: "Clothing", price: 89.99, date: new Date("2024-01-16")}
    ]);

    // Group by category
    const groupResult = await collection.aggregate([
        {
            $group: {
                _id: "$category",
                totalSales: { $sum: "$price" },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalSales: 1,
                count: 1,
            }
        }
    ]).toArray();
    console.log('Sales by Category:', groupResult);

    // Totalsales higher than 100

    const highSalesResult = await collection.aggregate([
        {
            $group: {
                _id: "$category",
                totalSales: { $sum: "$price" },
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                totalSales: { $gt: 100 }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                totalSales: 1,
                count: 1,
            }
        }
    ]).toArray();
    console.log('Sales high then 100 by Category:', highSalesResult);

    const averagePricePerCategory = await collection.aggregate([
        {
            $group: {
                _id: "$category",
                averagePrice: { $avg: "$price" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                averagePrice: 1
            }
        }
    ]).toArray();

    console.log('Average Price by Category:', averagePricePerCategory);


    // Multiple stages with pagination stages: match, group, sort, limit (2)

    // Store results in a new collection
    await collection.aggregate([
        {
            $group: {
                _id: "$category",
                totalRevenue: {$sum: "$price"},
                averagePrice: {$avg: "$price"}
            }
        },
        {
            $out: "category_summary"
        }
    ]).toArray();

    // Display results from the new collection
    const summaryResults = await client.db().collection('category_summary').find().toArray();
    console.log('Category Summary (stored in new collection):', summaryResults);

    // There are 5 restaurants with a rating between 1.0 and 5.0 we need to find the highest rated restaurant
    const restaurantCollection = client.db().collection('restaurants');
    await restaurantCollection.insertMany([
        {name: "Restaurant A", rating: 4.5},
        {name: "Restaurant B", rating: 3.8},
        {name: "Restaurant C", rating: 4.9},
        {name: "Restaurant D", rating: 2.5},
        {name: "Restaurant E", rating: 4.0}
    ]);
    const highestRatedRestaurant = await client.db().collection('restaurants').aggregate([
        {
            $sort: { rating: -1 }
        },
        {
            $limit: 1
        }
    ]).toArray();

    console.log('Highest Rated Restaurant:', highestRatedRestaurant);

    // Cleanup
    await restaurantCollection.drop();
    await collection.drop();
    await client.db().collection('category_summary').drop();
    
}


module.exports = { practiceAggregation };
