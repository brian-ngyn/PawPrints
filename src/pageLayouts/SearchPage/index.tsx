import { memo, useState } from 'react';

import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faShop,
  faChain,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import VisibilitySelector from '../../components/VisibilitySelector';
import PlusIcon from '../../components/PlusIcon';
import CategorySelector from '../../components/CategorySelector';
import SearchBar from '../../components/SearchBar';

import { useNavigate } from 'react-router';
import { getCategories, getFollowed, getQuery, getSaved } from './data';
import {
  addCategory,
  setFollowed,
  setQuery,
  setSaved,
  resetSearch,
} from './data';

const animalcategories = [
  'Amphibians',
  'Frogs and Toads',
  'Axolotls, Newts, Salamanders',
  'Birds',
  'Birds of Prey',
  'Parrots',
  'Songbirds',
  'Fish',
  'Betta',
  'Cichlid',
  'Freshwater',
  'Koi & Goldfish',
  'Tropical',
  'Invertibrates',
  'Crustaceans & Mollusks',
  'Insects',
  'Spiders & Arachnids',
  'Mammals',
  'Cats',
  'Dogs',
  'Large Mammals',
  'Mustelids',
  'Rodents',
  'Reptiles',
  'Lizards',
  'Snakes',
  'Turtles',
];

/*const [selectedAnimalCategories, setSelectedAnimalCategories] = useState<string[]>([]);
const [selectedActivityCategories, setSelectedActivityCategories] = useState<string[]>([]);*/

const SearchPage = () => {
  let navigate = useNavigate();

  const [searchSaved, setSearchSaved] = useState(getSaved());
  const [searchFollowed, setSearchFollowed] = useState(getFollowed());
  const [searchQuery, setSearchQuery] = useState(getQuery());

  addEventListener('keydown', (event) => {});

  onkeydown = (event) => {
    if (event.key == 'Enter') {
      search();
    }
  };

  function search() {
    setSaved(searchSaved);
    setFollowed(searchFollowed);
    setQuery(searchQuery);
    navigate('/searchResults');
  }

  function reset() {
    resetSearch();
    setSearchSaved(getSaved());
    setSearchFollowed(getFollowed());
    setSearchQuery(getQuery());
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
        <div>Search</div>
      </div>

      <div className={styles.filterControls}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search for... kittens"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSubmit={() => search()}
        />

        <div className={styles.searchAction}>
          <button className={styles.confirmButton} onClick={search}>
            Search
          </button>
        </div>
      </div>

      <div className={styles.postOptions}>
        <div className={styles.searchTypeContainer}>
          <button
            className={styles.searchTypeOption}
            style={{ margin: '10px auto 10px 10px' }}
            onClick={() => navigate('/events')}
          >
            Search for Events
          </button>
          <button
            className={styles.searchTypeOption}
            onClick={() => navigate('/groups')}
          >
            Search for Groups
          </button>
        </div>

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
          <label
            className={styles.container}
            style={{ height: '25px', width: '25px' }}
          >
            <input
              type="checkbox"
              checked={searchFollowed}
              onChange={(e) => setSearchFollowed(e.target.checked)}
            ></input>
            <span className={styles.checkmark}></span>
          </label>
          <div className={styles.optionText}>Only people I follow</div>
        </button>

        <button className={styles.option}>
          <label
            className={styles.container}
            style={{ height: '25px', width: '25px' }}
          >
            <input
              type="checkbox"
              checked={searchSaved}
              onChange={(e) => setSearchSaved(e.target.checked)}
            ></input>
            <span className={styles.checkmark}></span>
          </label>
          <div className={styles.optionText}>Only posts I've saved</div>
        </button>
      </div>

      <div className={styles.resetAction}>
        <div></div>
        <div className={styles.cancelButton} onClick={() => reset()}>
          Clear Search Criteria
        </div>
      </div>

      <div className={styles.optionExtraSpace} />
    </div>
  );
};

export default memo(SearchPage);
