import { Route, Routes } from 'react-router';
import Footer from './components/Footer';
import styles from './globals.module.scss';
import Home from './pageLayouts/Home';
import SearchPage from './pageLayouts/SearchPage';
import SearchResults from './pageLayouts/SearchResults';
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
import NewPostPage from './pageLayouts/NewPostPage';
import NotificationCentre from './pageLayouts/NotificationCentre';
import { PostsProvider } from './contexts/PostsContext';

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <ProfilePicProvider>
      <UserProfileProvider>
        <PostsProvider>
          <LocationProvider>
              <PetProfilePicProvider>
                <PetProfileProvider>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="/new-post"
                        element={
                          <NewPostPage
                            //username="Olivia"
                            //userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png"
                          />
                        }
                      />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/searchResults" element={<SearchResults />} />
                      <Route
                        path="/notifications"
                        element={<NotificationCentre />}
                      />
                      <Route path="/events" element={<Events />} />
                      <Route path="/groups" element={<Groups />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profileView" element={<ProfileView />} />
                      <Route path="/dummyProfile" element={<DummyProfile />} />
                    </Routes>
                </PetProfileProvider>
              </PetProfilePicProvider>
          </LocationProvider>
        </PostsProvider>
        </UserProfileProvider>
        </ProfilePicProvider>
        <Footer />
      </div>
    </div>
  );
};

export default App;
