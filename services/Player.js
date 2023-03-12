const PlayerModel = require('../models/Player');
const MongoBase = require('./MongoBase');

class Player extends MongoBase {
    constructor() {
      super(PlayerModel);
    }
}

module.exports = new Player();