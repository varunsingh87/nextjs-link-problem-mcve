import {getColumnsData} from '../columns';
import { getWriterById, getAllWriters } from '../staff';
import util from 'util';

class Article {
    /**
     * Constructor to instantiate a new Article
     * @param {number} id The unique numeric ID of the article
     * @param {string} title the title of the article
     * @param {string} body the body of the article
     * @param {number} column_id the ID of the column
     * @param {number} writer_id the ID of the Journalist who wrote the article
     */
    constructor({id, title, body, column_id, writer_id}) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.columnID = column_id;
        this.writerID = writer_id || 1;
    }

    /**
     * Sets the columnID property to the id of the new column name
     * @param {string} newColumnName The name of the new column
     */
    set columnName(newColumnName) {
        let newColumnID;
        if (newColumnID = getColumnsData().find(column => column.name == newColumnName)) {
            this.columnID = newColumnID;
        }
    }

    /**
     * Gets the article's column's name
     */
    get columnName() {
        return this.columnName ?? getColumnsData().find(column => column.id == this.columnID).name;
    }

    /**
     * Gets the article's writer
     * @returns {Promise<Journalist>} The journalist that wrote this article
     */
    get writer() {
        return util.promisify(getWriterById)(this.writerId);
    }

    /**
     * @param {Journalist} newWriter
     * Sets value of writer
     * No validation
     */
    set writer(newWriter) {
        this.writerID = newWriter.id;
    }
}

export default Article;