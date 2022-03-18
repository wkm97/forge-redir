
import api, { route } from "@forge/api";
import {Content, Space} from '@servicerocket/conf-cloud-utils';
import ForgeUI, { TextField, MacroConfig, render, Select, Option, useConfig, useProductContext, useEffect, CheckboxGroup, Checkbox, Fragment } from "@forge/ui";
import { useState } from "@forge/ui";
import { getAllSpaces, getContentsBySpaceKey } from "./confluence";

const InternalConfiguration = () => {
  const config = useConfig();
  const context = useProductContext();
  const [spaces, setSpaces] = useState<Space[]>(null);
  const [contentOptions, setContentOptions] = useState<Content[]>(null);
  useEffect(async()=>{
    setSpaces(await getAllSpaces());
  }, [])

  useEffect(async()=>{
    const spaceKey = config?.selectedSpace || context.spaceKey
    const pageContentOptions = await getContentsBySpaceKey(spaceKey, "page")
    const blogContentOptions = await getContentsBySpaceKey(spaceKey, "blogpost")
    const contentOptions = [...pageContentOptions, ...blogContentOptions]
    setContentOptions(contentOptions)
  }, [config])

  return (
    <Fragment>
      <Select label="space" name="selectedSpace">
        {spaces?.map(space=>
          context.spaceKey === space.key ? <Option label={space.name} value={space.key} defaultSelected/>
          : <Option key={space.key} label={space.name} value={space.key}/>
        )}
      </Select>
      <Select label="content" name="selectedContent">
        {contentOptions?.map(contentOption=>
          <Option key={contentOption.id} label={contentOption.title} value={contentOption.id}/>
        )}
      </Select>
    </Fragment>
  )
}

const Configuration = () => {
  const config = useConfig();
  console.log(config)

  const renderConfig = (type: string) => {
    return (
      <Fragment>
        {type === "external"?  <TextField isRequired={true} label="link" name="link" type="text"/> : null}
        {type === "internal"? <InternalConfiguration/>:null}
      </Fragment>
    )
  }

  return (
    <MacroConfig>
      <Select label="type" name="type">
        <Option label="External Link" value="external"/>
        <Option label="Internal Link" value="internal"/>
      </Select>
      {config? 
      <Fragment>
        {renderConfig(config.type)}
        <TextField isRequired={true} label="countdown" name="countdown" type="number"/>
        <CheckboxGroup label='options' name='options'>
          <Checkbox defaultChecked value='visible' label='visible' />
          <Checkbox defaultChecked value='redirectable' label='redirectable' />
        </CheckboxGroup>
      </Fragment>
      : null}
    </MacroConfig>
  )
}

export const run = render(
  <Configuration/>
); 