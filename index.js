const {MongoClient} = require('mongodb');
require('dotenv').config();

const {
    practiceBasicCrud,
    practiceQueryOperators,
    practiceModifyingResults,
    practiceReplaceOperations,
    practiceFindAndModify,
    practiceArrayOperators,
} = require('./topics/01-basic-crud/examples');

const {
    practiceIndexes,
    practiceHideIndex
} = require('./topics/02-indexes/examples');

const {practiceAggregation} = require('./topics/03-aggregation/examples');
const {practiceSchemaDesign} = require('./topics/04-schema-design/examples');
const {practiceTextSearch} = require('./topics/02-indexes/examples');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongodb_exam_prep';
const client = new MongoClient(uri, {serverSelectionTimeoutMS: 1000});

async function main() {
    try {
        const topic = process.argv[2] || 'all';
        try {
            console.log('Connecting to MongoDB: ', uri);
            await client.connect();
        }catch (err) {
            console.error('Error connecting to MongoDB: ', err);
            console.error('Did you start the server using: docker-compose up -d ?');
            return;
        }


        switch (topic) {
            case 'crud':
                await practiceBasicCrud(client);
                await practiceQueryOperators(client);
                await practiceModifyingResults(client);
                await practiceReplaceOperations(client);
                await practiceFindAndModify(client);
                await practiceArrayOperators(client);
                break;
            case 'query-results':
                await practiceQueryOperators(client);
                await practiceModifyingResults(client);
                break;
            case 'indexes':
                await practiceIndexes(client);
                await practiceTextSearch(client);
                await practiceHideIndex(client);
                break;
            case 'aggregation':
                await practiceAggregation(client);
                break;
            case 'schema':
                await practiceSchemaDesign(client);
                break;
            case 'all':
                await practiceBasicCrud(client);
                await practiceQueryOperators(client);
                await practiceModifyingResults(client);
                await practiceIndexes(client);
                await practiceTextSearch(client);
                await practiceAggregation(client);
                await practiceSchemaDesign(client);
                break;
            default:
                console.log('Available commands: crud, query-results, indexes, aggregation, schema, all');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main();
