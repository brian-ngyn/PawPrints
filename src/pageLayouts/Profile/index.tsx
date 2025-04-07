import React, { useEffect, useState, memo } from 'react';
import styles from './index.module.scss';
import { FaCamera, FaEnvelope, FaBell} from 'react-icons/fa';
import { useNavigate } from 'react-router';

import LocationSelector from '../../components/ProfileComponents/LocationSelector';
import BobSelector1 from '../../components/ProfileComponents/AccountVisibilitySelector';
import BobSelector2 from '../../components/ProfileComponents/PostVisibilitySelector';
import BobSelector3 from '../../components/ProfileComponents/CommentVisibilitySelector';
import BobSelector4 from '../../components/ProfileComponents/MessageVisibilitySelector';
import BobSelector5 from '../../components/ProfileComponents/PetVisibilitySelector';

import { useLocation } from '../../contexts/LocationContext';
import { useProfilePic } from '../../contexts/ProfilePicContext';
import { usePetProfilePic } from '../../contexts/PetProfilePicContext';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { usePetProfile } from '../../contexts/PetProfileContext';


const Profile = () => {
  let navigate = useNavigate();
  const { username, description, setUsername, setDescription } = useUserProfile();
  const { petUsername, petDescription, setPetUsername, setPetDescription } = usePetProfile();
  const { location, setLocation } = useLocation();

  const [activeTab, setActiveTab] = useState('General');
  const [profilePic, setLocalProfilePic] = useState<string | null>(null); 
  const [petProfilePic, setLocalPetProfilePic] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedNonsense1, setSelectedNonsense1] = useState<string[]>([]);
  const [selectedNonsense2, setSelectedNonsense2] = useState<string[]>([]);
  const [selectedNonsense3, setSelectedNonsense3] = useState<string[]>([]);
  const [selectedNonsense4, setSelectedNonsense4] = useState<string[]>([]);
  const [selectedNonsense5, setSelectedNonsense5] = useState<string[]>([]);
  const [localUsername, setLocalUsername] = useState<string | null>(username);
  const [localDescription, setLocalDescription] = useState<string | null>(description);
  const [localPetUsername, setLocalPetUsername] = useState<string | null>(petUsername);
  const [localPetDescription, setLocalPetDescription] = useState<string | null>(petDescription);

  // confirm saved changes
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  // confirm leaving page
  const [isPopupVisible1, setIsPopupVisible1] = useState(false);

  const { setProfilePic } = useProfilePic();
  const { setPetProfilePic } = usePetProfilePic();




  const locations = ["No Location Set", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland & Labrador", "Nova Scotia", "Northwest Territories", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];

  const privacyChoices = ["Public", "Friends Only", "Only You"];
  
  // location consistent with what is already selected
  useEffect(() => {
    if (location) {
      setSelectedLocation([location]);
    }
  }, [location]);

  // keeping privacy consistent for video
  useEffect(() => {
    const storedSelectedNonsense1 = sessionStorage.getItem('selectedNonsense1');
    const storedSelectedNonsense2 = sessionStorage.getItem('selectedNonsense2');
    const storedSelectedNonsense3 = sessionStorage.getItem('selectedNonsense3');
    const storedSelectedNonsense4 = sessionStorage.getItem('selectedNonsense4');
    const storedSelectedNonsense5 = sessionStorage.getItem('selectedNonsense5');

    if (storedSelectedNonsense1) {
      setSelectedNonsense1([storedSelectedNonsense1]);
    }
    if (storedSelectedNonsense2) {
      setSelectedNonsense2([storedSelectedNonsense2]);
    }
    if (storedSelectedNonsense3) {
      setSelectedNonsense3([storedSelectedNonsense3]);
    }
    if (storedSelectedNonsense4) {
      setSelectedNonsense4([storedSelectedNonsense4]);
    }
    if (storedSelectedNonsense5) {
      setSelectedNonsense5([storedSelectedNonsense5]);
    }
  }, []);

  const handleReturnToProfileClick = () => {
    setIsPopupVisible1(true);
  };

  const handleConfirmLeave = () => {
    setIsPopupVisible1(false);
    navigate('/profileView');
  };

  const handleCancelLeave = () => {
    setIsPopupVisible1(false);
  };


  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalProfilePic(imageUrl);
    }
  };


  const handlePetProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalPetProfilePic(imageUrl);
    }
  };

  const handleSaveButtonClick = () => {
    // user location
    if (selectedLocation.length > 0) {
      setLocation(selectedLocation[0]);
    }
    // user pfp
    if (profilePic) {
      setProfilePic(profilePic);
    }
    // pet pfp
    if (petProfilePic) {
      setPetProfilePic(petProfilePic);
    }
    // user username
    if (localUsername){
      setUsername(localUsername);
    }
    // user description
    if (localDescription){
      setDescription(localDescription);
    }
    // pet username
    if (localPetUsername){
      setPetUsername(localPetUsername);
    }
    // pet description
    if (localPetDescription){
      setPetDescription(localPetDescription);
    }


    // privacy 
    if (selectedNonsense1.length > 0) {
      sessionStorage.setItem('selectedNonsense1', selectedNonsense1[0]);
    }
    if (selectedNonsense2.length > 0) {
      sessionStorage.setItem('selectedNonsense2', selectedNonsense2[0]);
    }
    if (selectedNonsense3.length > 0) {
      sessionStorage.setItem('selectedNonsense3', selectedNonsense3[0]);
    }
    if (selectedNonsense4.length > 0) {
      sessionStorage.setItem('selectedNonsense4', selectedNonsense4[0]);
    }
    if (selectedNonsense5.length > 0) {
      sessionStorage.setItem('selectedNonsense5', selectedNonsense5[0]);
    }

    setIsPopupVisible(true);
    // Optionally hide the popup after 3 seconds
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 4000);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        {/* Profile Picture Section */}
        <div className={styles.profilePicWrapper}>
          <div className={styles.profilePic} onClick={() => document.getElementById('fileInput')?.click()}>
            {/*<img src='/JohnProfilePicture.png'/>*/}
            {profilePic ? (
              <img src={profilePic} alt="Profile Picture" />
            ) : (
              <FaCamera className={styles.cameraIcon} />
            )}
          </div>
          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfilePicChange}
          />
          {/* Button Profile Editing Selection */}
          <div className={styles.menuButtons}>
            <button
              className={activeTab === 'General' ? styles.activeTab : ''}
              onClick={() => setActiveTab('General')}
            >
              About Me
            </button>
            <button
              className={activeTab === 'Privacy' ? styles.activeTab : ''}
              onClick={() => setActiveTab('Privacy')}
            >
              Privacy
            </button>
            <button
              className={activeTab === 'Notifications' ? styles.activeTab : ''}
              onClick={() => setActiveTab('Notifications')}
            >
              Notifications
            </button>
            <button
              className={activeTab === 'Pet Info' ? styles.activeTab : ''}
              onClick={() => setActiveTab('Pet Info')}
            >
              Pet Profile (Optional)
            </button>
          </div>
        </div>

        {/* Form Section (Right)*/}
        <div className={styles.profileContent}>
          {activeTab === 'General' && (
            <div>
                <label>Change your Username:</label>
                <input 
                  type="text" 
                  value = {localUsername || ''}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  placeholder="Enter New Username" 
                />

              <label>Location (Optional):</label>
              <LocationSelector
                allBrands={locations}
                selectedBrands={selectedLocation}
                setSelectedBrands={setSelectedLocation}
              />

              <label>Date of Birth: (Optional)</label>
              <input type="date" />

              <label>About Me:</label>
              <textarea 
                id="aboutMe" 
                name="aboutMe" 
                value={localDescription || ''}
                onChange={(e) => setLocalDescription(e.target.value)}
                rows={4} 
                cols={28}>
              </textarea>

              <br></br><br></br>

            </div>
          )}

          {activeTab === 'Privacy' && (
            <div>
              <label>Account Visibility:</label>
              <BobSelector1
                allBrands={privacyChoices}
                selectedBrands={selectedNonsense1}
                setSelectedBrands={setSelectedNonsense1}
              />

              <label>Post Visibility:</label>
              <BobSelector2
                allBrands={privacyChoices}
                selectedBrands={selectedNonsense2}
                setSelectedBrands={setSelectedNonsense2}
              />

              <label>Comment Visibility:</label>
              <BobSelector3
                allBrands={privacyChoices}
                selectedBrands={selectedNonsense3}
                setSelectedBrands={setSelectedNonsense3}
              />
              <label>Who Can Message Me:</label>
              <BobSelector4
                allBrands={privacyChoices}
                selectedBrands={selectedNonsense4}
                setSelectedBrands={setSelectedNonsense4}
              />
              <label>Pet Info Visibility</label>
              <BobSelector5
                allBrands={privacyChoices}
                selectedBrands={selectedNonsense5}
                setSelectedBrands={setSelectedNonsense5}
              />
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div>
              <label>Notification Preferences:</label>
                <div className={styles.notifyOption}>
                  <br></br>
                  <label>
                    <FaEnvelope className={styles.icon1} />
                  </label>
                  <input type="checkbox"/>
                </div>
                <div className={styles.notifyOption}>
                  <br></br>
                  {/* do not remove that space */}
                  <label> <FaBell className={styles.icon1} /></label>
                  <input type="checkbox"/>
                </div>

              <label>Notify Me About:</label>
                <div className={styles.notifyOption}>
                  <label id="sales-label">Sales</label>
                  <input type="checkbox" id="test122"/>
                </div>
                <div className={styles.notifyOption}>
                  <label id="events-label">Events</label>
                  <input type="checkbox"/>
                </div>
                <div className={styles.notifyOption}>
                  <label id="likes-label">Likes</label>
                  <input type="checkbox"/>
                </div>
                <div className={styles.notifyOption}>
                  <label id="comments-label">Comments</label>
                  <input type="checkbox"/>
                </div>
            </div>
          )}

          {activeTab === 'Pet Info' && (
            <div>

              <label>Change Pet Name:</label>
              <input 
                  type="text" 
                  value = {localPetUsername || ''}
                  onChange={(e) => setLocalPetUsername(e.target.value)}
                  placeholder="Enter the name of your pet" 
              />

              

              <label>Pet's Extra Treat Day: (Optional)</label>
              <input type="date" />

              <div className={styles.profilePic} onClick={() => document.getElementById('fileInputPetPfp')?.click()}>
                {/*<img src='/Scratch.avif' /> */}
                {petProfilePic ? (
                  <img src={petProfilePic} alt="Profile Picture" />
                ) : (
                  <FaCamera className={styles.cameraIcon} />
                )}
              </div>
              {/* Hidden File Input */}
              <input
                type="file"
                id="fileInputPetPfp"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handlePetProfilePicChange}
              />

              
              <br></br>
              <label>About My Pet:</label>
              <textarea 
                id="aboutMe" 
                name="aboutMe" 
                value={localPetDescription || ''}
                onChange={(e) => setLocalPetDescription(e.target.value)}
                rows={4} 
                cols={28}>
              </textarea>


            </div>
          )}
          {isPopupVisible && (
            <div className="popupALT">
              Profile Changes Saved Successfully!
            </div>
          )}

          <button className={styles.saveChangesButton} onClick={handleSaveButtonClick}>Save Changes</button>
          <button className={styles.returnToProfileButton} onClick={handleReturnToProfileClick}>Return to Profile</button>



          {/* Confirmation of Leaving Page Popup*/}
          {isPopupVisible1 && (
            <div className={styles.popupOverlay}>
              <div className={styles.popup}>
                <h3>Are you sure you want to leave this page? Any unsaved changes will be lost!</h3>
                <div className={styles.popupButtons}>
                  <button className={styles.confirmButton} onClick={handleConfirmLeave}>
                    Yes, leave
                  </button>
                  <button className={styles.cancelButton} onClick={handleCancelLeave}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
