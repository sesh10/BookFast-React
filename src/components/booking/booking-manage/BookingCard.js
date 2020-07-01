import React from 'react';
import { Link } from 'react-router-dom';
import { modifyDate, toUpperCase } from 'helpers';


export function BookingCard(props) {
    const {booking} = props;

    return (
        <div className='col-md-4'>
            <div className='card text-center'>
                <div className='card-header'>
                    {booking.rental ? booking.rental.category : 'Deleted Rental'}
                </div>
                <div className='card-block'>
                    {booking.rental &&
                    <div>
                    <h4 className='card-title'> {booking.rental.title} - {toUpperCase(booking.rental.city)}</h4>
                    <p className='card-text booking-desc'>{booking.rental.description}</p>
                    </div>
                    }
                    <p className='card-text booking-days'>{modifyDate(booking.startAt)} - {modifyDate(booking.endAt)} | {booking.days} nights</p>
                    <p className='card-text booking-price'><span>Price: </span> <span className='booking-price-value'>{booking.totalPrice} $</span></p>
                    { booking &&
                    <Link className='btn btn-bwm' to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
                    }                                
                </div>
                <div className='card-footer text-muted'>
                    Created {modifyDate(booking.createdAt)}
                </div>
            </div>
        </div>
    )
}
