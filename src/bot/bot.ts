import { Context, Scenes, Telegraf } from "telegraf";

export interface MyContext extends Context {
  myCtxProp: string;
  scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
  wizard: Scenes.WizardContextWizard<MyContext>;
}

const bot = new Telegraf<MyContext>(
  "7464602522:AAHZEP7222wQBLulor8IRMtFQ6PMVXPyO5E"
);

export default bot;
