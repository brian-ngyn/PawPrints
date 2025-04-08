import Post from '../../components/Post';
import { usePosts } from '../../contexts/PostsContext';

export default function Feed() {
  const { getPosts } = usePosts();
  return (
    <ul style={{ padding: 'unset' }}>
      {getPosts().map((post) => (
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
  );
}
