const form = document.querySelector('form')
form.addEventListener('submit', postEntry)

window.addEventListener('hashchange', updateContent);


function updateContent(){
    const path = window.location.hash.substring(1).replace(/%20/g, " ");
    console.log(path)
    getOnePost(path)
    .then(d => renderPost(d))
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
        let url = window.location.href
        let hash = '#'+data.unique_id.replace(/ /g,"%20")
        window.location.href = url+hash
    } catch (err) {
        console.warn(err);
    }
}
async function getOnePost(uniqueId){
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${uniqueId}`);
            const data = await response.json();
            res(data);
        } catch (err) {
            rej(`Error retrieving posts: ${err}`)
        }
    })
}
function renderPost(postData) {
    form.innerHTML="";
    const postSection = document.createElement('div');
    const title = document.createElement('h2');
    const username = document.createElement('h4');
    const body = document.createElement('p');
    title.textContent = postData.title;
    username.textContent = postData.username;
    body.textContent = postData.body;
    postSection.append(title);
    postSection.append(username);
    postSection.append(body);
    form.append(postSection);
}