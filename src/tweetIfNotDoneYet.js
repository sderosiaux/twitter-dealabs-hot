import checkIfAlreadyTweeted from './checkIfAlreadyTweeted.js';
import processDeal from './processDeal.js';

export default function tweetIfNotDoneYet(deal) {
  checkIfAlreadyTweeted(deal)
    .then(already => {
      if (!already) {
        processDeal(deal);
      }
    });
}
