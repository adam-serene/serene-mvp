import React from 'react';
import qs from 'qs';

const navGCPOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export default class NewPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      title: '',
      category: '',
      lat: 0,
      lng: 0
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchCategories(){
    const response = await fetch('https://serene-green.herokuapp.com/categories');
    // const response = await fetch('http://localhost:5000/places');
    const categories = await response.json()
    this.setState({
      categories: categories
    });
  }

  handleChange=(event)=>{
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
     });
   }

  async handleSubmit(event){
    alert('Attempting to create: ' + this.state.title);
    console.log(this.state);
    event.preventDefault();
    const response = await fetch('https://serene-green.herokuapp.com/places',
    // const response = await fetch('https://localhost:3443/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: qs.stringify(this.state)
      })
    const data = await response.json()
    console.log(data);
    // let pathEnd = response.url.slice(34);
    // this._reactInternalInstance._context.router.history.push(pathEnd, null);
  }

  navGCPSuccess=(pos)=>{
    let crd = pos.coords;
    this.setState({
      lat: crd.latitude,
      lng: crd.longitude
    });
  }

  navGCPError=(err)=>{
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  componentWillMount(){
    this.fetchCategories();
    navigator.geolocation.getCurrentPosition(this.navGCPSuccess, this.navGCPError, navGCPOptions);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p><label>
            What should we call this New Place?
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </label></p>
          <p><label>
            Categorize your New Place:
            <select name="category" onChange={this.handleChange}>
            {this.state.categories.map(e=>
              <option
                key={e.id}
                value={e.category}>
              {e.category}
              </option>
            )}
            </select>
          </label></p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
