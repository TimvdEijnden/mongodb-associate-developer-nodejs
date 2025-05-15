async function practiceSchemaDesign(client) {
    const db = client.db();
    console.log('\n=== Schema Design ===');

    // Create collection with schema validation
    await db.createCollection("products", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "price", "category"],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    price: {
                        bsonType: "number",
                        minimum: 0,
                        description: "must be a positive number and is required"
                    },
                    category: {
                        enum: ["Electronics", "Books", "Clothing"],
                        description: "must be one of the enum values and is required"
                    }
                }
            }
        }
    });

    // Test schema validation
    try {
        await db.collection("products").insertOne({
            name: "Valid Product",
            price: 99.99,
            category: "Electronics"
        });
        console.log("Valid document inserted");
    } catch (e) {
        console.log("Validation error:", e.message);
    }

    try {
        await db.collection("products").insertOne({
            name: "Invalid Product",
            price: -10,  // Invalid price
            category: "Invalid"  // Invalid category
        });
    } catch (e) {
        console.log("Expected validation error:", e.message);
    }

    // Demonstrate relationships
    // One-to-Many relationship example
    const orders = db.collection("orders");
    const customers = db.collection("customers");

    const customer = await customers.insertOne({
        name: "John Doe",
        email: "john@example.com"
    });

    await orders.insertMany([
        {
            customerId: customer.insertedId,
            product: "Laptop",
            price: 999
        },
        {
            customerId: customer.insertedId,
            product: "Mouse",
            price: 29
        }
    ]);

    // Find customer's orders
    const customerOrders = await orders.find({
        customerId: customer.insertedId
    }).toArray();
    console.log("Customer's orders:", customerOrders);

    // Cleanup
    await db.collection("products").drop();
    await db.collection("orders").drop();
    await db.collection("customers").drop();
}

module.exports = { practiceSchemaDesign };
