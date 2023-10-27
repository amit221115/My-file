import React, { useEffect, useState } from 'react'

export const NewsForm = ({ open, onClose, onAdd, data }) => {

    const [formInputs, setFormInputs] = useState({
        title: '',
        details: ''
    })

    const addNews = async () => {
        const response = await fetch('http://192.168.18.195:5000/api/news', {
            method: 'post',
            body: JSON.stringify(formInputs),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await response.json();
        if (result.result) {
            alert('News created successfully');
            setFormInputs({
                title: '',
                details: ''
            })
            onAdd();

        } else {
            alert(`Something went wrong, ${result.message}`)
        };
    }

    const editNews = async () => {
        const response = await fetch(`http://192.168.18.195:5000/api/news/update/${data.id}`, {
            method: 'put',
            body: JSON.stringify(formInputs),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await response.json();
        if (result.result) {
            alert('News edit successfully');
            setFormInputs({
                title: '',
                details: ''
            })
            onAdd();

        } else {
            alert(`Something went wrong, ${result.message}`)
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.id) {
            editNews();
        } else {
            addNews();
        }
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs(
            function (prestate) {
                return { ...prestate, [name]: value }
            });
    }

    useEffect(() => {
        if (data.title && data.details) {
            setFormInputs({
                title: data.title,
                details: data.details
            })
        }
    }, [data])
    return (
        <dialog open={open}>
            <form onSubmit={handleSubmit} className="overlay">
                <div className="modal-content">
                    <h2 className="h2">{data.id ? "Edit" : "Add"} News</h2>
                    <hr />
                    <label>
                        TITLE: <br /><input value={formInputs.title} name="title" placeholder="title" onChange={handleInputChange} ></input>
                    </label><br /><br />
                    <label>
                        DETAILS: <br /><input value={formInputs.details} name="details" placeholder="details" onChange={handleInputChange}></input>
                    </label>
                    <br />
                    <br />
                    <button className="closeButton" type="submit">{data.id ? "Edit" : "Add"}</button>
                    <button className="closeButton" type='button' onClick={onClose}>CLOSE</button>
                </div>
            </form>
        </dialog>
    )
}
