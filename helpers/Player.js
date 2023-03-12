const findCategoryOfPlayer = (player) => {
    if(player?.level < 20) {
        return "Bronze";
    } else if(player?.level < 50) {
        return "Silver";
    } else {
        return "Gold";
    }
};

module.exports = {
    findCategoryOfPlayer
}