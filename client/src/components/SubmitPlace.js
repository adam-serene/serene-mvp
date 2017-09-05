import React from 'react';
import qs from 'qs';

export default class NewPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      droppedPin: this.props.droppedPin,
      droppedPlace: this.props.droppedPlace,
      handleSubmitPin: this.props.handleSubmitPin
    };
    this.handleSubmitPin = this.handleSubmitPin.bind(this);
  }

  handleSubmitPin(event){
    console.log(event);
    event.preventDefault();
    alert('Adding: ' + this.state.droppedPin.title);
    console.log(this.state.droppedPin);

    // const response = await fetch('https://serene-green.herokuapp.com/places',
    const response = fetch('http://localhost:5000/places',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs.stringify(this.state.droppedPin)
    })
    alert(response);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitPin}>
          <label>Title/Description:
            <input type="text" value={this.state.droppedPlace.title}></input>
          </label>
          <input type="hidden" value={this.state.droppedPin.position}/>
        </form>
        <button onClick={this.state.handleSubmitPin}>Add This</button>
      </div>
    );
  }
}
