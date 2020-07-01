import React from 'react';
import { Link } from 'react-router-dom';
import { modifyDate, toUpperCase } from 'helpers';
import { RentalManageModal } from './RentalManageModal';

export class RentalManageCard extends React.Component {
    constructor() {
        super();
        this.state = {
            wantDelete: false
        }
    }

    showDeleteMenu() {
        this.setState({wantDelete: true});
    }

    closeDeleteMenu() {
        this.setState({wantDelete: false});
    }

    deleteRental(rentalId, rentalIndex) {
        this.setState({wantDelete: false});
        this.props.deleteRentalCb(rentalId, rentalIndex);
    }

    render() {
        const { rental, rentalIndex } = this.props;
        const { wantDelete } = this.state;
        const deleteClass = wantDelete ? 'toBeDeleted' : '';

        return (
            <div className='col-md-4'>
                <div className={`card text-center ${deleteClass}`}>
                    <div className='card-block'>
                    <h4 className='card-title'>{rental.title} - {toUpperCase(rental.city)}</h4>
                    <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
                    {rental.bookings && rental.bookings.length > 0 && <RentalManageModal bookings={rental.bookings}></RentalManageModal>}
                    </div>
                    <div className='card-footer text-muted'>
                        Created on {modifyDate(rental.createdAt)}
                        {!wantDelete &&
                        <button onClick={() => {this.showDeleteMenu()}} className='btn btn-danger'>Delete</button>
                        }
                        { wantDelete &&
                            <div className='delete-menu'>
                            Do you confirm ?
                            <button onClick={() => {this.deleteRental(rental._id, rentalIndex)}} className='btn btn-success'>Yes</button>
                            <button onClick={() => {this.closeDeleteMenu()}} className='btn btn-danger'>No</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}