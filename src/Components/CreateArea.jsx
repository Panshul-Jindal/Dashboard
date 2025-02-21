import React,{useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
   const [noteContent,setNoteContent] =useState({
    title:"",
    content:""
   }); 


   
   const [isExpanded,setExapanded] = useState(false)

   function handleChangeNote(event){
    const val = event.target.value;
    const name = event.target.name;

  


    setNoteContent(prevValue=>{
        return {
            ...prevValue,
            [name]:val
        }

     
    })
  

   }


   function handleClick(event){
      props.addNote(noteContent.title, noteContent.content)
      
      setNoteContent({
        title:"",
        content:""
      })
      event.preventDefault()
   }

   function expand(){
    setExapanded(true)
   }




   


  return (
    <div>
      <form className = "create-note" onSubmit ={handleClick}>
       {   isExpanded && <input name="title" placeholder="Title" onChange={handleChangeNote} value = {noteContent.title} />}
        <textarea name="content" placeholder="Take a note..." rows={isExpanded ? "3" :"1"} onChange = {handleChangeNote} onClick={expand} value = {noteContent.content} />
        
        <Zoom in = {isExpanded }>
        <Fab onClick = {handleClick}>
          <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
