import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookingCard } from './BookingCard';
import * as actions from 'actions';

class BookingManage extends React.Component {
    componentWillMount() {
        this.props.dispatch(actions.fetchUserBookings());
    }

    renderBookings(bookings) {
        return bookings.map((booking, index) => <BookingCard booking={booking} key={index}></BookingCard>);
    }

    render() {
        const { data: bookings, isFetching } = this.props.userBookings;
        return (                
            <section id='userBookings'>
                <h1 className='page-title'>My Bookings</h1>
                <div className='row'>
                { this.renderBookings(bookings) }
                </div>
                { !isFetching && bookings.length === 0 &&
                <div class='alert alert-warning'>
                    You have no bookings created go to rentals section and book your place today.
                    <Link style={{'margin-left': '10px'}} class='btn btn-bwm' to='/rentals'>Available Rental</Link>
                </div>
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        userBookings: state.userBookings
    }
}


export default connect(mapStateToProps)(BookingManage)