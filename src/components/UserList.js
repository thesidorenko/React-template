import axios from "axios";
import { useEffect, useState } from "react";
import UserItem from './UserItem/UserItem';

const UserList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(() => {
            alert('There was an error while retrieving the data')
        })
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(4);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if(currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <div>
            { currentRecords.map(item => {
                return (
                    <div key={item.id}>
                        <UserItem item={item} />
                    </div>
                )
            })
            }
            <nav>
                <ul className='pagination justify-content-center'>
                    <li className='page-item '>
                        <a onClick={prevPage} href='#' className='page-link'>Previous</a>
                    </li>
                    { pageNumbers.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : '' }`}>
                            <a href='#' onClick={ () => setCurrentPage(num) } className='page-link'>{num}</a>
                        </li>
                    ))
                    }
                    <li className='page-item'>
                        <a onClick={nextPage} href='#' className='page-link'>Next</a>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default UserList;