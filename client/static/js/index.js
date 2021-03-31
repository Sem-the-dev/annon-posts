const form = document.querySelector('form')
form.addEventListener('submit', postEntry)

window.addEventListener('hashchange', updateContent);


function updateContent(){
    const path = window.location.hash.substring(1).replace(/%20/g, " ");
    console.log(getOnePost(path))
    
}




async function postEntry(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/posts/`, options)
        const data = await r.json()
        console.log(data)
    } catch (err) {
        console.warn(err);
    }
}



async function getOnePost(uniqueId){
    try {
        const response = await fetch(`http://localhost:3000/posts/${uniqueId}`);
        const data = await response.json();
        return data;
        renderFeed(data)
        
    } catch (err) {
        console.warn(err);
    }
}

async function renderFeed(postData) {
    const newPost = document.createElement('main');
    const post = await getOnePost();
    const renderPost = postData => {

        const postSection = document.createElement('div');
        const title = document.createElement('h3');
        const body = document.createElement('p');
        title.textContent = postData.title;
        body.textContent = postData.body;
        postSection.append(title);
        postSection.append(body);
    }
    
    newPost.append(postSection);
}