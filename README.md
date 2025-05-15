# MongoDB Associate Developer Node.js Certification Exam Guide

This repository contains comprehensive study materials and practice exercises for the MongoDB Associate Developer Certification exam with a focus on Node.js.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your MongoDB connection in `.env` (optional)

## Running the Examples

First start local MongoDB server using docker compose
```bash
docker-compose up -d
```

To run all examples for all topics, use:
```bash
npm start
```

Or directly with Node:
```bash
node index.js
```

To run a specific example, use:
```bash
npm run <example>
```

examples to run are:
- crud
- query-results
- index
- aggregation
- schema

eg:
```bash
npm run crud
```

## Exam Overview

The MongoDB Associate Developer Certification is designed to validate your skills in building applications using MongoDB and the Node.js driver. The exam tests your knowledge of MongoDB concepts, CRUD operations, indexing, aggregation, schema design, and Node.js driver usage.

### Exam Details
- **Format**: Online, proctored exam
- **Duration**: 90 minutes
- **Questions**: Multiple choice and coding challenges
- **Passing Score**: 70%
- **Validity**: 3 years
- **Prerequisites**: None, but MongoDB University courses recommended
- **Cost**: $150 USD

## Exam Topics and Weights

The exam covers the following topics with their respective weights:

1. **Overview & Document Model (8%)**
   - BSON Types
   - MongoDB Architecture
   - Document Model Concepts

2. **CRUD Operations (51%)**
   - Basic CRUD Operations (Create, Read, Update, Delete)
   - Query Operators (comparison, logical, element, array)
   - Cursor Operations (sort, limit, skip)
   - Projection (inclusion, exclusion, array operators)
   - Bulk Operations (ordered, unordered)
   - Error Handling

3. **Indexes (17%)**
   - Single Field Indexes
   - Compound Indexes
   - Text Indexes
   - Index Properties
   - Index Selection
   - Index Creation and Management

4. **Aggregation Pipeline (8%)**
   - Pipeline Stages ($match, $group, $sort, $project, $lookup)
   - Aggregation Operators ($sum, $avg, $min, $max, etc.)
   - Performance Considerations
   - Working with Arrays ($unwind)

5. **Schema Design (16%)**
   - Data Modeling Patterns
   - Relationships (embedding vs. referencing)
   - Schema Validation
   - Document Structure
   - Normalization vs. Denormalization

## Study Guide

### 1. Overview & Document Model (8%)
Start with the fundamentals of MongoDB's document model and architecture:
- [MongoDB Overview & Document Model](./topics/00-overview/README.md)

### 2. CRUD Operations (51%)
Focus heavily on this section as it comprises over half of the exam:
- [Basic CRUD Operations](./topics/01-basic-crud/README.md)

### 3. Indexes (17%)
Learn how to create and use indexes to optimize query performance:
- [Indexes](./topics/02-indexes/README.md)

### 4. Aggregation Pipeline (8%)
Understand how to transform and analyze data using the aggregation framework:
- [Aggregation Pipeline](./topics/03-aggregation/README.md)

### 5. Schema Design (16%)
Master the principles of effective schema design for MongoDB:
- [Schema Design](./topics/04-schema-design/README.md)

### 6. Node.js Driver
Learn how to use the MongoDB Node.js driver to interact with MongoDB. This is especially important for the Node.js-specific exam:
- [Node.js Driver](./topics/05-nodejs-driver/README.md)

Key Node.js driver topics include:
- Connection string URI format and options
- Client configuration (authentication, SSL/TLS, connection pooling)
- Promises vs Callbacks
- Error handling and retry logic
- CRUD operations with the driver
- Working with ObjectId
- Transaction support
- Connection management best practices

## Preparation Resources

### Official Resources
- [MongoDB University](https://university.mongodb.com/) - Free courses covering all exam topics
- [MongoDB Documentation](https://docs.mongodb.com/) - Comprehensive reference
- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)

## Exam Preparation Strategy

### Study Plan
1. **Start with MongoDB Basics** (1-2 weeks)
   - Complete M001: MongoDB Basics course
   - Review the Overview & Document Model section
   - Practice basic MongoDB operations in the shell

2. **Master CRUD Operations** (2-3 weeks)
   - Focus heavily on this section (51% of the exam)
   - Complete all CRUD examples in this repository
   - Practice writing queries with different operators
   - Understand cursor methods and projection

3. **Learn Indexing** (1 week)
   - Study different index types and their use cases
   - Practice creating and using indexes
   - Understand index selection and performance implications

4. **Study Aggregation** (1 week)
   - Learn the common pipeline stages
   - Practice building aggregation pipelines
   - Complete M121: The MongoDB Aggregation Framework

5. **Understand Schema Design** (1 week)
   - Study data modeling patterns
   - Practice designing schemas for different scenarios
   - Understand when to embed vs. reference

6. **Focus on Node.js Driver** (1-2 weeks)
   - Complete M220JS: MongoDB for JavaScript Developers
   - Practice all driver examples in this repository
   - Understand connection management and error handling

7. **Final Review and Practice Tests** (1 week)
   - Take practice tests to identify knowledge gaps
   - Review weak areas
   - Practice time management for the exam

### Exam Tips

1. **Focus on CRUD Operations** - This is over half the exam
2. **Practice with the Node.js Driver** - Be comfortable with connection options and CRUD operations
3. **Understand Indexing** - Know when and how to create different types of indexes
4. **Master Aggregation Pipeline** - Practice common stages like $match, $group, $project
5. **Study Schema Design Patterns** - Know embedding vs. referencing and when to use each
6. **Take Practice Tests** - Identify knowledge gaps before the exam
7. **Read Error Messages** - During coding challenges, pay attention to error messages
8. **Time Management** - Allocate time based on topic weights (spend more time on CRUD)
9. **Use Documentation** - Familiarize yourself with the MongoDB documentation structure
10. **Hands-on Practice** - Theory alone is not enough; write and run code regularly

## Directory Structure

```
mongodb-practice/
├── topics/                 # Topic-specific study materials
│   ├── 00-overview/        # MongoDB Overview & Document Model (8%)
│   ├── 01-basic-crud/      # CRUD Operations (51%)
│   ├── 02-indexes/         # Indexes (17%)
│   ├── 03-aggregation/     # Aggregation Pipeline (8%)
│   ├── 04-schema-design/   # Schema Design (16%)
│   ├── 05-nodejs-driver/   # Node.js Driver
│   └── 06-practice-tests/  # Practice Tests
├── utils/                  # Utility functions
└── index.js                # Main example file
```

## Additional Resources

- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI for MongoDB
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [MongoDB Community Forums](https://www.mongodb.com/community/forums/)
- [Stack Overflow MongoDB Tag](https://stackoverflow.com/questions/tagged/mongodb)
