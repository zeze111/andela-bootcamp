import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import PropTypes from 'prop-types';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      surname: '',
      email: '',
      bio: '',
    }

    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { firstName, surname, email } = this.props
    return (
      <div id="detail" className="col s10 offest-s2" style={{ marginTop: '3em', marginBottom: '3em' }}>
        <form className="col s6 offset-s2">
          <TextFieldGroup3
            label="First Name"
            value="{firstName}"
            onChange={this.onChange}
            id="fname"
            type="text"
            name="firstName"
            icon="account_circle"
          />
          <TextFieldGroup3
            label="Surname:"
            value="{surname}"
            onChange={this.onChange}
            id="sname"
            type="text"
            name="surname"
            icon="account_circle"
          />
          <TextFieldGroup3
            label="Email:"
            value="{email}"
            onChange={this.onChange}
            id="email"
            type="email"
            name="email"
            icon="email"
          />
          <TextFieldGroup3
            label="Bio:"
            value={this.state.bio}
            onChange={this.onChange}
            id="bio"
            type="text"
            name="bio"
            icon="mode_edit"
          />
          <div className="right-align">
            <button className="btn grey" type="button"> Update </button>
          </div >
        </form>
      </div>
    )
  };
}

// Details.propTypes = {
//   firstName: PropTypes.string.isRequired,
//   surname: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
// }

export default Details;
