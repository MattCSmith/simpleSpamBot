const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  // Log when the bot is ready and online
  console.log(`Logged in as ${client.user.tag}!`);

  // Try to generate an invite link
  try {
    let link = await client.generateInvite({ scopes: ['bot'] });
    console.log('INVITE LINK', link);
  } catch (e) {
    console.log('READY EVENT - INVITE', e.stack, true);
  }
});

client.on('messageCreate', message => {
  // Detect if message was sent by a bot and end the event
  if (message.author.bot) return;

  // Auto delete nitro messages
  if (!message.member.roles.cache.some(r => ['Admin', 'Mods'].includes(r.name)) && message.content.toLowerCase().includes('nitro')) {
    // Get the channel to log to
    const moderation_channel = client.lookup('channel', 'moderation-log');

    // Log it
    moderation_channel.send(
      `Sender: ${message.author} (${message.author.username}#${message.author.discriminator}) \nChannel: ${message.channel.name}`
    );

    // Delete it
    message.delete({});
  }

  // Auto delete another nitro message variant
  if (message.content.toLowerCase().includes('this gift is for you bro')) {
    message.delete({});
  }
});

client.login('token');
