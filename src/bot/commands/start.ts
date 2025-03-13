import { MyContext } from "../bot";

export function startCommand(ctx: MyContext) {
  ctx.reply(
    `سلام. به ربات دوست‌یابی خوش‌آمدید! 🌟\n\n` +
      `من اینجام تا به شما کمک کنم تا به راحتی با افراد دیگه ارتباط بگیرید و یک گفتگوی کاملا محرمانه داشته باشید \n` +
      `از دستور زیر برای اطلاعات بیشتر استفاده کنید:\n` +
      `/faq - سوالات متداول`
  );
  ctx.scene.enter("PROFILE_WIZARD");
}
