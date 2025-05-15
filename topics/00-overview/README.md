# MongoDB Overview & Document Model (8%)

## BSON Types

BSON (Binary JSON) is MongoDB's binary-encoded serialization format for documents. Key BSON types include:

| Type               | Description                                                | Example                              |
|--------------------|------------------------------------------------------------|--------------------------------------|
| String             | UTF-8 encoded character strings                            | "Hello World"                        |
| Int32              | 32-bit integer                                             | NumberInt("42")                      |
| Int64              | 64-bit integer                                             | NumberLong("9223372036854775807")    |
| Double             | 64-bit floating-point numbers                              | 3.14159                              |
| Boolean            | true or false values                                       | true                                 |
| Array              | Ordered lists of values                                    | ["red", "green", "blue"]             |
| Object             | Embedded documents                                         | { name: "John", age: 30 }            |
| ObjectId           | 12-byte unique identifiers                                 | ObjectId("507f1f77bcf86cd799439011") |
| Date               | 64-bit integers representing milliseconds since Unix epoch | new Date("2023-12-25")               |
| Null               | Null values                                                | null                                 |
| Regular Expression | Regular expression patterns and options (/pattern/options) | /^test$/i                            |
| Decimal128         | High-precision decimal numbers                             | NumberDecimal("123.45")              |
| Binary             | Binary data stored as Buffer                               | new Binary(Buffer.from("Hello"))     |

## MongoDB Architecture

MongoDB's architecture consists of several key components:

1. Storage Engine
    - WiredTiger (default): Responsible for managing how data is stored in memory and on disk
    - In-memory: Optional engine for improved performance

2. Query Engine
    - Processes and optimizes database operations
    - Handles query planning and execution

3. Replication
    - Primary-Secondary architecture
    - Automatic failover
    - Data redundancy and high availability

4. Sharding
    - Horizontal scaling across multiple servers
    - Automatic data distribution
    - Range-based and hash-based sharding

## Document Model Concepts

MongoDB's document model provides a flexible, schema-free approach:

1. Documents
    - Basic unit of data in MongoDB
    - JSON-like format (BSON)
    - Self-contained data records
    - Can have varying structures within a collection

2. Collections
    - Groups of documents
    - Analogous to tables in relational databases
    - Dynamic schemas
    - No enforced structure by default

3. Key Features
    - Embedded Documents: Nested document structures
    - Arrays: Lists of values or documents
    - Schema Flexibility: Fields can be added or removed without affecting other documents
    - Atomic Operations: All operations on a single document are atomic
