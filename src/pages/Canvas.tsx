import { SearchBar } from "../component/SearchBar"
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { useState } from "react"

const initialValue : any[] = []

//https://docs.slatejs.org/walkthroughs/01-installing-slate
export function Canvas(){
    const [editor] = useState(() => withReact(createEditor()))
    return(
        <>
            <Slate editor={editor} value={initialValue}>
                <Editable />
            </Slate>
            <SearchBar />
        </>
    )
}