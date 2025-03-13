import { MyContext } from "../bot";
import { supabase } from "../supabase";

export async function matchCommand(ctx: MyContext) {
  const userId = ctx.from!.id;

  // Get current user
  const { data: currentUser, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id", userId)
    .single();

  if (userError || !currentUser || !currentUser.interests) {
    ctx.reply("لطفاً اول پروفایلت رو با /settings تکمیل کن!");
    return;
  }

  const userInterests = currentUser.interests || [];
  let matchedUser: typeof currentUser | null = null;

  // Find a match based on interests
  const { data: allUsers, error } = await supabase
    .from("users")
    .select("*")
    .neq("telegram_id", userId);

  if (error || !allUsers) {
    ctx.reply("مشکلی پیش اومد. بعداً امتحان کن!");
    return;
  }

  interface User {
    telegram_id: number;
    name?: string;
    age?: number;
    username?: string;
    interests?: string[];
  }

  matchedUser = allUsers.find((user: User): boolean =>
    userInterests.some(
      (interest: string): boolean => user.interests?.includes(interest) ?? false
    )
  );

  // Fallback to random match
  if (!matchedUser && allUsers.length > 0) {
    const randomIndex = Math.floor(Math.random() * allUsers.length);
    matchedUser = allUsers[randomIndex];
  }

  if (!matchedUser) {
    ctx.reply("هنوز کسی برای تطبیق پیدا نشد. بعداً امتحان کن!");
    return;
  }

  ctx.reply(
    `یه نفر پیدا شد!\n` +
      `نام: ${matchedUser.name || "ناشناس"}\n` +
      `سن: ${matchedUser.age || "نامشخص"}\n` +
      `علایق: ${matchedUser.interests?.join(", ") || "نامشخص"}\n` +
      `برای چت کردن: /chat @${matchedUser.username || "بدون نام کاربری"}`
  );
}
