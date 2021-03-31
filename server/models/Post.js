const db = require('../dbConfig/config');
const SQL = require('sql-template-strings');



class Post {
    constructor(data) {
        this.id = data.id
        this.unique_id = data.unique_id
        this.title = data.title
        this.username = data.username
        this.body = data.body
        
        
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`SELECT posts.* 
                                                    FROM posts`);
                let posts = result.rows.map(r => new Post(r))
                console.log(posts)
                res(posts)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })
    }



    static create(data){
        return new Promise(async (res, rej) => {
            try {
                const dateToday = new Date();
                const date = dateToday.getDate();
                const month = dateToday.getMonth()+1;

                
                const userId = `${data.title}-${date}-${month}`
                console.log(userId)               
                let result = await db.run(SQL `INSERT INTO posts (title, unique_id, username, body) 
                                                    VALUES (${data.title}, ${userId}, ${data.username}, ${data.body} ) RETURNING * ;`);
                let posts = result.rows.map(r => new Post(r))
                res(posts)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })
    }

    static findById(special_id){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`SELECT * 
                                                    FROM posts
                                                    WHERE posts.unique_id = ${special_id}`);
                let post = new Post(result.rows[0])
                res(post)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })

    }





    
}

module.exports = Post