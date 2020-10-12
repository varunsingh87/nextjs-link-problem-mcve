import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllArticles } from '../lib/articles'
import ArticleList from './articlelist'

export const siteTitle = 'The Lower Moreland Spectator'

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.allArticles = getAllArticles();
    this.searchArticlesKeyType = this.searchArticlesKeyType.bind(this);
    this.state = {displayedMain: props.children};
  }

  render() {
    const {columns} = this.props;

    return (
      <div>
        <header >
          <nav >
            {
              columns.map(({id, name}) => (
                <Link key={id} href="/columns/[name]" as={`/columns/${name}`}><a>{name}</a></Link>
              ))
            }
          </nav>
          <div>
            <input type="search" name="q" onKeyUp={this.searchArticlesKeyType} />
          </div>
        </header>
        <main>{this.state.displayedMain}</main>
      </div>
    )
  }

  searchArticlesKeyType(e) {
    const query = e.target.value;
    const filteredArticles = this.allArticles
      .filter(item => item.title.includes(query) || item.body.includes(query))  

    this.setState({
      displayedMain: <ArticleList articles={JSON.stringify(filteredArticles)}/>
    });
  }
}
