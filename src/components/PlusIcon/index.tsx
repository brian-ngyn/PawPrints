//import { faUser } from '@fortawesome/free-regular-svg-icons';
/*import {
  faHouse,
  faPeopleGroup,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';*/
import { memo } from 'react';

//import { useNavigate } from 'react-router';

import styles from './index.module.scss';

//import icon from "./plus_icon.svg"

type PlusIconProps = {
  width: number;
  height: number;
  colour: string;
}

const PlusIcon = (props : PlusIconProps) => {
  //let navigate = useNavigate();

  return (
    <div className={styles.plusIcon}>
      <svg width={props.width} height={props.height} version="1.1" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" fill={props.colour}>
        <g transform="translate(-60 -80)">
          <path transform="translate(0 60)" d="m70 20a10 10 0 0 0-9.9999 10v70a10 10 0 0 0 9.9999 9.9999h70a10 10 0 0 0 9.9999-9.9999v-70a10 10 0 0 0-9.9999-10zm30 15h9.9999a5 5 0 0 1 5.0002 5.0002v12a3 3 0 0 0 2.9998 3.0003h12a5 5 0 0 1 5.0002 4.9997v9.9999a5 5 0 0 1-5.0002 5.0002h-12a3 3 0 0 0-2.9998 2.9998v12a5 5 0 0 1-5.0002 4.9997h-9.9999a5 5 0 0 1-5.0002-4.9997v-12a3 3 0 0 0-2.9998-2.9998h-12a5 5 0 0 1-4.9997-5.0002v-9.9999a5 5 0 0 1 4.9997-4.9997h12a3 3 0 0 0 2.9998-3.0003v-12a5 5 0 0 1 5.0002-5.0002z" strokeWidth=".26458"/>
        </g>
      </svg>
    </div>
  );
};

export default memo(PlusIcon);
