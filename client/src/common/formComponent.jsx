import React, { Component } from "react";
import Joi from "joi-browser";
import { Form, Button } from "semantic-ui-react";

class FormComponent extends Component {
  state = {
    data: {},
    error: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return false;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return true;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage.replace(/"/g, "");
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <Form.Input
          fluid
          onChange={this.handleChange}
          placeholder={label}
          type={type}
          name={name}
          helpertext={errors[name]}
          value={data[name]}
          error={errors[name] ? true : false}
        />
        <span className="text-danger">{errors[name]}</span>
      </React.Fragment>
    );
  }

  renderButton(label) {
    return (
      <Button type="submit" color="teal" disabled={this.validate()}>
        {label}
      </Button>
    );
  }
}

export default FormComponent;
