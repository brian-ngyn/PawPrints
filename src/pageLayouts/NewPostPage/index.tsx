import { memo, useState } from 'react';

import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faShop,
  faChain,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import PlusIcon from '../../components/PlusIcon';

import { useNavigate } from 'react-router';

import { usePosts } from '../../contexts/PostsContext';

type inUserProps = {
  username: string;
  userimgsrc: string;
};

const NewPostPage = (props: inUserProps) => {
  const [postContent, setPostContent] = useState('');
  const [postLink, setLink] = useState('');
  const [postMedia, setMedia] = useState('');
  const [postShopLink, setShop] = useState('');
  const [postEvent, setEvent] = useState('');
  const [sponsored, setSponsor] = useState(false);

  let navigate = useNavigate();
  const { addPost } = usePosts();

  function handleNewPost() {
    addPost({
      user: props.username,
      userimgsrc: props.userimgsrc,
      categories: [''],
      title: '',
      text: postContent,
      isSaved: true,
      isSponsored: sponsored,
      eventLink: postEvent,
      shopLink: postShopLink,
      media: postMedia,
      link: postLink,
      id: Date.now(),
      timestamp: new Date(),
    });
    navigate('/');
  }

  function noSave() {
    alert('WARNING: Draft saves are not currently implemented.');
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeading}>
        <FontAwesomeIcon
          className={styles.backButton}
          icon={faChevronLeft}
          color="white"
          size="2xs"
          onClick={() => navigate('/')}
        />
        <div>Create New Post</div>
      </div>

      <div className={styles.outerBox}>
        <div className={styles.post}>
          <div className={styles.postHeader}>
            <img
              className={styles.profileImage}
              src={props.userimgsrc}
              width="10%"
              height="10%"
              alt=""
              border-radius="50%"
            ></img>
            <div className={styles.postUser}>{props.username}</div>
          </div>
          <div className={styles.postText}>
            <textarea
              value={postContent}
              placeholder="My pet did something amazing today..."
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className={styles.postOptions}>
        <div className={styles.dropdownBox}>
          <label>
            <div>Animal Type</div>
          </label>
          <select name="animalCategory" id="animalCategory">
            <option value="Select Animal Type">Please Select...</option>
            <optgroup label="Amphibian">
              <option value="Frogs & Toads">Frogs & Toads</option>
              <option value="Axolotls, Newts, Salamanders">
                Axolotls, Newts, Salamanders
              </option>
            </optgroup>
            <optgroup label="Birds">
              <option value="Birds of Prey">Birds of Prey</option>
              <option value="Parrots">Parrots</option>
              <option value="Songbirds">Songbirds</option>
            </optgroup>
            <optgroup label="Fish">
              <option value="Betta">Betta</option>
              <option value="Chichlid">Chichlid</option>
              <option value="Freshwater">Freshwater</option>
              <option value="Koi & Goldfish">Koi & Goldfish</option>
              <option value="Tropical">Tropical</option>
            </optgroup>
            <optgroup label="Invertibrates">
              <option value="Crustaceans & Mollusks">
                Crustaceans & Mollusks
              </option>
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
            <optgroup label="Reptiles">
              <option value="Lizards">Lizards</option>
              <option value="Snakes">Snakes</option>
              <option value="Turtles">Turtles</option>
            </optgroup>
          </select>
        </div>
        <button className={styles.option}>
          <PlusIcon width={27} height={27} colour={'#454545'}></PlusIcon>
          <div className={styles.optionText}></div>
          <input
            value={postMedia}
            placeholder="Add Media Link..."
            onChange={(e) => setMedia(e.target.value)}
          ></input>
        </button>

        <button className={styles.option}>
          <FontAwesomeIcon width={27} height={27} icon={faChain} size="1x" />
          <div className={styles.optionText}></div>
          <input
            value={postLink}
            placeholder="Add External Link..."
            onChange={(e) => setLink(e.target.value)}
          ></input>
        </button>

        <button className={styles.option}>
          <FontAwesomeIcon width={27} height={27} icon={faCalendar} size="2x" />
          <div className={styles.optionText}></div>
          <input
            value={postEvent}
            placeholder="Add Event Link..."
            onChange={(e) => setEvent(e.target.value)}
          ></input>
          <button
            className={styles.optionButtons}
            onClick={() => navigate('/events')}
          >
            View Events
          </button>
        </button>

        <button className={styles.option}>
          <FontAwesomeIcon width={27} height={27} icon={faShop} size="2x" />
          <div className={styles.optionText}></div>
          <input
            value={postShopLink}
            placeholder="Add Shop Link..."
            onChange={(e) => setShop(e.target.value)}
          ></input>
          <button
            className={styles.optionButtons}
            onClick={() => navigate('/shop')}
          >
            View Shop
          </button>
        </button>

        <button className={styles.option}>
          <label
            className={styles.container}
            style={{ height: '25px', width: '25px' }}
          >
            <input
              type="checkbox"
              checked={sponsored}
              onChange={(e) => setSponsor(e.target.checked)}
            ></input>
            <span className={styles.checkmark}></span>
          </label>
          <div className={styles.optionText}>This post is sponsored</div>
        </button>
      </div>

      <div className={styles.postSaveActions}>
        <div className={styles.confirmButton} onClick={handleNewPost}>
          Publish Post
        </div>
        <div className={styles.cancelButton} onClick={() => navigate('/')}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default memo(NewPostPage);
