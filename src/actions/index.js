import { FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTALS_SUCCESS, 
          LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_RENTALS_INIT, FETCH_RENTALS_FAIL,
          FETCH_USER_BOOKINGS_SUCCESS, FETCH_USER_BOOKINGS_INIT, FETCH_USER_BOOKINGS_FAIL } from './types';

import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental: rental
  }
}

const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals: rentals
  }
}

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}

const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  }
}

export const fetchRentals = (city) => {
  const url = city ? `/rentals/?city=${city}` : '/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());
    axiosInstance.get(url).then((res) => {
      return res.data;
    }).then(rentals => {
      dispatch(fetchRentalsSuccess(rentals));
    }).catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)));
  }
}

export const fetchRentalById = (rentalId) => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit())

    axios.get(`/api/v1/rentals/${rentalId}`).then((res) => {
      return res.data;
    }).then(rental => {
      dispatch(fetchRentalByIdSuccess(rental));
    });
  }
}

export const createRental = (rentalData) => {
  return axiosInstance.post('/rentals', rentalData).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  )
}


// User booking Actions ----------------------------------------------------------------

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsSuccess = (userBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance.get('/bookings/manage').then((res) => {return res.data;}).then(userBookings => {
      dispatch(fetchUserBookingsSuccess(userBookings));
    })
    .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)));
  }
}

// User rental Actions ----------------------------------------------------------------

export const getUserRentals = () => {
  return axiosInstance.get('/rentals/manage').then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  )
}

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    (res) => res.data,
    (err) => Promise.reject(err.response.data.errors)
  )
}

// Auth Actions ------------------------------------------------------------------------

const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors: errors
  }
}

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess())
    }
  }
}

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  )
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', userData).then(res => res.data).then(token => {
      authService.saveToken(token);
      dispatch(loginSuccess());
    }).catch(({response}) => {
      dispatch(loginFailure(response.data.errors));
    });
  }
}

export const logout = () => {
  authService.logoutUser()
  return {
    type: LOGOUT
  }
}

export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking).then(res => res.data).catch(({response}) => Promise.reject(response.data.errors));
}