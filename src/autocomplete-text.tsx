import { Select, useState, Option, useConfig } from "@forge/ui";
import ForgeUI from '@forge/ui'
import { useEffect } from "react";

interface Selection {
    label: string;
    value: any
}

interface Props {
    selections: Selection[]
    label: string;
    name: string;
}

export const AutoCompleteTextField = (props: Props) => {
    const [selections, setSelections] = useState<Selection[]>([]);
    const config = useConfig();

    // useEffect(()=>{
    //     setSelections([
    //         ...selections,
    //     ])
    // })

    return (
        <Select label={props.label} name={props.name}>
            {selections.map(item=>
                <Option key={item.value} label={item.label} value={item.value}/>
            )}            
        </Select>
    )
}