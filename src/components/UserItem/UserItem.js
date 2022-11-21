import style from './UserItem.module.css';
import { Link } from 'react-router-dom';

const UserItem = (props) => {
    return (
        <div className={style.userItem} >
            <div className={style.userImg}>
                <img src='https://picsum.photos/100/100.jpg' alt='avatar' />
            </div>
            <div className={style.itemDescription}>
                <Link to={`/${props.item.id}`} className={style.itemName}>{props.item.name}</Link>
                <p className={style.itemEmail}>Email: {props.item.email}</p>
            </div>
        </div>
    )
}
export default UserItem;

