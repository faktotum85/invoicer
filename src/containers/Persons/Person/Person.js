import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/persons/actions';

import DataForm from '../../../components/DataForm/DataForm';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Person extends Component {
    componentWillMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchPerson(id, this.props.token);
        } else {
            this.props.clearPerson();
        }
    }

    componentWillReceiveProps(nextProps) {
        const currentId = this.props.match.params.id;
        const nextId = nextProps.match.params.id;
        if (currentId !== nextId) {
            nextId ? nextProps.fetchPerson(nextId, nextProps.token) : nextProps.clearPerson();
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.savePerson(this.props.person._id, this.props.person, this.props.token)
    }

    onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.changePersonProperty(name, value);
    }

    render() {
        const buttonText = this.props.person._id ? 'Save' : 'Add';

        return (
            this.props.loading
                ? <Spinner />
                : <DataForm config={this.props.config} data={this.props.person} buttonText={buttonText} handleSubmit={this.onFormSubmit} handleInputChange={this.onInputChange} />
        );
    }
}

const mapStateToProps = state => {
    return {
        config: state.persons.config,
        person: state.persons.person,
        loading: state.persons.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPerson: (id, token) => dispatch(actions.fetchPerson(id, token)),
        changePersonProperty: (name, value) => dispatch(actions.changePersonProperty(name, value)),
        savePerson: (id, person, token) => dispatch(actions.savePerson(id, person, token)),
        clearPerson: () => dispatch(actions.clearPerson())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);