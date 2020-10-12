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
        </header>
        <main>{this.props.children}</main>
      </div>
    )
  }
}
