import React from 'react';
import qs from 'qs';

export default class NewPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      droppedPin: this.props.droppedPin,
      droppedPlace: this.props.droppedPlace,
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitPin}>
          <label>Title/Description:
            <input type="text" placeholder="go ahead, name this spot" value={this.state.droppedPlace.title}></input>
          </label>
          <input type="hidden" value={this.state.droppedPin.position}/>
        </form>
      </div>
    );
  }
}
