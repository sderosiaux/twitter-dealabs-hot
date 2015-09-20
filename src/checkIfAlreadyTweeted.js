import db from './db.js';
import awaitableVersionOf from './awaitableVersionOf.js';

const count = awaitableVersionOf(db.count, db);

export default function checkIfAlreadyTweeted(deal) {
  return count({ text: deal.text })
    .then(result => (result > 0))
    .catch(err => {
      console.error('Error checking if the deal already exists in the db:', err.message);
    });
}
