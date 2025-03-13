import { Scenes } from "telegraf";

declare module "telegraf" {
  interface Context {
    scene: Scenes.SceneContextData; // Adds scene to Context
    wizard: Scenes.WizardContextData; // Adds wizard to Context (for WizardScene)
  }
}
