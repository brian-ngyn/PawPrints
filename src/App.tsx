import { Route, Routes } from 'react-router';
import Footer from './components/Footer';
import styles from './globals.module.scss';
import Home from './pageLayouts/Home';
import Events from './pageLayouts/Events';
import Groups from './pageLayouts/Groups';
import Shop from './pageLayouts/Shop';
import Profile from './pageLayouts/Profile';
import ProfileView from './pageLayouts/ProfileView';
import DummyProfile from './pageLayouts/DummyProfile';
import { LocationProvider } from './contexts/LocationContext';
import { ProfilePicProvider } from './contexts/ProfilePicContext';
import { PetProfilePicProvider } from './contexts/PetProfilePicContext';
import { UserProfileProvider } from './contexts/UserProfileContext';
import { PetProfileProvider } from './contexts/PetProfileContext';

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <LocationProvider>
      <ProfilePicProvider>
      <PetProfilePicProvider>
      <PetProfileProvider>
      <UserProfileProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileView" element={<ProfileView />} />
          <Route path="/dummyProfile" element={<DummyProfile />} />
        </Routes>
      </UserProfileProvider>
      </PetProfileProvider>
      </PetProfilePicProvider>
      </ProfilePicProvider>
      </LocationProvider>
        <Footer />
      </div>
    </div>
  );
};

export default App;
