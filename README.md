# Dance Dance Pose

[Watch our Presentation](https://youtu.be/PJRBaXsnw8Y)

Dance Dance Pose puts your singing and dancing skills to the test by utilizing motion capture and pitch detection inspired by popular games such as Dance Dance Revolution and Rockband. Users must sing on key and dance to their favorite songs in order to earn points. Utilizing both web audio detection and pose detection through Posenet by TensorFlow, the game allows users to experience their favorite songs in an entirely new format.

### Features Included:

* Select a song and level of difficulty
* Motion recognition to identify the player's dancing moves
* Pitch detection to capture the player's singing pitch
* Real-time multiplayer
* Add your score to the leaderboard

## Gameplay

### Homepage

<img src="https://imgur.com/YVkzyIi.gif" width="50%" height="50%">

### Instructions

<img src="https://imgur.com/GEwnkDO.gif" width="50%" height="50%">

### Songs

<img src="https://imgur.com/imiSaLP.gif" width="50%" height="50%">

### Dancing/Singing

<img src="https://i.imgur.com/BXonBOF.gif" width="50%" height="50%">

<img src="https://i.imgur.com/oWo8J3R.gif" width="50%" height="50%">

## Build

* TensorFlow's Posenet technology captures dancing motions of one or more players
* Pitch detection is captured using a web audio API called Web Audio DAW (WAD)
* User interfaces were built using React.js and Redux to store information in single source of truth
* Leaderboard information is stored in a backend database using PostGres and Sequelize
* Heroku deployed the game and Travis CI's continuous integration updated our game throughout the building process

## Running Game Locally

To play this game, please follow these steps:

1.  Fork or clone this repository
2.  Run the following command `npm install npm run start-dev`

## Developers

Paola Neira, Jimmy Huang, Joe Costa, and Sean Ryan
