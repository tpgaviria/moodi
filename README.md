# Moodi

Moodi is a browser application that matches the current weather or a mood that you choose to a custom Spotify playlist created just for you.

## How it Works
OpenWeatherMap API is used to get the current weather. After logging into Spotify, Moodi first identifies your top ten artists. Then a playlist is created matching your taste in music and the weather's attributes (ex: if raining, songs will be lower energy, in a minor key, more acoustic, etc). There is also a mood dropdown option that will do the same, only instead matching that mood (ex. Dance Party will be higher energy with high danceability).


#### Syncing Lights Still in Development
When "Sync Lights" is clicked, Moodi will connect to your LIFX wifi light bulbs and change color based on the weather or mood you chose. LIFX currently does not have a public API that provides a token, so lights will only work if your LIFX Key is provided as an environment variable.


## Technologies Used
- React for Front-End
- Node and Express for Back-End
- Axios for API calls
- Passport.js for Authorization
- Bootstrap for styling
