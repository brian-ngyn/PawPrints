import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from 'react';

import { useUserProfile } from './UserProfileContext';
import { useProfilePic } from './ProfilePicContext';

export type Post = {
  user: string;
  userimgsrc: string;
  categories?: string[];
  title: string;
  text: string;
  isSaved?: boolean;
  isSponsored: boolean;
  eventLink: string;
  shopLink: string;
  media: string;
  link: string;
  id?: number;
  timestamp: Date;
};

interface PostsContextType {
  getPosts: () => Post[];
  addPost: (post: Post) => void;
}

const PostContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useUserProfile();
  const { profilePic } = useProfilePic();
  const [posts, setPosts] = useState<Post[]>([
    {
      user: 'JohnTheVet',
      userimgsrc:
        '/JohnProfilePicture.png',
      categories: [''],
      title: '',
      text: "John's first post, which the user has saved.",
      isSaved: true,
      isSponsored: false,
      eventLink: '',
      shopLink: '',
      media: '',
      link: '',
      //replies:[],
      id: 0,
      timestamp: new Date('2025-03-12T14:48:00'),
    },
    {
      user: username,
      userimgsrc:
        profilePic ? profilePic : 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
      categories: [''],
      title: '',
      text: "Olivia's First Post, which is sponsored.",
      isSaved: false,
      isSponsored: true,
      eventLink: '',
      shopLink: '',
      media: '',
      link: '',
      //replies:[],
      id: 1,
      timestamp: new Date('2025-03-14T14:48:00'),
    },
    {
      user: 'JohnTheVet',
      userimgsrc:
        '/JohnProfilePicture.png',
      categories: [''],
      title: 'This Fourth Post should have a lot of content',
      text: 'Lorem ipsum dolor sic amet. That comes from a corruption of a Roman text on morality. The Romans also had some wacky ideas about the Egyptians, including the idea that their worship of animals was to such a degree as to be more important than their very lives.',
      isSaved: false,
      isSponsored: false,
      eventLink: '',
      shopLink: '',
      media: '',
      link: '',
      //replies:[],
      id: 2,
      timestamp: new Date('2025-03-16T14:48:00'),
    },
    {
      user: 'JohnTheVet',
      userimgsrc:
        '/JohnProfilePicture.png',
      categories: [''],
      title: 'This post has an image',
      text: "Here's some text about the image",
      isSaved: false,
      isSponsored: false,
      eventLink: '',
      shopLink: '',
      media:
        'https://media.4-paws.org/c/1/7/8/c178dd618346079f9b96edeacc30563b8de72fb4/Molly_006-2829x1886-2726x1886-1920x1328.webp',
      link: '',
      //replies:[],
      id: 3,
      timestamp: new Date('2025-03-18T14:48:00'),
    },
    {
      user: 'JohnTheVet',
      userimgsrc:
        '/JohnProfilePicture.png',
      categories: [''],
      title: '',
      text: 'This is another post by John, which has links',
      isSaved: false,
      isSponsored: false,
      eventLink: '',
      shopLink: '',
      media: '',
      link: 'https://ucalgary.ca',
      id: 4,
      timestamp: new Date('2025-03-20T14:48:00'),
    },
  ]);

  useEffect(() => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => ({
        ...post,
        user: post.user !== 'JohnTheVet' ? username: post.user,
        userimgsrc: post.user !== 'JohnTheVet'
        ? (profilePic ? profilePic : 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png')
        : post.userimgsrc,
      }))
    );
  }, [username, profilePic]);

  const getPosts = useCallback(() => {
    return posts.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }, [posts]);

  const addPost = useCallback(
    (post: Post) => {
      setPosts((prevPosts) => [...prevPosts, post]);
    },
    [setPosts],
  );

  return (
    <PostContext.Provider value={{ getPosts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('Error with usePosts in usePosts');
  }
  return context;
};
