export const LoginAPI = {
    register(registerDetails){
        const requestOptions = {
            method: "POST",
            headers: {"contens-type": "application.json"},
            body: registerDetails
        }
    return fetch("URL", requestOption)
            .then(response => response.json())
            .then(data=>data.data) //Return data
    },
    login(loginDetails){
        const requestOptions = {
            method: "POST",
            headers: {"contens-type": "application.json"},
            body: loginDetails
        }
    return fetch("URL", requestOption)
        .then(response => response.json())
        .then(data=>data.data) //Return data
    },
}