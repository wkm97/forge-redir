import api, {requestConfluence, route } from "@forge/api";
import Resolver from "@forge/resolver";
import { getContentById, getContentsBySpaceKey } from "./confluence";

const resolver = new Resolver();

resolver.define('getUserConfiguration', async({payload, context})=> {
    const userConfiguration = context.extension.config
    return userConfiguration
})

resolver.define('getTargetLocation', async({payload, context})=>{
    const {selectedSpace, selectedContent} = payload;
    const results = await getContentById(selectedContent);
    return results
})

export const handler = resolver.getDefinitions();
