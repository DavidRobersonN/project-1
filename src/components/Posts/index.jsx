import './styles.css';

import { PostCard } from '../postCard';

export const Posts = ({ posts }) => (
    <div className="posts">
        {posts.map(post => (
          <PostCard
            key={post.id} 
            title={post.title}
            body={post.body}
            cover={post.cover}
            id={post.id}
          />
        ))}
    </div>
);