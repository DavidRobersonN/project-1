import { Component } from 'react';
import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  };

  async componentDidMount() {
    // ComponentDidMount é o a função que vai executar, quando os dados acabarem de ser executados
    await this.loadPosts();
  }

  loadPosts = async () => {
    // Carregando os dados que foram obtidos na const postAndPhotos, e setando o estado com esses dados prontos
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    });
  };

  loadMorePost = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPost);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    // Esta onChange precisa receber uma função, esse função vai receber o proprio evento que estamos trabalhando, neste evento tem as informações do evento... como por exemplo temos o target do evento
    const { value } = e.target; // Pegando o Valor 'value' de dentro do e.target
    this.setState({ searchValue: value }); // Setando o meu estado com esse novo valor
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = searchValue // Operação condicional ternaria   se searchValue for verdadeiro, faça açã 1,  se nao, ação 2
      ? // ação 1
        allPosts.filter((post) => {
          // Filtrando, convertendo para minusculos, e verificando se a dentro de searchPosts, e retornando de dentro de allPosts
          return post.title
            .toLowerCase() // Converte os titulos para minusculo,
            .includes(
              searchValue.toLowerCase(), //  e verifica se tem dentro de searchValue, tmb convertendo para minusculo
            );
        })
      : // Ação 2
        posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && ( // Se o tamanho de filteredPosts for maior que zero, ou seja, nao seja vazio
          <Posts posts={filteredPosts} /> //   faça isso
        )}

        {filteredPosts.length === 0 && ( // Se for igual a zero, ou seja, esteja vazio e nao haja posts que foram procurados,
          <p> Não existem posts </p> //    faça isso
        )}

        <div className="button-container">
          {!searchValue && <Button text="Load more posts" onClick={this.loadMorePost} disabled={noMorePosts} />}
        </div>
      </section>
    );
  }
}
