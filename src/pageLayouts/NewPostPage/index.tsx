import { memo, useState } from 'react';

import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faUser,
  faShop,
  faChain,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import VisibilitySelector from '../../components/VisibilitySelector';
import PlusIcon from '../../components/PlusIcon';
import CategorySelector from '../../components/CategorySelector';

import { useNavigate } from 'react-router';

import {addPost} from '../../components/Feed/data'
import Shop from '../Shop';

//import {posttext, setText} from './data'

type inUserProps = {
  username: string;
  userimgsrc: string;
}

const animalcategories = [
  "Amphibians", "Frogs and Toads", "Axolotls, Newts, Salamanders",
  "Birds", "Birds of Prey", "Parrots", "Songbirds",
  "Fish", "Betta", "Cichlid", "Freshwater", "Koi & Goldfish", "Tropical",
  "Invertibrates", "Crustaceans & Mollusks", "Insects", "Spiders & Arachnids",
  "Mammals", "Cats", "Dogs", "Large Mammals", "Mustelids", "Rodents",
  "Reptiles", "Lizards", "Snakes", "Turtles",
]

/*const [selectedAnimalCategories, setSelectedAnimalCategories] = useState<string[]>([]);
const [selectedActivityCategories, setSelectedActivityCategories] = useState<string[]>([]);*/

const NewPostPage = (props: inUserProps) => {
  const [postContent, setPostContent] = useState("My pet did something amazing today...");
  const [postLink, setLink] = useState("Add External Link");
  const [postMedia, setMedia] = useState('Add Media Link');
  const [postShopLink, setShop] = useState('Add Shop Link');
  const [postEvent, setEvent] = useState('Add Event Link');
  const [sponsored, setSponsor] = useState(false);


  let navigate = useNavigate();

  function handleNewPost() {
    addPost(
      props.username, //user
      props.userimgsrc, //usersrc
      [""],//categories
      '',//title
      postContent,//text
      true,//isSaved
      sponsored,//isSponsored
      postEvent,//eventLink
      postShopLink,//shopLink
      postMedia,//media
      postLink,//link
      new Date()
    );
    navigate('/');
  }

  function noSave() {
    alert("WARNING: Draft saves are not currently implemented.");
  }

  return <div className={styles.page}>
    <div className={styles.pageHeading}>
      Create New Post
    </div>

    <div className={styles.backArrow} onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} size="2x" /></div>

    <div className={styles.outerBox}>
      <div className={styles.post}>
        <div className = {styles.postHeader}>
          <img className={styles.profileImage} src={props.userimgsrc} width="10%" height= "10%" alt="" border-radius="50%"></img>
          <div className = {styles.postUser}>{props.username}</div>
          
        </div>
        <div className={styles.postText}>

          <textarea value={postContent} onChange={e => setPostContent(e.target.value)}></textarea>

        </div>
      </div>
    </div>

    <div className={styles.postOptions}>
      <button className={styles.send} onClick={handleNewPost}>
        <div className={styles.optionText}>Publish Post</div>
      </button>
      <button className={styles.send} onClick={noSave}>
        <div className={styles.optionText}>Save Draft</div>
      </button>

      <button className={styles.option}>
        <PlusIcon width={32} height={32} colour={"#454545"}></PlusIcon>
        <div className={styles.optionText}></div>
        <input value={postMedia} onChange={e => setMedia(e.target.value)}></input>
      </button>

      <button className={styles.option}>
        <FontAwesomeIcon icon={faChain} size="1x" />
        <div className={styles.optionText}></div>
        <input value={postLink} onChange={e => setLink(e.target.value)}></input>
      </button>

      <button className={styles.option}>
      <FontAwesomeIcon icon={faCalendar} size="2x" />
        <div className={styles.optionText}></div>
        <input value={postEvent} onChange={e => setEvent(e.target.value)}></input>
        <button className={styles.optionButtons} onClick={() => navigate('/events')}>View Events</button>
      </button>

      <button className={styles.option}>
        <FontAwesomeIcon icon={faShop} size="2x" />
        <div className={styles.optionText}></div>
        <input value={postShopLink} onChange={e => setShop(e.target.value)}></input>
        <button className={styles.optionButtons} onClick={() => navigate('/shop')}>View Shop</button>
      </button>

      <button className={styles.option}>
        <label className={styles.container}>
          <input type="checkbox" checked={sponsored} onChange={e => setSponsor(e.target.checked)}></input>
          <span className={styles.checkmark}></span>   
        </label>
        <div className={styles.optionText}>This post is sponsored</div>
      </button>
      
      <div className={styles.dropdownBox}>
        <label>Animal Type
          <select name="animalCategory" id="animalCategory">
            <optgroup label="Amphibian">
              <option value="Frogs & Toads">Frogs & Toads</option>
              <option value="Axolotls, Newts, Salamanders">Axolotls, Newts, Salamanders</option>
            </optgroup>
            <optgroup label="Birds">
              <option value="Birds of Prey">Birds of Prey</option>
              <option value="Parrots">Parrots</option>
              <option value="Songbirds">Songbirds</option>
            </optgroup>
            <optgroup label = "Fish">
              <option value="Betta">Betta</option>
              <option value="Chichlid">Chichlid</option>
              <option value="Freshwater">Freshwater</option>
              <option value="Koi & Goldfish">Koi & Goldfish</option>
              <option value="Tropical">Tropical</option>
            </optgroup>
            <optgroup label="Invertibrates">
              <option value="Crustaceans & Mollusks">Crustaceans & Mollusks</option>
              <option value="Insects">Insects</option>
              <option value="Spiders & Arachnids">Spiders & Arachnids</option>
            </optgroup>
            <optgroup label="Mammals">
              <option value="Cats">Cats</option>
              <option value="Dogs">Dogs</option>
              <option value="Large Mammals">Large Mammals</option>
              <option value="Mustelids">Mustelids</option>
              <option value="Rodents">Rodents</option>
            </optgroup>
            <optgroup label='Reptiles'>
              <option value="Lizards">Lizards</option>
              <option value="Snakes">Snakes</option>
              <option value="Turtles">Turtles</option>
            </optgroup>
          </select>
        </label>
      </div>
      
    </div>

    <div className={styles.bottomSpaceBox}></div>
  </div>;
};

export default memo(NewPostPage);

