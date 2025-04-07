import { FaEnvelope, FaUserPlus, FaCog, FaMapMarkerAlt } from 'react-icons/fa'; 
import Post from '../../components/Post'; 
import styles from './index.module.scss'; 
import { memo } from 'react';
//import { useNavigate } from 'react-router';

const DummyProfileView = () => {
    //let navigate = useNavigate();

  return (
    <div className={styles.profileViewContainer}>
      {/* Profile Section src='/JohnProfilePicture.png' https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png*/}
      <div className={styles.profileHeader}>
        <div className={styles.profilePicWrapper}>
          <img 
            src= {'/JohnProfilePicture.png'}
            alt="Profile Picture" 
            className={styles.profilePic} 
          />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.username}>{'JohnTheVet'}</h2>
          <p className={styles.description}>
            {'I am a Vet, hoping to give easy to digest and understand health tips for pets!'}
          </p>

          <div className={styles.locationtag}>
            <FaMapMarkerAlt className={styles.icon1}></FaMapMarkerAlt> {'No Location Set'}
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
            <button className={styles.messageButton}>
                <FaEnvelope className={styles.icon1} />
            </button>
            <button className={styles.followButton}>
                <FaUserPlus className={styles.icon1} />
            </button>
            </div>
        


        {/* pet profile */}


          <div className={styles.petProfile}>
            <div className={styles.petPicWrapper}>
            <img 
                src= {"/Scratch.avif" }
                alt="Pet" 
                className={styles.petPic} 
            />
            </div>
            <div className={styles.petInfo}>
            <h3 className={styles.petName}>{"Scratch"}</h3>
            <p className={styles.petDescription}>
                {"Scratch is a super fun dog who loves to play fetch!"}
            </p>
          </div>
        </div>
    </div>


      {/* Recent Posts Section ... 7 breaks */}
      <div className={styles.recentPosts}>
        <h3>Recent Posts</h3>
        <Post 
          title="I love really cool animals!" 
          userimgsrc={'/JohnProfilePicture.png'}
          username={'JohnTheVet'}
        />
        
        
        
        {/* Could possibly add more posts here if necessary */}
      </div>
    </div>
  );
};

export default memo(DummyProfileView);