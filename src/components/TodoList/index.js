import './index.css'
import React ,{useState} from 'react'

const TodoList =() =>{

    const [list,setList] = useState([])
    const [message,setMessage] = useState({
       text:'',
        id:'' 
    });
    const [editingItem,setEditingItem] = useState({
        id:'',
        isEditing:false,
    })

    const onChangeMessage = (event) => {
       setMessage({
          ...message,
          text:event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let newTodoList = {
           text: message.text,
            id: new Date().getTime().toString()

        }
        setList([...list,newTodoList])
        setMessage({text:"",id:""})
    }

    const handleDelete = (id) => {
        let newTodos = list.filter((eachItem) => {
             return eachItem.id !== id
        });
        setList(newTodos);
    }
    const handleEditStatus = (id) => {
        setEditingItem({
            ...editingItem,
            id:id,
            isEditing:true,
        });
        let editableItem = list.find((eachItem) => eachItem.id === id)
        setMessage({
            ...message,
            text:editableItem.text,
            id:editableItem.id
        })
    }
    const onChangeEdit = (event) => {
        event.preventDefault();
        let newTodos = list.map((eachItem) => {
            if(eachItem.id === editingItem.id){
                return {
                    text:message.text,
                    id:editingItem.id
                }

            }else{
                return eachItem;
            }
        })
        setList(newTodos)
    }

return(
    <>
    <div className="bg-container">
    <form  className="form-container"> 
     <input
        className="input"
        type="text"
        name="message" 
        id="message"
        placeholder="Type here"
        value={message.text}
        onChange={onChangeMessage}/>
        {
            editingItem.isEditing ?( <button  className="button"onClick={onChangeEdit} type="submit">Edit</button>): ( <button className="button" onClick={handleSubmit} type="submit">Add</button>)
        }
      
    </form>
    <hr />

    {list.length === 0 &&
      <h2 className="no-items">There are no items in the list</h2>
    }
    <ul>
        {list.map((eachItem) => {
            const {text,id} = eachItem
            return <li  
              className="list-items"
              key={id}> 
                <span className="span-text">{text}</span>
                <button className="button" onClick={() => handleEditStatus(id)}>edit</button>
                <button className="button" onClick ={() => handleDelete(id)}>delete</button>
            </li>
        })}
    </ul>
  </div>
  </>
  )
}
export default TodoList;