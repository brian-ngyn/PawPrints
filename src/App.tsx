import { Route, Routes } from 'react-router';
import Footer from './components/Footer';
import styles from './globals.module.scss';
import Home from './pageLayouts/Home';
import Events from './pageLayouts/Events';
import Groups from './pageLayouts/Groups';
import Shop from './pageLayouts/Shop';
import Profile from './pageLayouts/Profile';
import NewPostPage from './pageLayouts/New Post'

const App = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<NewPostPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
