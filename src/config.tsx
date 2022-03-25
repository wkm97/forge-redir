
import api, { route } from "@forge/api";
import {Content, Space} from '@servicerocket/conf-cloud-utils';
import ForgeUI, { TextField, MacroConfig, render, Select, Option, useConfig, useProductContext, useEffect, CheckboxGroup, Checkbox } from "@forge/ui";
import { useState } from "@forge/ui";
import { getAllSpaces, getContentsBySpaceKey } from "./confluence";

const Configuration = () => {
  const config = useConfig();
  const context = useProductContext();
  const [spaces, setSpaces] = useState<Space[]>(null);
  const [contentOptions, setContentOptions] = useState<Content[]>(null);


  useEffect(async()=>{
    setSpaces(await getAllSpaces());
  }, [])

  useEffect(async()=>{
    setContentOptions(await getContentsBySpaceKey(config?.selectedSpace || context.spaceKey))
  }, [config])

  return (
    <MacroConfig>
      <Select label="space" name="selectedSpace">
        {spaces?.map(space=>
          context.spaceKey === space.key ? <Option label={space.name} value={space.key} defaultSelected/>
          : <Option label={space.name} value={space.key}/>
        )}
      </Select>
      <Select label="content" name="selectedContent">
        {contentOptions?.map(contentOption=>
          <Option label={contentOption.title} value={contentOption.id}/>
        )}
      </Select>
      <TextField isRequired={true} label="countdown" name="countdown"/>
      <CheckboxGroup label='options' name='options'>
        <Checkbox defaultChecked value='visible' label='visible' />
        <Checkbox defaultChecked value='redirectable' label='redirectable' />
      </CheckboxGroup>
    </MacroConfig>
  )
}

export const run = render(
  <Configuration/>
); 