import React, { useState } from "react"
import Button from '@atlaskit/button/standard-button';

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { useEffect } from "react";
import { router, view } from "@forge/bridge";
import ReactDOM from "react-dom";
import '@atlaskit/css-reset';
import { RedirProps } from "./redir-macro";


export const RedirModal = () => {
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    (async () => {
      const context: any = await view.getContext();
      const { title, link } = context.extension.modal as RedirProps;
      setLink(link)
      setTitle(title)
    })();
  }, []);

  return (

    <Modal height="100%" width="100%">
      <ModalHeader>
        <ModalTitle appearance="warning">
          Opening <b>{title}</b>.
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p><b>forge-redir</b> is redirecting you to <b>{title}</b>. Confirm the action before you continue.</p>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={() => view.close()}>Cancel</Button>
        <Button
          appearance="warning"
          autoFocus
          onClick={() => {
            router.navigate(link);
            view.close()
          }}
        >
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RedirModal />
  </React.StrictMode>,
  document.getElementById("root")
);