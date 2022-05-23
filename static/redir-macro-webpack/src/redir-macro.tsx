import SectionMessage from "@atlaskit/section-message"
import { Modal, router } from "@forge/bridge"
import React, { useRef } from "react"
import { useEffect } from "react"

export interface RedirProps {
  countdown: number,
  link: string,
  title: string,
  disabled?: boolean,
  visible?: boolean
}

const isSameDomain = (link: string) => {
  const currDomain = document.referrer
  return link.startsWith(currDomain)
}

export const RedirMacro: React.FC<RedirProps> = ({ countdown, link, title, disabled = false, visible=true }) => {
  const intervalIdForCountdown = useRef<NodeJS.Timeout | null>(null);

  const openModal = () => {
    const modal = new Modal({
      resource: 'redir-modal',
      onClose: (payload) => { },
      size: 'medium',
      context: {
        title,
        link,
        countdown
      },
    });
    modal.open();
  };

  useEffect(() => {
    if (!disabled && countdown) {
      intervalIdForCountdown.current = setInterval(() => {
        if (isSameDomain(link)) {
          openModal()
        } else {
          router.navigate(link).catch(() => console.log('closed pop up'))
        }
        clearInterval(intervalIdForCountdown.current as unknown as number);
      }, countdown * 1000)
    }
    return () => {
      clearInterval(intervalIdForCountdown.current as unknown as number);
    }
  }, [])

  if(visible){
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
  return null;
}