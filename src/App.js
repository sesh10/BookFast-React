import React, { Component } from 'react';
import Header from 'components/shared/Header';
import RentalListing from 'components/rental/rental-listing/RentalListing';
import RentalDetail from 'components/rental/rental-detail/RentalDetail';
import RentalSearchListing from 'components/rental/rental-listing/RentalSearchListing';
import { RentalCreate } from 'components/rental/rental-create/RentalCreate';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'App.css';
import Login from './components/login/Login';
import { Register } from './components/register/Register';
import { RentalManage } from './components/rental/rental-manage/RentalManage';
import BookingManage from './components/booking/booking-manage/BookingManage';
import * as actions from 'actions';
import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout}></Header>
            <div className='container'>
              <Switch>
              <Route exact path="/" render={() => <Redirect to='/rentals'></Redirect>}></Route>
              <Route exact path="/rentals" component={RentalListing}></Route>
              <ProtectedRoute exact path="/rentals/manage" component={RentalManage}></ProtectedRoute>
              <ProtectedRoute exact path="/bookings/manage" component={BookingManage}></ProtectedRoute>
              <ProtectedRoute exact path="/rentals/new" component={RentalCreate}></ProtectedRoute>
              <Route exact path="/rentals/:id" component={RentalDetail}></Route>
              <Route exact path="/login" component={Login}></Route>
              <LoggedInRoute exact path="/register" component={Register}></LoggedInRoute>
              <Route exact path="/rentals/:city/homes" component={RentalSearchListing}></Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
