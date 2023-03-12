const GroupModel = require('../models/Group');
const MongoBase = require('./MongoBase');

const Player = require('./Player');

class Group extends MongoBase {
    constructor() {
      super(GroupModel);
    }

    async addUser(group, playerId, eventId) {
      try {
        group.members = group?.members?.concat([playerId]);
        await group.save();

        const res = await Player.findOneAndUpdate({ 
          filter: {
            _id: playerId
          }, 
          update: {
            event: eventId,
            group: group?._id
          }
        });

        return group;
      } catch(err) {
        return null;
      }
    }
}

module.exports = new Group();