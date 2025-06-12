const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const config = require('./config.json');

const client = new Client();
let targetUserId = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addUrlToFile = (url) => {
  const filePath = path.join(__dirname, 'list.txt');
  let currentList = [];

  if (fs.existsSync(filePath)) {
    currentList = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
  }

  if (!currentList.includes(url)) {
    fs.appendFileSync(filePath, url + '\n');
    console.log(`[+] Added new Spotify track: ${url}`);
  } else {
    console.log(`[-] Duplicate track, not added: ${url}`);
  }
};

const processActivities = (user, activities) => {
  if (!activities || activities.length === 0) {
    console.log(`\nℹ️ No activities currently.`);
    return;
  }

  console.log(`\n📡 Presence update for: ${user.tag || user.id}`);

  activities.forEach((activity, index) => {
    console.log(`\n🔍 Activity [${index + 1}/${activities.length}]:`);
    console.log(`• Name: ${activity.name}`);
    console.log(`• Type: ${activity.type}`);
    console.log(`• Details: ${activity.details || 'N/A'}`);
    console.log(`• State: ${activity.state || 'N/A'}`);
    console.log(`• Application ID: ${activity.applicationId || 'N/A'}`);

    if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets) {
      console.log(`\n🎵 Spotify activity detected:`);

      const trackId = activity.syncId;
      const trackUrl = `https://open.spotify.com/track/${trackId}`;
      const trackName = activity.details;
      const artistName = activity.state;
      const albumName = activity.assets?.largeText || 'Unknown Album';
      const start = activity.timestamps?.start;
      const end = activity.timestamps?.end;

      console.log(`• Track: ${trackName}`);
      console.log(`• Artist(s): ${artistName}`);
      console.log(`• Album: ${albumName}`);
      console.log(`• Spotify URL: ${trackUrl}`);
      if (start && end) {
        const duration = Math.floor((end - start) / 1000);
        console.log(`• Duration: ${duration}s`);
      }

      addUrlToFile(trackUrl);
    }
  });
};

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  rl.question('👤 Enter target user ID to monitor: ', (uid) => {
    targetUserId = uid.trim();
    rl.close();

    console.log(`\n🔎 Waiting for presence updates from user ID: ${targetUserId}...`);
  });
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  if (!newPresence || newPresence.user?.id !== targetUserId) return;
  processActivities(newPresence.user, newPresence.activities);
});

client.login(config.token);
