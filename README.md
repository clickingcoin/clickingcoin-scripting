# ClickingCoin Scripting

Here below is a usefull guide to create scripts to play on ClickingCoin.

## Informations

* Every executed script runs in a JS `Worker` from the [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), therefore you don't have access to the html DOM
* You can't tick "Auto join games" and enable the scripting session at the same time
* Your script will never stop by itself (not even when reaching the end of the script) due to ClickingCoin game system, to stop your script : 
  * use manual "Stop script" button
  * use `stop()`function
  * use `logError(error)` function
  * throw an error

## Available functions

### log(toLog)

Output the given string to the log window.

`toLog`-> String

### logError(error)

Output the given error string to the log window and stop the script execution.

`error`-> String

### clearLog()

Clear the log window.

### join(clickTime)

Join the next game with the specified float number.

**You cannot use `join()` if there is already a game in progress.**

`clickTime`-> Number, must be between 0.001 and 9.999 (if not, throws an error displayed in the logs)

### stop()

Stop the script execution.

## Available data

### availableBalance - Number

Returns your current available XRP balance.

### gameBet - Number

Returns current game bet in XRP.

### playerCount - Number

Returns the number of players who joined the current game (or next game if no game is launched).

### historyLastGames[] - Array

Contains at least the last 10 games history, order by `startedOn` descending (the most recent one is the first one : `historyLastGames[0]`)

Here is a exemple of what you can find in each `GameHistory` :

```javascript
{
   startedOn: 'Sun Jul 29 2018 13:27:30' // Date - when the game started
   bet: 10, // Number - the bet of the game
   bestWinningTime: 1.248, // Number - best winning player time
   worstWinningTime: 5.392, // Number - worst winning player time
   players: [ // Array of players who played this game
      {
         isMe: true //Boolean - specify if it's you or not (not available on past 10 games at arrival on page, in this case returns undefined)
         hasWin: true, // Boolean - if the player has win
         earnings: 6.84, // Number - earnings of the player in XRP
         clickedPosition: 3, // Number - the click position of the player
         clickedTime: 3.145 // Number - the click time of the player
      },
      {
         isMe: false,
         hasWin: false,
         earnings: 0,
         clickedPosition: 1,
         clickedTime: 6.846
      }
   ]
}
```
## Available event listeners

Here is an exemple of how you add an event listener : (use `msg.data` to access the associated event data in this example)

```javascript
onmessage = function (e) {
    var msg = e.data;

    if (data.type === 'availableBalance') {
       var newBalance = msg.data;
       //your awesome algorithm
    }
};
```

### availableBalance - Number

Triggered when your balance is updated, and returns the new balance.
```javascript
var newBalance = msg.data;
```

### playerJoined

Triggered when a player joins the next game, this updates `playerCount`.

### playerLeft

Triggered when a player leaves the next game, this updates `playerCount`.

### endGame - Number and GameHistory

Triggered when a game is over.

This update `playerCount` and returns the game's history. The `GameHistory` is also available in `historyLastGames[0]`.

```javascript
var newPlayerCount = msg.data.playerCount;
var newGameHistory = msg.data.gameHistory;
```

## Examples

- [JoinEveryGameWithLastAverageTime.js](JoinEveryGameWithLastAverageTime.js) : This script allows you to join the next game with the last game average winning time.

## Help

If you need more help or you want access to more data and examples, don't hesitate to ask it in the chat or send us a mail to [contact@clickingcoin.com](mailto:contact@clickingcoin.com?Subject=Scripting)