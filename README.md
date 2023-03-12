Gamegos Case Study
======================

Application uses a local MongoDB database. Connection string I used is: mongodb://localhost:27017/gamegos
Application also uses redis-server. You need to install redis CLI and run locally. It should run on default port which is 6379.


EVENT API
--------

### ERD for Non-SQL Database Structure

<img width="683" alt="Ekran Resmi 2023-03-12 20 46 02" src="https://user-images.githubusercontent.com/73586955/224562690-409768e4-4ce6-4526-9ea9-df9d27821da6.png">

### Pseudocode for whole logic with comments

```
function joinEvent(eventId, playerId) {

    try {
        // check if the player has already joined the event
        if (hasPlayerJoinedEvent(eventId, playerId)) {
            releaseLock(lockKey); // release the lock if the player has already joined
            return "Player has already joined the event.";
        }

        // find the group category based on the player's level
        groupCategory = getGroupCategory(playerId);

        // find the event and the groups
        event = findEventById(eventId);
        groups = event.groups;

        // find the first group in the group category that has less than 20 players
        group = findAvailableGroup(groups, groupCategory);

        if (group == null) {
            releaseLock(lockKey); // release the lock if no group is available
            return "No available group in the player's group category.";
        }

        // create a Redis lock key with the eventId and playerId
        lockKey = "lock:event:" + eventId + ":player:" + playerId;
        
        // acquire the lock
        acquired = acquireLock(lockKey);

        // add the player to the group
        group.players.push(playerId);

        // update the group in the event
        for (i = 0; i < groups.length; i++) {
            if (groups[i].id == group.id) {
                groups[i] = group;
                break;
            }
        }

        // update the event in the database
        updateEvent(event);

        releaseLock(lockKey); // release the lock

        return "Player has successfully joined the event.";
    } catch (err) {
        releaseLock(lockKey); // release the lock if an error occurs
        throw err;
    }
}

```

