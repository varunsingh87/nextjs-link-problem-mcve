import Article from './datastructures/Article';
import { server } from '../config';

/**
 * Retrieves all articles, no filters
 */
async function getAllArticles() {
    try {
        const res = await fetch(`https://the-lower-moreland-spectator.vercel.app/api/articles`);
        const json = await res.json();
        return JSON.stringify(json);
    } catch (e) {
        return JSON.stringify({
            error: {
                message: "The articles could not be loaded at this time. We apologize for the inconvenience."
            }
        })
    }
}

/**
 * Retrieves all the articles for a single column
 * @param {string or number} id the name or id of the column 
 */
async function getArticlesByColumn(id) {
    return getArticleData().filter(article => article.columnID == id);    
}

/**
 * Retrieves the data of a single article
 * @param {number} id the id of the article whose data is being retrieved 
 */
async function getArticleById(id) {
    return getArticleData()[id - 1];
}

/**
 * Gets an article by name
 * @param {string} title
 * @returns the article with the name @param title 
 */
async function getArticleByName(title) {
    const {articles} = await getArticleData();
    return articles.find(article => article.title == title);
}

async function getArticleData() {
    return JSON.parse(await getAllArticles());
}

export { getAllArticles, getArticlesByColumn, getArticleById, getArticleByName, getArticleData }