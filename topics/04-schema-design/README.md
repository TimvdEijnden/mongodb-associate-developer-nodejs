# Schema Design (16%)
- Data Modeling Patterns
- Relationships
- Schema Validation
- Document Structure

## Schema Design Do's and Don'ts

### Do's

1. **Embed Documents When**:
    - Data is frequently accessed together
    - One-to-one or one-to-few relationships exist
   ```javascript
   // Good: Embedding address in user document
   {
     _id: ObjectId("..."),
     name: "John Doe",
     address: {
       street: "123 Main St",
       city: "New York",
       country: "USA"
     }
   }
   ```

2. **Use References When**:
    - Data is shared across multiple documents
    - Many-to-many relationships exist
   ```javascript
   // Good: Referencing categories in products
   {
     _id: ObjectId("..."),
     name: "Laptop",
     category_ids: [ObjectId("..."), ObjectId("...")]
   }
   ```

3. **Use Schema Validation**:
   ```javascript
   db.createCollection("products", {
     validator: {
       $jsonSchema: {
         bsonType: "object",
         required: ["name", "price"],
         properties: {
           name: { bsonType: "string" },
           price: { bsonType: "number", minimum: 0 }
         }
       }
     }
   })
   ```

### Don'ts

1. **Avoid Deeply Nested Documents**:
   ```javascript
   // Bad: Deep nesting
   {
     order: {
       customer: {
         address: {
           location: {
             coordinates: {
               lat: 40.7128,
               lng: -74.0060
             }
           }
         }
       }
     }
   }

   // Better: Flatter structure
   {
     order_id: ObjectId("..."),
     customer_id: ObjectId("..."),
     shipping_coordinates: {
       lat: 40.7128,
       lng: -74.0060
     }
   }
   ```

2. **Avoid Unbounded Arrays**:
   ```javascript
   // Bad: Storing all comments in post document
   {
     _id: ObjectId("..."),
     title: "Blog Post",
     comments: [ /* potentially thousands of comments */ ]
   }

   // Better: Separate collection for comments
   // posts collection
   {
     _id: ObjectId("..."),
     title: "Blog Post"
   }
   // comments collection
   {
     _id: ObjectId("..."),
     post_id: ObjectId("..."),
     content: "Great post!"
   }
   ```

3. **Avoid Inconsistent Data Types**:
   ```javascript
   // Bad: Mixed types for same field
   { user_id: "123" }
   { user_id: 123 }

   // Good: Consistent types
   { user_id: "123" }
   { user_id: "456" }
   ```

## Schema Evolution Considerations

- Plan for schema changes from the beginning
- Use flexible schema validation
- Consider using schema versioning
