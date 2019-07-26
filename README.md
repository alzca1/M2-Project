# Spotypooh

## Description

Short songs for busy people. App to create your favourite playlists and populate them with artists, albums and songs you love. This app is intended for busy people who have enough with 30-second songs.


## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup.

- **sign up** - As a user I want to sign up on the webpage so that I can start to use the app.

- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account.

- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.

- **home screen** -  As a user I want to have a general view of my playlists, my favourite artists,my favourite albums as well as the search bar. Also, I will see a fixed nav(that will be present throughout all my private screens) at the bottom of the screen with three buttons: home, search and my playlists).

- **settings screen** - As a user I want to see my profile, the number of playlists I own, followed users and followers. Besides, I can also change some of my personal details (change password, mail, profile picture and social networks).

- **search results** - As a user I want to get the results from my search (artists by now) and access to any of them.

- **artist screen** - As a user I want to see a all the info of the chosen artist (name, picture, brief description and albums).

- **album screen** -  As a user I want to see all the info about the album (album cover picture if available, name, short description if available, and the songs).

- **playlist screen** - As a user I want to be able see all the songs saved in my playlist with an access to possible actions (remove song from playlist, share, see album, see artist and like/unlike song).

- **playback bar** - As a user I want to be able play my song and be able to skip the song or go to previous/next song.

- **like/unlike** - As a user I want to be able to like/unlike my favourite songs to add/remove them automatically to/from a special favourite playlist.

## Backlog

API:
- Connect to a lyrics API (MusixMatch) to get lyrics for the current song.
- Connect to a events API (Eventbrite) to get future concerts of a given artist.
- Connect to a maps API (Mapbox) to place future events on a map.

Additional Screens:
- Render a playlists screen.

Advanced search:

- Perform search based not only on artists but also albums and tracks.

Users interaction:

- Follow other users.
- Follow other users' playlists.

Delete my account:

- Delete the user from users collection. Redirect the logout.

Other features:

- Locate concerts based on my favourite artists.
- Get lyrics for my favourite songs.


## ROUTES:

|Method|URL|Description|
|------|---|-----------|
|GET|/|Renders the homepage.|
|GET|/auth/signup|	Renders the signup page.|
|POST|/auth/signup| Add info from users to a database and redirect to main private screen.
|GET|/auth/login|	Renders the login page.
|POST|/auth/login|	Check if the user is in the database and give it access. Redirect to main private screen.
|GET|/auth/logout|	End user session. Redirect to the homepage.
|GET|/settings|	Renders the settings page.
|POST|/settings|	Update the user info. Redirect the settings page.
|GET|/userHome/	Renders the main private screen.
|POST|/userHome/Search|	Check results against API and redirect to search results
|GET|/search/:id/|	Renders all the artists from our search
|GET|/artist/:id/|	Renders the artist picture, info and albums
|GET|/albumTracks/:id/|	Renders the tracks from a given album
|POST|/AlbumTracks/:id/|addToPlaylist	Add song to playlist.
|POST|/AlbumTracks/:id/likeSong|	Add song to favourites playlist.
|GET|/playlist/:id/|	Renders the playlist page
|POST|/playlist/:id/deleteFromPlaylist|	delete song from playlist.
|POST|/laylist/:id/unlikeSong|	delete song from favourite playlist.



## Design framework
- Home page
- Login page
- Signup page
- User Home page
- Settings page
- Search results page
- Artist page
- Album page
- Playlist page


## Models

User model

```
picture: String
username: String
location: String
email: String
password: String
shareNetworks: {Object}
artists: [Array]
albums: [Array]
tracks: [Array]
following: [Array]
followers: [Array]
```

Playlist model

```
name: String
owner: String
images: [Array]
tracks: [Array]

```


## Links

### Kanban board

https://trello.com/b/VWUid2FH

### Git

The url to your repository and to your deployed project

[Repository Link] https://github.com/alzca1/M2-Project

[Deploy Link]

### Slides

The url to your presentation slides

[Slides Link]


