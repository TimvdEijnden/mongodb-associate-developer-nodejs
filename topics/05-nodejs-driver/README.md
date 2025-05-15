# Node.js Driver

## Connection String options

MongoDB connection strings are used to connect to a MongoDB database. They follow a specific format and can include various options to customize the connection.

### Authentication Options
| Option | Default | Description |
|--------|---------|-------------|
| `authMechanism` | "SCRAM-SHA-1" | Authentication mechanism (`"SCRAM-SHA-1"`, `"SCRAM-SHA-256"`, `"MONGODB-X509"`) |
| `authSource` | admin | Database used for authentication |
| `authMechanismProperties` | {} | Properties for authentication mechanism |

### Connection Options
| Option | Default | Description |
|--------|---------|-------------|
| `connectTimeoutMS` | 30000 | Time to wait for initial connection |
| `socketTimeoutMS` | 0 | Time to wait for socket operations |
| `maxPoolSize` | 100 | Maximum number of connections in pool |
| `minPoolSize` | 0 | Minimum number of connections in pool |
| `maxIdleTimeMS` | 0 | Maximum time connection can be idle before being removed |
| `waitQueueTimeoutMS` | 0 | Time to wait for available connection |
| `keepAlive` | true | Enable TCP keep-alive |
| `keepAliveInitialDelay` | 120000 | Initial delay before TCP keep-alive |

### SSL/TLS Options
| Option | Default | Description |
|--------|---------|-------------|
| `tls` | false | Enable TLS/SSL |
| `tlsAllowInvalidCertificates` | false | Bypass certificate validation |
| `tlsAllowInvalidHostnames` | false | Bypass hostname verification |
| `tlsCAFile` | undefined | Path to CA file |
| `tlsCertificateKeyFile` | undefined | Path to certificate key file |
| `tlsCertificateKeyFilePassword` | undefined | Password for certificate key file |

### Read Concern Options
| Option | Default | Description |
|--------|---------|-------------|
| `readConcernLevel` | undefined | Read concern level (`"local"`, `"available"`, `"majority"`, `"linearizable"`, `"snapshot"`) |
| `readPreference` | "primary" | Read preference (`"primary"`, `"primaryPreferred"`, `"secondary"`, `"secondaryPreferred"`, `"nearest"`) |
| `maxStalenessSeconds` | -1 | Maximum replication lag for secondary reads |

### Write Concern Options
| Option | Default | Description |
|--------|---------|-------------|
| `w` | 1 | Write concern level (number of nodes, "majority") |
| `wtimeoutMS` | undefined | Time to wait for write concern |
| `journal` | false | Require write operations to journal |

### Deployment Options
| Option | Default | Description |
|--------|---------|-------------|
| `replicaSet` | undefined | Replica set name |
| `retryWrites` | true | Enable automatic retry of write operations |
| `retryReads` | true | Enable automatic retry of read operations |
| `directConnection` | false | Connect directly to host |

## Example Connection Strings

```javascript
// Basic connection
mongodb://localhost:27017/dbname

// Authentication with username and password
mongodb://username:password@localhost:27017/dbname

// Connection to replica set
mongodb://localhost:27017,localhost:27018,localhost:27019/dbname?replicaSet=rsname

// Connection with authentication and SSL
mongodb://username:password@localhost:27017/dbname?ssl=true&authSource=admin

// Connection with multiple options
mongodb://username:password@localhost:27017/dbname?authSource=admin&maxPoolSize=50&w=majority&wtimeoutMS=2500

// Connection with connection pooling options
mongodb://localhost:27017/dbname?maxPoolSize=200&minPoolSize=10&maxIdleTimeMS=30000

// Connection with read preferences
mongodb://localhost:27017/dbname?readPreference=secondary&maxStalenessSeconds=120

// Connection with write concern options
mongodb://localhost:27017/dbname?w=majority&journal=true&wtimeoutMS=5000
```

# Differences with mongosh 

- The Node.js driver uses JavaScript Promises for asynchronous operations, while `mongosh` uses callbacks.
- The Node.js driver requires explicit connection management, while `mongosh` handles connections automatically.
- The Node.js driver provides a more programmatic interface for interacting with MongoDB, while `mongosh` is a shell interface.
- The Node.js driver allows for more complex error handling and retry logic, while `mongosh` has simpler error handling.
- The Node.js driver supports connection pooling, while `mongosh` does not.
- The Node.js driver allows for more granular control over connection options, while `mongosh` has a simpler set of options.
