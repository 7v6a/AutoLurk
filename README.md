# Discord Spotify Tracker 🎵

A Discord selfbot that monitors a user's Spotify activity and saves unique track URLs to a file.

**Note:** Due to me being lazy, the song playing *immediately* on joining a Listen Along party won't be saved. This is an easy fix - PRs are welcome! ❤️  

This is the 'legendary' script used to create [this playlist](https://open.spotify.com/playlist/1PGjUP3FVlsRwEc4leLhrd?si=3c02b963f7cc44b2). <br>
No, this is NOT exactly the same one, it's a slightly edited one that isn't fully automatic. I cannot release the full version.


## Quick Start Guide

To convert links from `list.txt` into a Spotify playlist:

1. Create a new playlist in Spotify
2. Open your `links.txt` file and select all links
3. Launch the Spotify Desktop app
4. Paste the links directly into your new playlist
5. Enjoy your new playlist!

*Contributions to improve this workflow are appreciated!*
   
## preview

// soon lol


## Features ✨
- Tracks a specific user's Spotify listening activity in real-time
- Saves unique Spotify track URLs to `list.txt`
- Displays detailed track information (name, artist, album, duration)
- Prevents duplicate entries in the track list

## Prerequisites 📋
- Node.js v16.6.0 or higher
- npm or yarn
- A Discord account (for the selfbot)

## Installation 🛠️

1. Download/Clone the Repo
2. Install dependencies:
   ```bash
   nnpm install discord.js-selfbot-v13
   ```
3. Create a config.json file with your Discord token:
   ```json
   {
    "token": "YOUR_DISCORD_TOKEN_HERE"
    }
   ```
   ⚠️ Important: This is a selfbot, which is against Discord's ToS. Use at your own risk.

   ## Usage 🚀

1. Start the bot:
     ```bash
     node index.js
     ```
2. When prompted, enter the Discord User ID of the person you want to track.
   Preferably the 'owner' of the Listen Along Lobby (the person you joined + I recommend to have them friended or at least 3 servers in common to make it consistent)

3. The bot will:

    Monitor the target user's presence updates

    Detect when they're listening to Spotify

    Save unique track URLs to list.txt

    Display track information in the console

4. Example Output:
```  
✅ Logged in as YourUsername#0000
👤 Enter target user ID to monitor: 123456789012345678

🔎 Waiting for presence updates from user ID: 123456789012345678...

📡 Presence update for: TargetUser#1234

🔍 Activity [1/1]:
• Name: Spotify
• Type: LISTENING
• Details: Song Name
• State: Artist Name
• Application ID: 1234567890123456

🎵 Spotify activity detected:
• Track: Song Name
• Artist(s): Artist Name
• Album: Album Name
• Spotify URL: https://open.spotify.com/track/abc123
• Duration: 237s
[+] Added new Spotify track: https://open.spotify.com/track/abc123
```

## Disclaimer ⚠️

This project is for educational purposes only. Selfbots violate Discord's Terms of Service. Use at your own risk - the developer is not responsible for any account actions taken by Discord.
