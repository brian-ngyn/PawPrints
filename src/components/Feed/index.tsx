//import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faComment,
  faTurnDown,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { useState } from 'react';
import {postData} from "./data";
import Post from '../../components/Post';


//import { useNavigate } from 'react-router';

import styles from './index.module.scss';

type PostProps = {
  user:"";
  userimgsrc:"";
  categories:{};
  title: "";
  text:"";
  isSaved:false;
  isSponsored:false;
  eventLink:"";
  shopLink:"";
  media:"";
  link:"";
  id:number;
  replies:{}
}

export default function Feed() {
  //let navigate = useNavigate();

  return (
    <ul>{
      postData.map(post => (
        <Post
              user={post.user}
              userimgsrc={post.userimgsrc}
              title={post.title}
              text={post.text}
              isSaved={post.isSaved}
              isSponsored={post.isSponsored}
              eventLink={post.eventLink}
              shopLink={post.shopLink}
              media={post.media}
              link={post.link}
              id={post.id}
              categories={[""]}
              timestamp={post.timestamp}
            ></Post>
      ))  
    }</ul>
  );
};

/*export function AddPost(props : PostProps) {
  [...postData,
  {
    user:props.user,
    userimgsrc:props.userimgsrc,
    categories:props.categories,
    text:props.text,
    isSaved:props.isSaved,
    isSponsored:props.isSponsored,
    eventLink:props.eventLink,
    shopLink:props.shopLink,
    media:props.media,
    link:props.link,
  }]
  return(<></>);
}*/