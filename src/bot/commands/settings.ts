import { Scenes } from "telegraf";
import { User } from "../../types/user";
import { MyContext } from "../bot";
import { supabase } from "../supabase";

const profileWizard = new Scenes.WizardScene<MyContext>(
  "PROFILE_WIZARD",
  // Step 1: Ask for name
  async (ctx) => {
    await ctx.reply("اسمت چیه مهندس؟");
    return ctx.wizard.next();
  },
  // Step 2: Save name, ask for age
  async (ctx) => {
    const text = ctx.message && "text" in ctx.message ? ctx.message.text : null;
    if (!text) {
      await ctx.reply("لطفا اسمت رو درست بنویس. مرسی.");
      return;
    }
    // @ts-expect-error idk wtf is it
    ctx.wizard.state.profile = { name: text }; // Fixed ctx.msg to ctx.message
    await ctx.reply("آهان. خوشوقتم. چند سال‌ته؟ ");
    return ctx.wizard.next();
  },
  // Step 3: Save age, ask for interests
  async (ctx) => {
    const text = ctx.message && "text" in ctx.message ? ctx.message.text : null;
    const age = parseInt(text || "");
    if (isNaN(age) || age < 13 || age > 50) {
      await ctx.reply(
        "از پذیرفتن افراد زیر ۱۳ سال و یا بالای ۵۰ سال معذوریم. پوزش."
      );
      return;
    }
    // @ts-expect-error idk wtf is it
    ctx.wizard.state.profile.age = age;
    await ctx.reply(
      "خیلی هم عالی. سرگرمی ها و تفریحات مورد علاقه‌ات چیا هستن؟ مثلا فوتبال، فیلم، باشگاه، مسافرت و ..."
    );
    return ctx.wizard.next();
  },
  // Step 4: Save interests and finish
  async (ctx) => {
    const text = ctx.message && "text" in ctx.message ? ctx.message.text : null;
    if (!text) {
      await ctx.reply("خداوکیلی اذیت نکن. درست بفرست.");
      return;
    }
    const interests = text.split(",").map((i: string) => i.trim());
    // @ts-expect-error idk wtf is it
    ctx.wizard.state.profile.interests = interests;

    const userId = ctx.from?.id ?? 0;
    const { error } = await supabase.from("users").upsert({
      telegram_id: userId,
      username: ctx.from!.username,
      // @ts-expect-error idk wtf is it
      name: ctx.wizard.state.profile.name,
      // @ts-expect-error idk wtf is it
      age: ctx.wizard.state.profile.age,
      // @ts-expect-error idk wtf is it
      interests: ctx.wizard.state.profile.interests,
      coins: 0,
    });
    const user: User = {
      telegramId: userId,
      username: ctx.from?.username,
      // @ts-expect-error idk wtf is it
      profile: ctx.wizard.state.profile,
      coins: 0,
    };
    if (error) {
      console.error("Error saving user:", error);
      ctx.reply("مشکلی پیش اومد. دوباره امتحان کن!");
      return;
    }

    await ctx.reply(
      `پروفایل شما تکمیل شد!\n` +
        // @ts-expect-error idk wtf is it
        `نام: ${ctx.wizard.state.profile.name}\n` +
        // @ts-expect-error idk wtf is it
        `سن: ${ctx.wizard.state.profile.age}\n` +
        // @ts-expect-error idk wtf is it
        `علاقه‌مندی‌ها: ${ctx.wizard.state.profile.interests?.join(", ")}\n` +
        `هر وقت خواستی با /settings می‌تونی تغییرش بدی.`
    );
    return ctx.scene.leave();
  }
);

const stage = new Scenes.Stage<MyContext>([profileWizard]);

export function settingsCommand(ctx: MyContext) {
  ctx.scene.enter("PROFILE_WIZARD");
}

export { stage };
