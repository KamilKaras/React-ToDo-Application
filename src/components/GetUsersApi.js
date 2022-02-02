
function GetAllUsersFromApi(props) {
    // GET request using fetch with error handling
    fetch('https://localhost:44366/Users/GetAllUsers')
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            props.userListCallBack(data)
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        return null;
}

export default GetAllUsersFromApi;