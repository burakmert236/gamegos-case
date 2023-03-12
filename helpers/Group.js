const Group = require('../services/Group');

const findIdealGroupForPlayer = async (groups, category, event) => {
    try {
        let idealGroup = null;
        let minGroupSize = 20;

        for (const group of groups) {
            // find a group with same category of the player
            // if there is more than one available groups, 
            // choose the group with the least number of player to balance the groups
            if(group?.category === category && group?.members?.length < minGroupSize) {
                idealGroup = group;
                minGroupSize = group?.members?.length;
            }
        }

        // if there is no available group, create a new one
        if(!idealGroup) {
            const newGroup = await Group.create({
                category,
                members: [],
                event: event?._id
            });
            idealGroup = newGroup;

            event.groups = event.groups.concat([newGroup?._id]);
            await event.save();
        }

        return idealGroup;
    } catch(err) {
        return null;
    }
};

module.exports = {
    findIdealGroupForPlayer
}