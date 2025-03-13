import { session } from "telegraf";
import { startCommand } from "./commands/start";
import { faqCommand } from "./commands/faq";
import { referralCommand } from "./commands/referral";
import { settingsCommand, stage } from "./commands/settings";
import bot from "./bot";
import { matchCommand } from "./commands/match";

bot.use(session()); // Required for wizard state
bot.use(stage.middleware());

// Register commands
bot.command("start", startCommand);
bot.command("faq", faqCommand);
bot.command("settings", settingsCommand);
bot.command("referral", referralCommand);
bot.command("match", matchCommand);

bot
  .launch()
  .then(() => console.log("Bot is running..."))
  .catch((err) => console.error("Error launching bot:", err));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
