// import './Amit.jpg'
// import './Practice.css'

// // function Profile () {
// //     return(
// //         <img src="https://i.imgur.com/7vQD0fPs.jpg" 
// //         alt="MyPhoto" 
// //         />
// //     )
// // }
// // export default function Practice (){
// //     return(
// //         <>       
// //         <h1>Amit Mishra</h1>
// //         <Profile />
// //         <Profile />
// //         <Profile />
// //         <Profile />
// //         </>
// //     )
// // }

//         // const theme = {
//         //     name: 'Shivam Mishra',
//         //     rang: {
//         //         backgroundColor: "black",
//         //         color: "green"
//         //     }
//         // }

//         // export default function Practice (){
//         //     return(
//         //         <div style={theme.rang}>
//         //             <h1>{theme.name}</h1>
//         //             <img src="https://i.imgur.com/7vQD0fPs.jpg" alt="amit"
//         //             class="avatar"/>
//         //             <ul>
//         //                 <li>Apple</li>
//         //                 <li>Dell</li>
//         //                 <li>HP</li>
//         //                 <li>Acer</li>
//         //             </ul>
//         //         </div>
//         //     )
//         // }

//         // let home = 0;

//         // function James(){
//         //     home = home + 1;
//         //     return(
//         //         <h1>I have {home} Houses</h1>
//         //     )
//         // }

//         // export default function Practice () {
//         //     return(
//         //         <>
//         //         <James />
//         //         <James />
//         //         <James />
//         //         <James />
//         //         <James />
//         //         <James />
//         //         <James />
//         //         <James />
//         //         <James />
//         //         </>
//         //     )
//         // }

//         // export default function Practice(){
//         //     function alertdo(){
//         //         alert("I am alert from ghost")
//         //     }
//         //     return(
//         //         <>
//         //         <button onClick={alertdo} className='btn btn-primary'>Main hoo button</button>
//         //         {/*  If you want to define your event handler inline, wrap it in an anonymous function like so:*/}
//         //         <br />
//         //         <br />
//         //         <br />
//         //         <button onClick={()=>alert('Mujhe pahchano main hoo kaun')}>Amit</button>
//         //         </>
//         //     )
//         // }

//         import React, { useState } from 'react';

// const YourComponent = () => {
//   const [title, setTitle] = useState('');
//   const [details, setDetails] = useState('');
//   const [formEdit, setFormEdit] = useState(false);

//   const toggleformEdit = () => {
//     // Implement your toggle logic here
//   };

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   const handleDetailsChange = (event) => {
//     setDetails(event.target.value);
//   };

//   return (
//     <>
//       {formEdit && (
//         <div className="formEdit">
//           {/* ... (your existing code) */}
//           <div><h3>Title</h3></div>
//           <input type="text" className='field' value={title} onChange={handleTitleChange} />

//           <div className="field-2">
//             <h3>Details</h3>
//             <input type="text" className='field' value={details} onChange={handleDetailsChange} />
//           </div>

//           <div className="modal-button">
//             <button className="submit-modal" onClick={() => { 
//               // Handle the ADD button click here, you can use 'title' and 'details' state values
//               console.log('Title:', title);
//               console.log('Details:', details);
//             }}>
//               ADD
//             </button>
//             <button className="close-modal" onClick={toggleformEdit}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default YourComponent;





        
// Certainly! Let's go through the provided code line by line and explain each part

// jsx
// Copy code
// import React, { useState } from "react";
// import "./Modal.css";

// export default function Modal() {
// This code imports the necessary dependencies: React and the useState hook for managing component state. The Modal.css file is also imported, presumably for styling purposes. A functional React component named Modal is defined and exported as the default export from this module.
// d
// jsx
// Copy code
// const [title, setTitle] = useState('');
// const [details, setDetails] = useState('');
// const [modal, setModal] = useState(false);
// const [formEdit, setFormEdit] = useState(false);
// const [formDelete, setFormDelete] = useState(false);
// Several state variables are declared using the useState hook. These variables (title, details, modal, formEdit, and formDelete) are used to manage the component's local state.

// title and details store the values of input fields for the news title and details.
// modal, formEdit, and formDelete are boolean flags used to control the visibility of different modal forms.
// jsx
// Copy code
// const toggleModal = () => {
//   setModal(!modal);
// };
// const toggleformEdit = () => {
//   setFormEdit(!formEdit);
// };
// const toggleFormDelete = () => {
//   setFormDelete(!formDelete);
// };
// These functions (toggleModal, toggleformEdit, and toggleFormDelete) are responsible for toggling the corresponding modal states. When called, they toggle the boolean state variables, effectively showing or hiding the modals based on the current state.

// jsx
// Copy code
// const handleTitleChange = (event) => {
//   setTitle(event.target.value);
// };

// const handleDetailsChange = (event) => {
//   setDetails(event.target.value);
// };
// These functions (handleTitleChange and handleDetailsChange) are event handlers for the input fields. They update the title and details state variables, respectively, whenever the user types in the corresponding input fields.

// jsx
// Copy code
// async function handleSubmit(e) {
//   e.preventDefault();

//   const form = e.target;
//   const formData = new FormData(form);
//   const data_fields = {
//     title,
//     details
//   };

//   const data = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data_fields)
//   };

//   const result = await fetch('http://192.168.18.12:5000/api/news', data);
//   console.log("Result:", result);
//   const formJson = Object.fromEntries(formData.entries());
//   console.log(formJson);
// }
// This handleSubmit function is an event handler for the form submission. It prevents the default form submission behavior, constructs a JSON object (data_fields) containing the title and details, and sends a POST request to the specified URL (http://192.168.18.12:5000/api/news) with the JSON data. The response from the API call is logged to the console. Additionally, the form data is converted to a JSON object (formJson) and logged to the console.

// jsx
// Copy code
// return (
//   <>
//     {/* ... */}
//   </>
// );
// The return statement contains the JSX code representing the component's UI. The component renders a button that, when clicked, toggles the visibility of the modal form. The form includes input fields for title and details, along with buttons for adding news and closing the modal. There are also modal forms for editing and deleting news, which are displayed based on the formEdit and formDelete states, respectively. Each modal form has input fields and buttons for performing the corresponding actions.

// Please note that the provided code assumes a certain HTML and CSS structure, and the behavior might be affected by the missing parts (such as the actual implementation of the edit and delete functionalities, and the CSS styles defined in Modal.css).


// code for fetch data using get
    //   async function fetchData() {
    //     try {
    //         let response = await fetch("http://192.168.18.12:5000/api/news/list");
    //         if (response.ok) {
    //             let news = await response.json();
    //             setNewsValue(news.data);
    //         } else {
    //             // Handle error, maybe set an error state
    //         }
    //     } catch (error) {
    //       console.error("Error occurred:", error);
    //     }
    // }