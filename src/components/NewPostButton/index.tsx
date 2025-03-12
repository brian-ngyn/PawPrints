//import { faUser } from '@fortawesome/free-regular-svg-icons';
/*import {
  faHouse,
  faPeopleGroup,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';*/
import { memo } from 'react';

import { useNavigate } from 'react-router';

import styles from './index.module.scss';


const NewPostButton = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.newPostButton}>
        <img src={} width="10%" height= "10%" alt="" border-radius="50"></img>
    </div>
  );
};

export default memo(NewPostButton);
