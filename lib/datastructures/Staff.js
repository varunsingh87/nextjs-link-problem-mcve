const staffTypes = {
    journalist: 1,
    editor: 2,
    dbadmin: 3,
}

class Staff {
    constructor(id, name, yearsWorked) {
        this.id = id;
        this.name = name;
        this.yearsWorked = yearsWorked;
    }
}

/**
 * Someone who collects information about events and writes articles for the newspaper
 */
class Journalist extends Staff {
    /**
     * Constructor for Journalist
     * @param {number} id
     * @param {string} name 
     * @param {number} yearsWorked 
     * @param {string} bio 
     */
    constructor(id, name, yearsWorked, bio) {
        super(id, name, yearsWorked);
        this.bio = bio;
    }

    /**
     * Records an article this journalist wrote
     * @param {string} body 
     * @returns {Article} the newly created article, ready for editing
     */
    writeArticle(body) {

    }
}

/**
 * A staff who edits articles before they are published
 */
class Editor extends Staff {
    constructor(id, name, yearsWorked) {
        super(id, name, yearsWorked);
    }
}

/**
 * Someone who managed the database
 */
class DBAdmin extends Staff {
    constructor(id, name, yearsWorked) {
        super(id, name, yearsWorked);
    }
}


export {Staff, Journalist, Editor, DBAdmin, staffTypes};