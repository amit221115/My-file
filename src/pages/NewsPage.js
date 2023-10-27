import React, { useEffect, useState } from "react";
import "../assets/css/NewsPage.css";
import { NewsForm } from "../components/News/NewsForm";

export default function NewsPage() {

    const [newsList, setNewsList] = useState([]);
    const [newsFormState, setNewsFormState] = useState(false)
    const [editNewsData, setEditNewsData] = useState({});

    const fetchData = async () => {
        let response = await fetch("http://192.168.18.195:5000/api/news/list");
        let listNews = await response.json();
        setNewsList(listNews.data)
    }

    const handleNewsFromState = (state) => {
        setNewsFormState(state)
    }

    const handleNewsEdit = (news) => {
        alert(`You are going to edit "${news.title}"`)
        setEditNewsData(news)
        handleNewsFromState(true)
    }

    const handleNewsDelete = async (news) => {
        const result = window.confirm(`Are you sure, You want to delete "${news.title}"?`)
        if (result) {
            const response = await fetch(`http://192.168.18.195:5000/api/news/delete/${news.id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const result = await response.json();

            if (result.result) {
                alert('News deleted successfully');
                fetchData();
            } else {
                alert(`Something went wrong, ${result.message}`)
            };

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <h1 className="App-header">CURD Operation</h1>

            <div className="TableDesign">
                <button onClick={() => handleNewsFromState(true)}  className="Open-button">
                    ADD
                </button>
                <table border={1} className="table" >
                    <thead >
                        <tr>
                            <th className="Head">Id</th>
                            <th className="Head">Title</th>
                            <th className="Head">Details</th>
                            <th className="Head">Action</th>
                        </tr>
                    </thead>
                    <tbody className="addButton">
                        {
                            newsList.map((item, i) => {
                                return (

                                    <tr key={i}>
                                        <td className="body">{item.id}</td>
                                        <td className="body">{item.title}</td>
                                        <td className="body">{item.details}</td>
                                        <td>
                                            <button onClick={() => handleNewsEdit(item)} className="addButton">Edit</button>
                                            <button onClick={() => handleNewsDelete(item)} className="closeButton">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* News create and update dialog */}
            <NewsForm open={newsFormState} data={editNewsData} onClose={() => { setEditNewsData({}); handleNewsFromState(false) }} onAdd={() => { fetchData(); handleNewsFromState(false) }} />
        </>
    );
}
