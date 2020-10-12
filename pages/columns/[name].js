import Layout from '../../components/layout'
import Head from 'next/head'
import { getColumnsData } from '../../lib/columns';
import { getAllArticles, getArticlesByColumn } from '../../lib/articles';
import ArticleList from '../../components/articlelist';

/**
 * 
 * @param {Object} props the properties of the Column page component
 * @param {Object} props.currentColumn the column this page is showing
 * @param {string} props.currentColumn.name the name of the current column 
 */
export default function Column(props) {
    return (
        <Layout {...props}>
            <Head>
                <title>{props.currentColumn.name}</title>
            </Head>

            {props.error ? <p>An error occurred in fetching the articles</p> : <ArticleList {...props} />}
        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        let paths = JSON.parse(await getColumnsData()).columns;
    
        // Wrap each column data property object in a params property object to match shape
        paths = paths.map(item => { return { params: item }});
    
        return {
            paths,
            fallback: false
        }
    } catch {
        return { 
            paths: [ 
                { 
                    params: {
                        title: "Title not found"
                    } 
                } 
            ],
            fallback: false
        }
    }
}

export async function getStaticProps({params}) {
    const {columns} = JSON.parse(await getColumnsData());
    const data = JSON.parse(await getAllArticles());

    if (data["error"] != null) {
        return {
            props: {
                columns,
                currentColumn: {name: "Error"},
                error: {}
            }
        }
    }

    const {articles} = data;

    const currentColumn = columns.find(element => element.name == params.name);
    const columnArticles = articles.filter(article => article["column_id"] == currentColumn.id)
    
    return {
        props: {
            columns,
            currentColumn,
            articles: columnArticles
        }
    }
}