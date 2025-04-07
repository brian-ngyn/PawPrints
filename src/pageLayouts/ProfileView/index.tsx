import { FaEnvelope, FaUserPlus, FaCog, FaMapMarkerAlt } from 'react-icons/fa'; 
import Post from '../../components/Post'; 
import styles from './index.module.scss'; 
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { useLocation } from '../../contexts/LocationContext';
import { useProfilePic } from '../../contexts/ProfilePicContext';
import { usePetProfilePic } from '../../contexts/PetProfilePicContext';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { usePetProfile } from '../../contexts/PetProfileContext';

const ProfileView = () => {
    let navigate = useNavigate();

    const { location } = useLocation();
    const { profilePic } = useProfilePic();
    const { PetProfilePic } = usePetProfilePic();
    const { username, description } = useUserProfile();
    const { petUsername, petDescription } = usePetProfile();

  return (
    <div className={styles.profileViewContainer}>
      {/* Profile Section src='/JohnProfilePicture.png' https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png*/}
      <div className={styles.profileHeader}>
        <div className={styles.profilePicWrapper}>
          <img 
            src= {profilePic || 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png'}
            alt="Profile Picture" 
            className={styles.profilePic} 
          />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.username}>{username || 'NewUser12345'}</h2>
          <p className={styles.description}>
            {description || 'I am a new user! I will probably write my About Me soon!'}
          </p>

          <div className={styles.locationtag}>
            <FaMapMarkerAlt className={styles.icon1}></FaMapMarkerAlt> {location || 'No Location Set'}
          </div>

        </div>
        <div className={styles.settingsIcon}>
            <FaCog className={styles.icon2} onClick={() => navigate('/profile')}/>
        </div>
      </div>



    <div className={styles.profileActionsPetContainer}>



        {/* buttons for msg & follow*/}
        {/* hiding them because this page is the user's own profile */}

        {/*
       <div className={styles.profileActions}>
            <button className={styles.messageButton}>
                <FaEnvelope className={styles.icon1} />
            </button>
            <button className={styles.followButton}>
                <FaUserPlus className={styles.icon1} />
            </button>
            </div>
        */}


        {/* pet profile */}


        {petUsername && (
          <div className={styles.petProfile}>
            <div className={styles.petPicWrapper}>
            <img 
                src= {PetProfilePic || "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png" }
                alt="Pet" 
                className={styles.petPic} 
            />
            </div>
            <div className={styles.petInfo}>
            <h3 className={styles.petName}>{petUsername}</h3>
            <p className={styles.petDescription}>
                {petDescription}
            </p>
          </div>
        </div>)}
    </div>


      {/* Recent Posts Section ... 7 breaks */}
      <div className={styles.recentPosts}>
        <h3>Recent Posts</h3>
        <Post 
          title="My First Post" 
          userimgsrc={profilePic || 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png'}
          username={username || 'NewUser12345'}
        />
        
        
        
        {/* Could possibly add more posts here if necessary */}
      </div>
    </div>
  );
};

export default memo(ProfileView);