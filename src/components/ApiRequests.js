getFunc(){
    fetch('https://localhost:44366/ToDo')
      .then(response => console.log(response.json()))
  }
  componentDidMount() {
    // Simple DELETE request with fetch
    fetch('https://localhost:44366/ToDo/', { 
      
    method: 'DELETE' })
        .then(this.getFunc.bind(this));
}