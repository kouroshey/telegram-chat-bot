import { Context } from "telegraf";

export function faqCommand(ctx: Context) {
  ctx.reply(
    `Here are some frequently asked questions:\n\n` +
      `1. **What does this robot do for you?**\n` +
      `   - This bot helps you find people to chat with privately and explore online dating options.\n\n` +
      `2. **How can you use it?**\n` +
      `   - Simply start by setting up your profile with /settings and explore matches or chats!\n\n` +
      `3. **How can I send a referral code and give some coins?**\n` +
      `   - Use /referral to get your unique code. Share it, and when someone joins with it, you’ll earn coins!\n\n` +
      `4. **How can I change profile settings?**\n` +
      `   - Type /settings to update your profile details anytime.\n\n` +
      `Have more questions? Just ask!`
  );
}
