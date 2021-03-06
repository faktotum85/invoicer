import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/persons/actions';

import DataTable from '../../../components/DataTable/DataTable';
import Spinner from '../../../components/UI/Spinner/Spinner';

export class PersonsList extends Component {
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        this.props.fetchPersons(query.get('limit'), query.get('offset'), this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.search !== nextProps.location.search) {
            const query = new URLSearchParams(nextProps.location.search);
            nextProps.fetchPersons(query.get('limit'), query.get('offset'), this.props.token);
        }
    }

    render () {
        return (
            this.props.loading 
                ? <Spinner />
                : <DataTable 
                    labels={this.props.config} 
                    data={this.props.persons}
                    deleteHandler={this.props.deletePerson}
                    token={this.props.token}
                    pagination={{
                        first: this.props.first, 
                        prev: this.props.prev, 
                        next: this.props.next, 
                        last: this.props.last,
                        count: this.props.count,
                        start: this.props.start
                    }}
                />
        );
    }
}

const mapStateToProps = state => {
    return {
        config: state.persons.config,
        persons: state.persons.persons,
        loading: state.persons.loading,
        first: state.persons.pagination_first,
        prev: state.persons.pagination_prev,
        next: state.persons.pagination_next,
        last: state.persons.pagination_last,
        count: state.persons.pagination_count,
        start: state.persons.pagination_start,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPersons: (limit, offset, token) => dispatch(actions.fetchPersons(limit, offset, token)),
        deletePerson: (id, token) => dispatch(actions.deletePerson(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsList);