import Head from 'next/head'
import Layout from '../components/layout'
import { getColumnsData } from '../lib/columns'
import { getAllArticles } from '../lib/articles'
import ArticleList from '../components/articlelist'

export default function Home(props) {
  return (
    <Layout {...props}>
      <Head>
        <title>The Lower Moreland Spectator - Local news since 2020</title>
      </Head>

      {
        props.error ? 
        <p>An error occurred in fetching the articles at this time</p> : 
        <ArticleList {...props} />
      }

    </Layout>
  )
}

export async function getStaticProps(context) {
  const {columns} = JSON.parse(await getColumnsData());
  
  const data = JSON.parse(await getAllArticles());
  if (data["error"] != null) {
    return {
      props: { error: {}, columns }
    }
  }
  
  const {articles} = data;

  return { props: { columns, articles } }
}


