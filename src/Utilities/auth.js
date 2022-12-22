export const setAuthToken = (user) =>{
    const currentUser ={
        email: user.email
    }
    //get jwt token
    fetch('https://genius-car-server-red-one.vercel.app/jwt', {
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify(currentUser),
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        //local storage is easiest but not the best place place to store it
        localStorage.setItem('geniusToken', data.token) 
        
    });
}