import SectionMessage from "@atlaskit/section-message"
import { router } from "@forge/bridge"
import React, { useRef } from "react"
import { useEffect } from "react"

interface Props {
    countdown: number,
    link: string,
    title: string,
    disabled: boolean
}

const isSameDomain = (link: string) => {
  const currDomain = document.referrer
  return link.startsWith(currDomain)
}

export const RedirMacro = ({countdown=5, link, title, disabled=false}: Props) => {
    const intervalId = useRef<NodeJS.Timeout|null>(null);

    isSameDomain(link)

    useEffect(()=>{
        if(!disabled){
            intervalId.current = setInterval(() => {
                if(isSameDomain(link)){
                  if(confirm(`Redirect to ${title}?`)){
                    router.navigate(link).catch(()=>console.log('closed pop up'))
                  }
                }else{
                  router.navigate(link).catch(()=>console.log('closed pop up'))
                }
                clearInterval(intervalId.current as unknown as number);
            }, countdown * 1000)
        }
        return () => {
            clearInterval(intervalId.current as unknown as number);
        }
      }, [])

    return (
        <SectionMessage appearance="warning" title="Redirection Notice">
          <p>{'This page will redirect to '}
            <a id="redirect-location" onClick={() => router.navigate(link)} target="_top">
              {title}
            </a>.
          </p>
        </SectionMessage>
      );
}