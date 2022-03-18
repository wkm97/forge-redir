import React, { useEffect, useRef, useState } from 'react';
import { invoke, router } from '@forge/bridge';
import SectionMessage from '@atlaskit/section-message';
import {Content} from '@servicerocket/conf-cloud-frontend';

interface Config {
  options: string[];
  countdown: string
}

function App() {
  const [targetLocation, setTargetLocation] = useState<Content | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const intervalId = useRef<NodeJS.Timeout|null>(null);

  const isVisible = () => {
    if(!config){
      return false
    }
    if(!config.options.includes('visible')){
      return false
    }
    return true
  }

  const isRedirectable = () => {
    if(!config){
      return false
    }
    if(!config.options.includes('redirectable')){
      return false
    }
    return true
  }

  const generateFullUrl = (location: Content | null) => {
    if(!location){
      return null;
    }
    const {_links} = location
    const fullUrl = `${_links.base}${_links.webui}`
    return fullUrl
  }

  useEffect(() => {
    invoke("getMacroConfiguration", {}).then(config=>console.log(config))

    invoke<Config>("getUserConfiguration", {}).then((config) => {
      setConfig(config)
      invoke<Content>("getTargetLocation", config).then((targetLocation: Content)=>{
        setTargetLocation(targetLocation)
      })
    })
  }, [])

  useEffect(()=>{
    if(config && targetLocation && isRedirectable()){
      clearInterval(intervalId.current as unknown as number)
      intervalId.current = setInterval(() => {
        const fullUrl = generateFullUrl(targetLocation);
        if(fullUrl){
          router.navigate(fullUrl).catch(()=>console.log('closed pop up'))
        }
        clearInterval(intervalId.current as unknown as number);
      }, parseInt(config.countdown) * 1000)
    }
  }, [targetLocation])

  return (
    <>
    {isVisible()? 
    <SectionMessage appearance="warning" title="Redirection Notice">
      <p>{'This page will redirect to '}
        <a id="redirect-location" onClick={() => {
          const fullUrl = generateFullUrl(targetLocation)
          if(fullUrl){
            router.navigate(fullUrl)
          }      
        }} target="_top">
          {targetLocation?.title}
        </a>.
      </p>
    </SectionMessage>
    : null}
    </>
  );
}

export default App;
