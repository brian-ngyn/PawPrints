import {
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import { useNavigate } from 'react-router';

import styles from './index.module.scss';
import PlusIcon from '../PlusIcon';

//we are using primary black for this, but hardcoded right now
//also need to implement navigation to newpost page, right now it just goes to home
const SearchBar = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.searchbarBox} onClick={() => navigate('/')}>
      <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
      <div className={styles.searchText}>Search for... cat adoption centres </div>
    </div>
  );
};

export default memo(SearchBar);

//<img src={} width="10%" height= "10%" alt="" border-radius="50"></img>