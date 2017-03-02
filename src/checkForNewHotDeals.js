import cheerio from 'cheerio';
import request from 'request';

import config from '../config.json';
import awaitableVersionOf from './awaitableVersionOf.js';
import tweetIfNotDoneYet from './tweetIfNotDoneYet.js';

const get = awaitableVersionOf(request.get, request);

export default function checkNewHotDeals() {
  get(config.url)
    .then(result => result.body)
    .then(body => {
      const $ = cheerio.load(body);
      // limit length 140 = 93 + 47 (" http://t.co/71yqLEdXZU http://t.co/71yqLEdXZU")
      const deals = $('article.deal_index_article').map((_, el) => ({
        text: $(el).find('a.title').text().substring(0, 93),
        href: $(el).find('a.title').attr('href'),
        img: $(el).find('.image_part_contener img').attr('src'),
      })).get();

      deals.forEach(deal => tweetIfNotDoneYet(deal));
    })
    .catch(err => {
      console.error(`Error while parsing the url: `, err);
    });
}

