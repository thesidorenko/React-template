import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import UserItem from './UserItem/UserItem';

const usePagination = (data, volume = 10) => {
    const totalPages = useMemo(() => Math.floor(data.length / volume), [
      volume,
      data.length
    ]);

    const [page, setPage] = useState(0);

    const slicedData = useMemo(
      () => data.slice(page * volume, page * volume + volume),
      [data, volume, page]
    );

    return { data: slicedData, page, totalPages, setPage };
};

const UserList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then(response => setData(response.data))
    });

    const pagination = usePagination(data, 4);

    const onNextPage = useCallback(() => {
        pagination.setPage((prevState) => {
            if (prevState < pagination.totalPages) {
                return prevState + 1;
            }
            return prevState;
        })
    }, [pagination]);

    const onPrevPage = useCallback(() => {
        pagination.setPage((prevState) => {
            if (prevState > 0) {
                return prevState - 1;
            }
            return prevState;
        })
    }, [pagination]);

    return (
        <div>
            {
                pagination.data.map(item => {
                    return (
                    <div key={item.id}>
                        <UserItem item={item} />
                    </div>
                    )
                })
            }
            <div className='paginationBlock'>
                <div className='paginationButton'>
                    <button onClick={onPrevPage} disabled={pagination.page <= 0}> Prev page </button>
                    <button onClick={onNextPage} disabled={pagination.page === pagination.totalPages}> Next page </button>
                </div>
                <div>
                    <p>Page: {pagination.page}</p>
                    <p>Total Page: {pagination.totalPages}</p>
                </div>
            </div>
        </div>
    )
}

export default UserList;