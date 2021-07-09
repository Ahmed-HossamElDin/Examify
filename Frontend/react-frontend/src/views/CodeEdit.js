import React, { Component } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default class CodeEdit extends Component {

render() {
    return (
        <div>
            <h1>Editor test</h1>
            <Editor
            height="80vh"
            width="90vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// some comment"
        />
        </div>
        
    );
}
}