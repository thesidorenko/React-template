import style from './Detailed.module.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router';

const Detailed = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => setUser(response.data))
    }, [id]);

    return (
        <div>
            { user && (
                <div className={style.container}>
                    <h1>Detailed information</h1>
                    <div className={style.desciption}>
                        <div>
                            <img src='https://picsum.photos/200/300.jpg' alt='avatar'/>
                        </div>
                        <div>
                            <h2 className={style.name}>{user.name}</h2>
                            <p>Phone: {user.phone}</p>
                            <p>Email: {user.email}</p>
                            <p>Website: {user.website}</p>
                            <p>Company: {user.company.name}</p>
                            <div>
                                <p>Address:</p>
                                <p>{user.address.zipcode}, {user.address.suite}</p>
                                <p>{user.address.street}, {user.address.city}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => navigate(`/`)} className={style.buttonBack}>Back</button>
                </div>
            )}
        </div>
    )
}

export default Detailed;