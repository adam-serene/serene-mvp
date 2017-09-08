import React from 'react';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/SubmitPlace.css'

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
      category: 'GO BIG',
      lat: 0,
      lng: 0
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchCategories(){
    const response = await fetch('https://serene-green.herokuapp.com/categories');
    // const response = await fetch('http://localhost:5000/categories');
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

  notify=(message)=>toast(message);

  async handleSubmit(event){
    event.preventDefault();
    this.notify(`Noice! Let's add ${this.state.title} to the map.`);
    const response = await fetch('https://serene-green.herokuapp.com/places',
    // const response = await fetch('http://localhost:5000/places',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: qs.stringify(this.state)
      })
    if (response.status !== 200) return this.notify(`Could not add: ${this.state.title} to the map...`);
    const data = await response.json()
    this.notify(`Thanks! Others are really gonna enjoy ${data.description}!`);
    let pathEnd = data.url;
    setTimeout(()=>{
      this._reactInternalInstance._context.router.history.push(pathEnd, null);}
      , 1500);
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
  }

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <form onSubmit={this.handleSubmit}>
          <label>What should we call this New Place?</label>
          <p><input name="title" type="text" value={this.state.title} onChange={this.handleChange} /></p>
          <label>Categorize your New Place:</label>
          <p><select name="category" onChange={this.handleChange}>
            {this.state.categories.map(e =>
              <option
                key={e.id}
                value={e.category}>
              {e.category}
              </option>
            )}
          </select></p>
          <p><input type="submit" value="Submit" /></p>
        </form>
      </div>
    );
  }
}
