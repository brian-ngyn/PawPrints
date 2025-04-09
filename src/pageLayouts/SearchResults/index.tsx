import { memo } from 'react';

import styles from './index.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import Post from '../../components/Post';
import { usePosts } from '../../contexts/PostsContext';
import { getFollowed, getQuery, getSaved } from '../SearchPage/data';

const SearchResults = () => {
  let navigate = useNavigate();

  const { getPosts } = usePosts();
  const query = getQuery();
  let filteredPosts = getPosts();
  if (getSaved()) {
    filteredPosts = filteredPosts.filter((post) => post.isSaved);
  }
  if (getFollowed()) {
    //following isn't a feature we have yet
  }

  filteredPosts = filteredPosts.filter(
    (post) =>
      post.text.toLowerCase().includes(getQuery().toLowerCase()) ||
      post.title.toLowerCase().includes(getQuery().toLowerCase()) ||
      post.user.toLowerCase().includes(getQuery().toLowerCase()),
  );

  let resultName = 'Result: '.concat(query);
  if (query == '') {
    resultName = 'Search Results';
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeading}>
        <FontAwesomeIcon
          className={styles.backButton}
          icon={faChevronLeft}
          color="white"
          size="2xs"
          onClick={() => navigate('/search')}
        />
        <div>{resultName}</div>
      </div>
      <div className={styles.feedSeperator}></div>
      <div className={styles.feed}>
        <div className={styles.feedStart}></div>
        <ul style={{ padding: 'unset' }}>
          {filteredPosts.map((post) => (
            <Post
              key={post.id}
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
              categories={['']}
              timestamp={post.timestamp}
            ></Post>
          ))}
        </ul>
        <div className={styles.feedEnd}></div>
      </div>
    </div>
  );
};

export default memo(SearchResults);
