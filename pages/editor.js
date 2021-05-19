const style = {
  color: 'white',
  backgroundColor: 'black',
  width: '100vw',
  height: '90vh',
}

export default function Editor(props) {
  return(
    <div>
      <textarea style={style} value={props.editorState} onChange={(e) => props.setEditorState(e.target.value)}></textarea>
    </div>
  )
}