import { memo, useState } from 'react';

import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faShop,
  faChain,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import VisibilitySelector from '../../components/VisibilitySelector';
import PlusIcon from '../../components/PlusIcon';
import CategorySelector from '../../components/CategorySelector';
import SearchBar from '../../components/SearchBar';

import { useNavigate } from 'react-router';

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

const SearchPage = () => {
  let navigate = useNavigate();
  
  return <div className={styles.page}>
    <div className={styles.backArrow} onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} size="2x" /></div>

    <div className={styles.searchContainer}><SearchBar/></div>

    <div className={styles.searchTypeContainer}>I'm looking for...
      <div className={styles.searchTypeOption}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>
        <div className={styles.optionText}>Posts</div>
      </div>

      <div className={styles.searchTypeOption}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>     
        <div className={styles.optionText}>Events</div>
      </div>

      <div className={styles.searchTypeOption}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>     
        <div className={styles.optionText}>Groups</div>
      </div>

      <div className={styles.searchTypeOption}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>     
        <div className={styles.optionText}>People</div>
      </div>
    </div>

    <div className={styles.postOptions}>

      <div className={styles.option}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>     
        <div className={styles.optionText}>Only people I follow</div>
      </div>

      <div className={styles.option}>
        <label className={styles.container}>
          <input type="checkbox"></input>
          <span className={styles.checkmark}></span>   
        </label>     
        <div className={styles.optionText}>Only groups I'm follow</div>
      </div>
      
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
      
      <div className = {styles.optionExtraSpace} />

    </div>
  </div>;
};

export default memo(SearchPage);
