import { faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import styles from './index.module.scss';
import { type Post as PostType } from '../../contexts/PostsContext';
import { useNavigate } from 'react-router';
import { savedOnly } from '../../pageLayouts/SearchPage/data';

const NoContent = <div></div>;
const LineBreak = <br></br>;

const Post = ({
  user,
  userimgsrc,
  categories,
  title,
  text,
  isSaved,
  isSponsored,
  eventLink,
  shopLink,
  media,
  link,
  id,
  timestamp,
}: PostType) => {
  let now = Date.now();
  let difference = Math.round((now - timestamp.getTime()) / (1000 * 60));
  let dateUnits = ' minutes ';
  if (difference > 60) {
    dateUnits = ' hours ';
    difference = Math.ceil(difference / 60);
    if (difference > 24) {
      difference = Math.ceil(difference / 24);
      dateUnits = ' days ';
    }
  }

  let navigate = useNavigate();

  let preText = LineBreak;
  let imagediv = NoContent;
  let preLink = LineBreak;
  let preEvent = LineBreak;
  let preShop = LineBreak;
  let preSponsor = LineBreak;
  let sponsortext = 'test';

  if (title == '') {
    preText = NoContent;
  } else {
    preText = LineBreak;
  }
  if (media == '') {
    imagediv = NoContent;
  } else {
    imagediv = (
      <div className={styles.profileImage}>
        <img src={media} width="70%" height="50%" border-radius="0%"></img>
      </div>
    );
    preText = NoContent;
  }
  if (link == '') {
    preLink = NoContent;
  } else {
    preLink = LineBreak;
  }
  if (eventLink == '') {
    preEvent = NoContent;
  } else {
    preEvent = LineBreak;
  }
  if (shopLink == '') {
    preShop = NoContent;
  } else {
    preShop = LineBreak;
  }
  if (isSponsored) {
    sponsortext = 'This post is a sponsored advertisement.';
    preSponsor = LineBreak;
  } else {
    sponsortext = '';
    preSponsor = NoContent;
  }

  /*let saveColours=["black","#a1b5d8"]
  let savedColor = 0
  if (isSaved) {
    savedColor = 1
  }

  function toggleSaved() {
    console.log("flipping")
    isSaved=(!isSaved)
    savedColor=1-savedColor;
    console.log("save val: ", isSaved, " col: ", savedColor)
  }*/
  
  const handleUsernameClick = (username: string) => {
    if(username === 'JohnTheVet'){
      navigate('/dummyProfile');
    }
    else{
      navigate('/profileView');
    }
  }

  return (
    <div className={styles.outerBox}>
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <img
            className={styles.profileImage}
            src={userimgsrc}
            width="10%"
            height="10%"
            alt=""
            border-radius="50%"
          ></img>
          <div onClick={() => handleUsernameClick(user)} style={{ cursor: 'pointer' }} className={styles.postUser}>{user}</div>
          <div className={styles.dateText}>
            {difference} {dateUnits} ago
          </div>
        </div>

        <div className={styles.postContents}>
          {title}
          {imagediv}
          {preText}
          {text}
          {preLink}
          <a href={link}>{link}</a>
          {preEvent}
          <a href={eventLink}>{eventLink}</a>
          {preShop}
          <a href={shopLink}>{shopLink}</a>
          {preSponsor}
          <i>{sponsortext}</i>
        </div>
      </div>

      <div className={styles.buttonIcons}>
        <button className={styles.actionButton} onClick={() => /*toggleSaved()*/(0)}>
          <FontAwesomeIcon icon={faBookmark} size="1x" color={/*saveColours[savedColor]*/"black"}/>
        </button>
        <div className={styles.actionButton}>
          <div className={styles.mirrored}>
            <FontAwesomeIcon icon={faComment} size="1x" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);
