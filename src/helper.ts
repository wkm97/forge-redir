import { getContentById } from "./confluence";
import { Config, MacroConfigUI } from "./types/redir-config";

export const redirConfigMapper = async(uiConfig: MacroConfigUI): Promise<Config> => {
  switch(uiConfig.type){
    case 'internal':
      const content = await getContentById(uiConfig.selectedContent);
      console.log(content)
      const { _links } = content
      const internalConfig: Config = {
        type: "internal",
        countdown: parseInt(uiConfig.countdown),
        visible: uiConfig.options.includes('visible'),
        redirectable: uiConfig.options.includes('redirectable'),
        location: {
          title: content.title,
          link: `${_links.base}${_links.webui}`
        }
      }
      return internalConfig;
    case 'external':
      const externalConfig: Config = {
        type: "external",
        countdown: parseInt(uiConfig.countdown),
        visible: uiConfig.options.includes('visible'),
        redirectable: uiConfig.options.includes('redirectable'),
        location: {
          title: uiConfig.link,
          link: uiConfig.link
        }
      }
      return externalConfig;
  }
}