import './App.css';
import { Component } from 'react';
import {loadPosts} from './utils/load-posts';
import { Posts } from './components/Posts';

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() { // ComponentDidMount é o a função que vai executar, quando os dados acabarem de ser executados
    await this.loadPosts();
  }

  loadPosts = async () => {  // Carregando os dados que foram obitidos na const postAndPhotos, e setando o estado com esses dados prontos
    const postAndPhotos = await loadPosts(); 
    this.setState({ posts: postAndPhotos });
  }

  
  render() {
    const { posts } = this.state;

    return (
    <section className='container'>
      <Posts posts={posts} />
    </section>
    );
  }
}
export default App;