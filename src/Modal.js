    import React, { useState, useEffect } from "react";
    import "./Modal.css";

    export default function Modal() {
      const [modal, setModal] = useState(false);
      const [formEdit, setFormEdit] = useState(false);
      const [formDelete, setFormDelete] = useState(false);
      const [title, setTitle] = useState('');
      const [id, setId] =useState("");
      const [editDetails, setEditDetails] =useState("");
      const [details, setDetails] = useState('');
      const [editTitle, setEditTitle] =useState("");
      const [newsValue, setNewsValue] = useState([]);

      const toggleModal = () => {
        setModal(!modal);
      }
      const toggleformEdit = (e) => {
        // setId(e.target.value); // 2
        // console.log("target:",e.target);
        setFormEdit(!formEdit);
      };
      const toggleFormDelete = () => {
        setFormDelete(!formDelete);
        // const [id, setId] = useState("ID"); // 1
      };
      function deleteUser(id) {
        fetch(`http://localhost:4000/todo/${id}`, {
          method: 'DELETE'
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp)
            getUsers()
          })
        })
      }
      const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };  
      const handleDetailsChange = (event) => {
        setDetails(event.target.value);
      };  
      const toggleformEdits = () => {
        setFormEdit(!formEdit);
        // console.warn(newsValue[id])
        // setId(newsValue[id].id)
        // setEditTitle(newsValue[id].title)
        // setEditDetails(newsValue[id].details)
      };
      async function handleSubmit(e) {
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const data_fields = {
          title,
          details
        }
        console.log(data_fields);
        const data = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data_fields)
        }
        const result = await fetch('http://127.0.0.1:5000/api/news', data);
        console.log("Result:", result);
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        getUsers();
        setModal(!modal);
      }
      function getUsers(){
        fetch("http://127.0.0.1:5000/api/news/list").then((result)=>{
          result.json().then((resp)=>{
            setNewsValue(resp.data);
            setId(resp.data[0].id)          
            setEditTitle(resp.data[0].title)          
            setEditDetails(resp.data[0].details)          
          })
        })
      }
      useEffect(() => {
        getUsers();
    },[])
    function UpdateUser(){
      let item = {id,editTitle,editDetails}
      console.warn("item",newsValue)
      fetch(`http://127.0.0.1:5000/api/news/update/${id}`, {
        method: 'PUT',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(newsValue)
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
          getUsers()
        })
      })
    }
    async function handleEdit(e) {
      // e.preventDefault();
      // let item={id,title,details}
      const form = e.target;
      const formData = new FormData(form);
      const data_fields = {
        title,
        details
      }
      console.log(data_fields);
      const data = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_fields)
      } 
      // const id = e.target;
      // console.log("ID:", id) // 3
        const result = await fetch(`http://127.0.0.1:5000/api/news/update/:id`, data); // 4
        console.log("Result:", result);
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        getUsers();
        setModal(!modal);
        // e.preventDefault();
      }
        const deleteData = async ( ) =>{
        const response = await fetch('http://192.168.18.12:5000/api/news/delete/:id', {
        method: 'DELETE', 
        headers: {
           'Content-Type': 'application/json'
        },
        body: null
        });
        const data_fields = await response.json( );
        // now do whatever you want with the data  
        console.log(data_fields);
        };
        deleteData();

      return (
        <>
        <button onClick={toggleModal} className="btn-modal"> Add News </button>
        <form onSubmit={handleSubmit}>
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h1 className="heading">Add News</h1>
                <hr />
                <br />
            <div><h3>Title</h3></div>
            <input type="text" className='field' value={title} onChange={handleTitleChange} />
            <div className="field-2"><h3>Details</h3>
            <input type="text" className='field' value={details} onChange={handleDetailsChange} />
            </div>
            <div className="modal-button">
            <button type="submit" className="submit-modal">ADD</button>
            <button className="close-modal" onClick={toggleModal}>CLOSE</button>
            </div>  
            </div>
            </div>
          )}
          </form>
        <div className="container">
        <div className="table">
            <table>
              <thead>
            <tr style={{backgroundColor:"#abdbe3"}}>
                <th>Id</th>
                <th>Title</th>
                <th>Details</th>
                <th style={{width:"99px"}}>Action</th>
            </tr>
            </thead>
            {
              newsValue.map((api) =>{
               return(
                <tbody>
                <tr style={{height:"50px"}} className="tr-2">
                <td>{api.id}</td>
                <td>{api.title}</td>
                <td>{api.details}</td>
                <td >
                <div className="data-button">
                <button className="data-button-1"  onClick={()=>toggleformEdit(api.id)}>Edit</button> 
                <button className="data-button-2" onClick={toggleFormDelete}>Delete</button>
                </div>
                </td>
                </tr>
                </tbody>
              )
            })}
            </table>
        </div>
        </div>
   <form onSubmit={handleEdit}>
        {formEdit && (
            <div className="formEdit" >
              <div onClick={toggleformEdit} className="overlay"></div>
              <div className="formEdit-content">
                <h1 className="heading">Edit News</h1>
                <hr />
            <div className="hid" onChange={(e)=>setId(e.target.value)}><h2>ID:- {id} </h2></div> 
            <br />
            <div><h3>Title</h3></div>
            <input type="text" className='field' value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
            <div className="field-2"><h3>Details</h3>
            <input type="text" className='field' value={editDetails} onChange={(e)=>setEditDetails(e.target.value)} />
            </div>
            <div className="modal-button">
            <button className="submit-modal" type="submit" onClick={handleEdit}>Edit</button>
            <button className="close-modal" onClick={toggleformEdit}>Cancel</button>
            </div>
            </div>
            </div>
          )}
          </form>
        {formDelete && (
            <div className="formDelete">-
              <div onClick={toggleFormDelete} className="overlay"></div>
              <div className="formDelete-content">
                <h1 className="heading">Delete News</h1>
                <hr />
                <br />
              <h3>Are you sure want to delete</h3>  
            <div className="modal-button">
            {
              newsValue.map((api) =>{
               return(
            <>
            <button className="submit-modal" onClick={() => deleteUser(api.id)}>Delete</button>
            <button className="close-modal" onClick={toggleFormDelete}>Cancel</button></>
            )
           })}
            </div>
            </div>
            </div>
        )}
        </>
      );
    };
    