import React, { Component } from 'react';
import { TextFieldGroup3 } from '../common/TextFieldGroup';
import { pick } from 'lodash';

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
    this.onSubmit = this.onSubmit.bind(this);

  }

  render() {
    const recipe = pick(this.props, ["name", "prepTime", "description", "type", "ingredients", "instructions"]);
    return (
      <div className="row ">
        <div className="col s12">
          <br /> <br />
          <div id="detail" className="col s10 offest-s2">
            <form className="col s6 offset-s2">
              <TextFieldGroup3
                label="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
                id="fname"
                type="text"
                name="firstName"
                icon="account_circle"
              />
              <TextFieldGroup3
                label="Surname:"
                value={this.state.surname}
                onChange={this.onChange}
                id="sname"
                type="text"
                name="surname"
                icon="account_circle"
              />
              <TextFieldGroup3
                label="Email:"
                value={this.state.email}
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
                type="bio"
                name="bio"
                icon="mode_edit"
              />
              <div className="right-align">
                <button className="btn grey" type="button"> Update </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  };
}

export default Details;
