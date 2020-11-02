module.exports = {
  canModifyQueue(member) {
    const { channelID } = member.voice;
    const botHackusate = member.guild.voice.channelID;

    if (channelID !== botHackusatee) {
      member.send("Kamu butuh gabung di Voice Channel dahulu.").catch(console.error);
      return;
    }

    return true;
  }
};