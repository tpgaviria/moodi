// export const scopes = [
//     "user-top-read",
//     "user-read-currently-playing",
//     "user-read-playback-state",
// ];

export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "dcdae55729954846ba45fb98e9d768af";
export const redirectUri = "http://localhost:3000/callback";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "playlist-modify-public",
    "user-follow-read"
];