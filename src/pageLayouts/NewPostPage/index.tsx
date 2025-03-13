import { memo, useState } from 'react';

import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faUser,
  faShop,
  faChain,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import VisibilitySelector from '../../components/VisibilitySelector';
import PlusIcon from '../../components/PlusIcon';
import CategorySelector from '../../components/CategorySelector';

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

const [selectedAnimalCategories, setSelectedAnimalCategories] = useState<string[]>([]);
const [selectedActivityCategories, setSelectedActivityCategories] = useState<string[]>([]);

const NewPostPage = (props: inUserProps) => {
  return <div className={styles.page}>
    <div className={styles.pageHeading}>
      Create New Post
    </div>

    <div className={styles.outerBox}>
      <div className={styles.post}>
        <div className = {styles.postHeader}>
          <img src={props.userimgsrc} width="10%" height= "10%" alt="" border-radius="50"></img>
          <div className = {styles.postUser}>{props.username}</div>
          <VisibilitySelector></VisibilitySelector>
        </div>

        <div className = {styles.postText}>
          <textarea className={styles.textInput}>My pet did something amazing today...</textarea>
        </div>
      </div>
    </div>

    <div className={styles.postOptions}>
      <div className={styles.option}>
        <PlusIcon width={32} height={32} colour={"#454545"}></PlusIcon>
        <div className={styles.optionText}>Add Image/Photo</div>
      </div>

      <div className={styles.option}>
      <FontAwesomeIcon icon={faUser} size="2x" />
        <div className={styles.optionText}>Tag People</div>
      </div>

      <div className={styles.option}>
      <FontAwesomeIcon icon={faCalendar} size="2x" />
        <div className={styles.optionText}>Add Event</div>
      </div>

      <div className={styles.option}>
        <FontAwesomeIcon icon={faChain} size="1x" />
        <div className={styles.optionText}>Add Link</div>
      </div>

      <div className={styles.option}>
        <FontAwesomeIcon icon={faShop} size="2x" />
        <div className={styles.optionText}>Add Shop Link</div>
      </div>

      <div className={styles.option}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>     
        <div className={styles.optionText}>This post is sponsored</div>
      </div>

      <div className={styles.test}>
        
      </div>
      
      

    </div>
  </div>;
};

export default memo(NewPostPage);
