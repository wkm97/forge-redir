import { invoke } from "@forge/bridge";
import React, { useEffect, useState } from "react"
import { RedirMacro } from "./redir-macro"
import { Config } from "./types/redir-config";

const App = () => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    invoke<Config>("getMacroConfiguration", {}).then(config => setConfig(config))
  }, [])

  if(config?.visible){
    const {title, link} = config.location
    return (
      <RedirMacro 
        title={title}
        link={link}
        countdown={config?.countdown} 
        disabled={!config?.redirectable}
      />
    )
  }
  return null
}

export default App;

import '@atlaskit/css-reset';
import ReactDOM from "react-dom"

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);