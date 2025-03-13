//import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faGlobe,
  faComment,
  faTurnDown,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import { useNavigate } from 'react-router';

import styles from './index.module.scss';
import PlusIcon from '../PlusIcon';

//we are using primary black for this, but hardcoded right now
//also need to implement navigation to newpost page, right now it just goes to home
const VisibilitySelector = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.visibilityButton} onClick={() => navigate('/new-post')}>
      <FontAwesomeIcon icon={faGlobe} size="2x" />
    </div>
  );
};

export default memo(VisibilitySelector);

//<img src={} width="10%" height= "10%" alt="" border-radius="50"></img>