import Datastore from 'nedb';

const db = new Datastore({ filename: 'hot.db', autoload: true });
db.ensureIndex({ fieldName: 'text', unique: true });

export default db;
