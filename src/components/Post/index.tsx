//import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faComment,
  faTurnDown,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

//import { useNavigate } from 'react-router';

import styles from './index.module.scss';

type PostProps = {
  user:string;
  userimgsrc:string;
  categories:string[];
  title: string;
  text:string;
  isSaved:boolean;
  isSponsored:boolean;
  eventLink:string;
  shopLink:string;
  media:string;
  link:string;
  //replies:[Reply];
  id:number;
  timestamp:Date;
}

type Reply = {
  user:string;
  text:string;
}

const NoContent = <div></div>
const LineBreak = <br></br>

const Post = (props: PostProps) => {
  let now = Date.now();
  let difference = Math.round((now - props.timestamp.getTime())/(1000*60))
  let dateUnits = " minutes "
  if (difference > 60) {
    dateUnits = " hours "
    difference = Math.ceil(difference/60)
    if (difference > 24) {
      difference = Math.ceil(difference/24)
      dateUnits = " days "
    }
  }

  //let navigate = useNavigate();

  let preText=LineBreak;
  let imagediv = NoContent;
  let preLink = LineBreak;
  let preEvent = LineBreak;
  let preShop = LineBreak;
  let preSponsor = LineBreak;
  let sponsortext = "test";

  if (props.title=="") {
    preText = NoContent;
  } else {
    preText=LineBreak;
  }
  if (props.media=="") {
    imagediv=NoContent;
  } else {
    imagediv = <div className={styles.profileImage}><img src={props.media} width="70%" height = "50%" border-radius = "0%"></img></div>;
    preText=NoContent;
  }
  if (props.link == "") {
    preLink=NoContent;
  } else {
    preLink =LineBreak;
  }
  if (props.eventLink == "") {
    preEvent = NoContent;
  } else {
    preEvent=LineBreak;
  }
  if (props.shopLink == "") {
    preShop = NoContent;
  } else {
    preShop = LineBreak;
  }
  if (props.isSponsored) {
    sponsortext = "This post is a sponsored advertisement.";
    preSponsor = LineBreak;
  } else {
    sponsortext = "";
    preSponsor = NoContent;
  }
  

  return (
    <div className ={styles.outerBox}>
      <div className={styles.post}>
        <div className = {styles.postHeader}>
          <img className={styles.profileImage} src={props.userimgsrc} width="10%" height= "10%" alt="" border-radius="50%"></img>
          <div className = {styles.postUser}>{props.user}</div>
          <div className = {styles.dateText}>{difference} {dateUnits} ago</div>
        </div>

        <div className = {styles.postContents}>
          {props.title}
          {imagediv}
          {preText}{props.text}
          {preLink}<a href={props.link}>{props.link}</a>
          {preEvent}<a href={props.eventLink}>{props.eventLink}</a>
          {preShop}<a href={props.shopLink}>{props.shopLink}</a>
          {preSponsor}{sponsortext}
        </div>
      </div>

      <div className={styles.buttonIcons}>
        <div className= {styles.actionButton}><FontAwesomeIcon icon={faBookmark} size="1x" /></div>
        <div className = {styles.actionButton}>
          <div className= {styles.mirrored}><FontAwesomeIcon icon={faComment} size = "1x"/></div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);