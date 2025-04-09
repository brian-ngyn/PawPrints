import { FaEnvelope, FaUserPlus, FaCog, FaMapMarkerAlt } from 'react-icons/fa';
import Post from '../../components/Post';
import styles from './index.module.scss';
import { memo, useState } from 'react';
//import { useNavigate } from 'react-router';
import { usePosts } from '../../contexts/PostsContext';

const DummyProfileView = () => {
  //let navigate = useNavigate();
  const { getPosts } = usePosts();
  const [isPopupVisible1, setIsPopupVisible1] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);

  

  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.user === 'JohnTheVet');

  const handlePopup1Enable = () => {
    setIsPopupVisible1(true);
  };

  const handlePopup2Enable = () => {
    setIsPopupVisible2(true);
  }

  const handleCancelLeave = () => {
    setIsPopupVisible1(false);
    setIsPopupVisible2(false);
  };

  return (
    <div className={styles.profileViewContainer}>
      {/* Profile Section src='/JohnProfilePicture.png' https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png*/}
      <div className={styles.profileHeader}>
        <div className={styles.profilePicWrapper}>
          <img
            src={'/JohnProfilePicture.png'}
            alt="Profile Picture"
            className={styles.profilePic}
          />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.username}>{'JohnTheVet'}</h2>
          <p className={styles.description}>
            {
              'I am a Vet, hoping to give easy to digest and understand health tips for pets!'
            }
          </p>

          <div className={styles.locationtag}>
            <FaMapMarkerAlt className={styles.icon1}></FaMapMarkerAlt>{' '}
            {'No Location Set'}
          </div>
        </div>

        {/* This is commented out because this page is viewing someone elses profile */}
        {/*
        <div className={styles.settingsIcon}>
            <FaCog className={styles.icon2} onClick={() => navigate('/profile')}/>
        </div>*/}
      </div>

      <div className={styles.profileActionsPetContainer}>
        {/* buttons for msg & follow*/}
        {/* Revealing this cause you are looking at someone elses profile */}

        <div className={styles.profileActions}>
          <button onClick={handlePopup1Enable} className={styles.messageButton}>
            <FaEnvelope className={styles.icon1} />
          </button>
          <button onClick={handlePopup2Enable} className={styles.followButton}>
            <FaUserPlus className={styles.icon1} />
          </button>
        </div>

        {/* pet profile */}

        <div className={styles.petProfile}>
          <div className={styles.petPicWrapper}>
            <img src={'/Scratch.avif'} alt="Pet" className={styles.petPic} />
          </div>
          <div className={styles.petInfo}>
            <h3 className={styles.petName}>{'Scratch'}</h3>
            <p className={styles.petDescription}>
              {'Scratch is my super fun dog who loves to play fetch!'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Posts Section ... 7 breaks */}
      <div className={styles.recentPosts}>
      <h3>Recent Posts</h3>
          <div className={styles.newPosts}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Post
                  key = {index}
                  user = 'JohnTheVet'
                  userimgsrc = '/JohnProfilePicture.png'
                  title = {post.title}
                  text = {post.text}
                  isSaved = {post.isSaved}
                  isSponsored = {post.isSponsored}
                  eventLink = {post.eventLink}
                  shopLink = {post.shopLink}
                  media = {post.media}
                  link = {post.link}
                  id = {post.id}
                  timestamp = {post.timestamp}
                />
              ))
            ) : (
              <p> No posts available.</p>
            )}
          </div>

          {isPopupVisible1 && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
                <h3>
                  This user is only accepting messages from friends. 
                  Try adding them as a friend if you wish to message them. 
                </h3>
                <div className={styles.popupButtons}>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancelLeave}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
          {isPopupVisible2 && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
                <h3>
                  Your friend request was sent successfully! 
                  (Feature is still in development) 
                </h3>
                <div className={styles.popupButtons}>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancelLeave}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default memo(DummyProfileView);
