const Player = require('../services/Player');
const Event = require('../services/Event');
const Group = require('../services/Group');

const { findCategoryOfPlayer } = require('../helpers/Player');
const { findIdealGroupForPlayer } = require('../helpers/Group');
const { acquireLock } = require('../helpers/Redis');

const httpStatus = require('http-status');

const join = async (req, res) => {
    try {
        const playerId = req.body.playerId;
        const eventId = req.body.eventId;

        // all fields are required to joining an event
        if(!playerId || !playerId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "Bad request" })
        }

        // fetch player object
        const player = await Player.findOne({ filter: { _id: playerId } });
        if(!player) {
            return res.status(httpStatus.NOT_FOUND).send({ message: "Player not found" })
        }

        // fetch event object
        const event = await Event.findOne({ filter: { _id: eventId }, populate: 'groups' });
        if(!event) {
            return res.status(httpStatus.NOT_FOUND).send({ message: "Event not found" })
        }

        // check whether player is already in the event
        if(player?.event?.toString() === eventId) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "Player already joined the event" })
        }

        // check whether player is a member of another event
        if(player?.event) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "Player is already a member of another event, leave it first to join a new event" })
        }

        // get category of the player
        const playerCategory = findCategoryOfPlayer(player);

        // acquire a lock to prevent race conditions
        const lockKey = `event:${eventId}:player:${playerId}`;
        const doneLock = await acquireLock(lockKey);

        // find an ideal group for the player or create a new one
        const group = await findIdealGroupForPlayer(event?.groups, playerCategory, event);
        if (!group) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error while finding a suitable group' });
        }

        // add user to group and update event field of th user
        const updatedGroup = await Group.addUser(group, player?._id, event?._id);

        // release lock after all data saved on db
        await doneLock();

        return res.status(httpStatus.OK).send({
            groupId: updatedGroup?._id,
            members: updatedGroup?.members
        })

    } catch(err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message })
    }
};

module.exports = {
    join
};