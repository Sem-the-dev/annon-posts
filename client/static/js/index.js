const form = document.querySelector('form')
form.addEventListener('submit', postEntry)




async function postEntry(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        console.log(new FormData(e.target))
        const r = await fetch(`http://localhost:3000/posts/`, options)
        const data = await r.json()
    } catch (err) {
        console.warn(err);
    }
}


async function getOnePost(uniqueId){
    try {
        const response = await fetch(`http://localhost:3000/posts/${uniqueId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}
