import api, {requestConfluence, route } from "@forge/api";
import Resolver from "@forge/resolver";
import { getContentById, getContentsBySpaceKey } from "./confluence";
import { redirConfigMapper } from "./helper";
import { MacroConfigUI } from "./types/redir-config";

const resolver = new Resolver();

const mockConfig = {
    type: 'internal',
    selectedContent: '21037057',
    options: [ 'visible', 'redirectable' ],
    countdown: '3',
    selectedSpace: 'WKMDEV'
}

resolver.define('getUserConfiguration', async({payload, context})=> {
    const config = context.extension.config as MacroConfigUI
    return config
})

resolver.define('getMacroConfiguration', async({payload, context})=> {
    const uiConfig = context.extension.config as MacroConfigUI
    const config = await redirConfigMapper(uiConfig)
    console.log(config)
    return config
})

resolver.define('getContentLocation', async({payload, context})=>{
    const {selectedSpace, selectedContent} = payload;
    const results = await getContentById(selectedContent);
    return results
})

export const handler = resolver.getDefinitions();
