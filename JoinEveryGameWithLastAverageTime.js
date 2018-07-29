log('Starting JoinEveryGameWithLastAverageTime example script');

onmessage = function (e) {
    var data = e.data;

    if (data.type === 'endGame') {
        clearLog();
        log('End of the game, new balance is : ' + availableBalance);
        var avgLastGame = historyLastGames[0].averageClickingTime;
        join(avgLastGame);
        log('Joined next game with ' + avgLastGame);
    }
};