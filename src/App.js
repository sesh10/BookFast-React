import React, { Component } from 'react';
import { Header } from 'shared/Header';
import RentalListing from 'components/rental/rental-listing/RentalListing';
import RentalDetail from 'components/rental/rental-detail/RentalDetail';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'App.css';

const store = require('./reducers').init();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header></Header>
            <div className='container'>
              <Route exact path="/" render={() => <Redirect to='/rentals'></Redirect>}></Route>
              <Route exact path="/rentals" component={RentalListing}></Route>
              <Route exact path="/rentals/:id" component={RentalDetail}></Route>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
