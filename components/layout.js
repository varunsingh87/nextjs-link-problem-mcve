import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import layout from './layout.module.css'
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
      <div className={layout.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
        </Head>

        <header className={layout.header}>
          <h1 className={layout.title}>
            <Link href="/">
              <a>The Lower Moreland Spectator</a>
            </Link>
            
          </h1>
          <nav className={layout.columnContainer}>
            {
              columns.map(({id, name}) => (
                <Link key={id} href="/columns/[name]" as={`/columns/${name}`}><a>{name}</a></Link>
              ))
            }
          </nav>
          <div className={layout.search}>
            <input type="search" name="q" onKeyUp={this.searchArticlesKeyType} />
          </div>
        </header>
        <main className={layout.main}>{this.state.displayedMain}</main>
        
        <footer className={layout.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={layout.logo} />
          </a>
        </footer>
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
