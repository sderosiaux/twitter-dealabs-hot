import request from 'request';
import client from './client.js';
import db from './db.js';
import awaitableVersionOf from './awaitableVersionOf.js';

const get = awaitableVersionOf(request.get, request);
const tweet = awaitableVersionOf(client.post, client);
const insert = awaitableVersionOf(db.insert, db);

function insertIntoDB(deal) {
  // ensure we are not going to process it again
  insert(deal)
    .catch(err => {
      console.error('Error inserting the deal into the db:', err.message);
    });
}

export default function processDeal(deal) {
  console.log(`${new Date().toISOString()} Going to tweet:`, deal.text);

  // not critical
  insertIntoDB(deal);

  // tweeting the message is the last step if everything went ok
  get({ url: deal.img, encoding: null })
    .then(result => tweet('media/upload', { media: result.body }))
    .then(media => tweet('statuses/update', { status: deal.text + ' ' + deal.href, media_ids: media.media_id_string }))
    .then(tweets => {
      console.log(`${new Date().toISOString()} Tweet ${deal.text} OK ! ${tweets.id}`);
    })
    .catch(error => {
      console.error('ERR:', error);
    });
}
