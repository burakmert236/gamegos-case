const EventModel = require('../models/Event');
const MongoBase = require('./MongoBase');

class Event extends MongoBase {
    constructor() {
      super(EventModel);
    }
}

module.exports = new Event();