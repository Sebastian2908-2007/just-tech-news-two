async function newPostHandler(event) {
    
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const postUrl = document.querySelector('input[name="post-url"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            postUrl 
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
      console.log('hello')
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);

