import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import {Button} from '../../components/Button';


export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5
  };

  async componentDidMount() { // ComponentDidMount é o a função que vai executar, quando os dados acabarem de ser executados
    await this.loadPosts();
  }

  loadPosts = async () => {  // Carregando os dados que foram obitidos na const postAndPhotos, e setando o estado com esses dados prontos
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts(); 
    this.setState({ 
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    });
  }

  loadMorePost = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page +postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);
   this.setState({ posts, page: nextPage});

  }

  
  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
    <section className='container'>
      <Posts posts={posts} />

      <div className='button-container'>
        <Button
          text='Load more posts'
          onClick={this.loadMorePost}
          disabled={noMorePosts}
        />
      </div>
      
    </section>
    );
  }
}