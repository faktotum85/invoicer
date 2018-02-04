import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import DataTable from '../../../components/DataTable/DataTable';
import Spinner from '../../../components/UI/Spinner/Spinner';

class PersonsList extends Component {
    componentWillMount() {
        this.props.fetchPersons();
    }

    render () {
        return (
            this.props.loading 
                ? <Spinner />
                : <DataTable labels={this.props.personLabels} data={this.props.persons} deleteHandler={this.props.deletePerson}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        personLabels: state.persons.personLabels,
        persons: state.persons.persons,
        loading: state.persons.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPersons: () => dispatch(actions.fetchPersons()),
        deletePerson: (id) => dispatch(actions.deletePerson(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsList);