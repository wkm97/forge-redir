import React, { useEffect, useRef, useState } from 'react';
import { invoke, router, requestConfluence } from '@forge/bridge';
import SectionMessage from '@atlaskit/section-message';

function App() {
  const [targetLocation, setTargetLocation] = useState(null);
  const [config, setConfig] = useState(null);
  const intervalId = useRef(null);

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

  const generateFullUrl = (location) => {
    if(!location){
      return null;
    }
    const {_links} = location
    const fullUrl = `${_links.base}${_links.webui}`
    console.log(fullUrl)
    return fullUrl
  }

  useEffect(async() => {
    invoke("getUserConfiguration", {}).then((config) => {
      console.log(config)
      setConfig(config)
      invoke("getTargetLocation", config).then((targetLocation)=>{
        setTargetLocation(targetLocation)
      })
    })
  }, [])

  useEffect(()=>{
    if(targetLocation && isRedirectable()){
      clearInterval(intervalId.current)
      intervalId.current = setInterval(() => {
        router.navigate(generateFullUrl(targetLocation)).catch(()=>console.log('closed pop up'))
        clearInterval(intervalId.current);
      }, parseInt(config.countdown) * 1000)
    }
  }, [targetLocation])

  return (
    <>
    {isVisible()? 
    <SectionMessage appearance="warning" title="Redirection Notice">
      <p>{'This page will redirect to '}
        <a id="redirect-location" onClick={() => router.navigate(generateFullUrl(targetLocation))} target="_top">
          {targetLocation?.title}
        </a>.
      </p>
    </SectionMessage>
    : null}
    </>
  );
}

export default App;
