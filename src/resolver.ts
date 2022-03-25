import api, {requestConfluence, route } from "@forge/api";
import Resolver from "@forge/resolver";
import { getContentById, getContentsBySpaceKey } from "./confluence";
import { redirConfigMapper } from "./helper";
import { MacroConfigUI } from "./types/redir-config";

const resolver = new Resolver();

resolver.define('getMacroConfiguration', async({payload, context})=> {
    const uiConfig = context.extension.config as MacroConfigUI
    const config = await redirConfigMapper(uiConfig)
    return config
})

export const handler = resolver.getDefinitions();
