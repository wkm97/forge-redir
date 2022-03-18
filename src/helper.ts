import { Config, ExternalLocation, InternalLocation, MacroConfigUI } from "./types/redir-config";

export const redirConfigMapper = (uiConfig: MacroConfigUI): Config<InternalLocation | ExternalLocation> => {
  switch(uiConfig.type){
    case 'internal':
      const internalConfig: Config<InternalLocation> = {
        type: "internal",
        countdown: parseInt(uiConfig.countdown),
        visible: uiConfig.options.includes('visibile'),
        redirectable: uiConfig.options.includes('redirectable'),
        properties: {
          selectedSpace: uiConfig.selectedSpace,
          selectedContent: uiConfig.selectedContent,
        }
      }
      return internalConfig;
    case 'external':
      const externalConfig: Config<ExternalLocation> = {
        type: "external",
        countdown: parseInt(uiConfig.countdown),
        visible: uiConfig.options.includes('visibile'),
        redirectable: uiConfig.options.includes('redirectable'),
        properties: {
          link: uiConfig.link
        }
      }
      return externalConfig;
  }
}