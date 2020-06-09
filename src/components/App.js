import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import MaltsPage from './malt/MaltsPage';
import MaltManagerPage from './malt/MaltManagerPage';
import HopsPage from './hops/HopsPage';
import HopManagerPage from './hops/HopManagerPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YeastTypesPage from './yeast/YeastTypesPage';
import Error from './Error';
import HopTypesPage from './hoptype/HopTypesPage';
import ErrorBoundary from './common/ErrorBoundary';
import HopTypeManagerPage from './hoptype/HopTypeManagerPage';
import YeastsPage from './yeast/YeastsPage';
import EquipmentsPage from './equipment/EquipmentsPage';
import YeastManagerPage from './yeast/YeastManagerPage';
import EquipmentManagerPage from './equipment/EquipmentManagerPage';
import EquipmentTypesPage from './equipment/EquipmentTypesPage';
import MaltTypesPage from './malttype/MaltTypesPage';
import MaltTypeManagerPage from './malttype/MaltTypeManagerPage';

const App = () => (
  <ErrorBoundary>
    <div className="container-fluid">
      <Header />
      <Error />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/malttypes" component={MaltTypesPage} />
        <Route exact path="/malttype" component={MaltTypeManagerPage} />
        <Route path="/malttype/:index" component={MaltTypeManagerPage} />
        <Route path="/malts" component={MaltsPage} />
        <Route exact path="/malt" component={MaltManagerPage} />
        <Route path="/malt/:index" component={MaltManagerPage} />
        <Route path="/hops" component={HopsPage} />
        <Route exact path="/hop" component={HopManagerPage} />
        <Route path="/hop/:index" component={HopManagerPage} />
        <Route path="/hoptypes" component={HopTypesPage} />
        <Route exact path="/hoptype" component={HopTypeManagerPage} />
        <Route path="/hoptype/:index" component={HopTypeManagerPage} />
        <Route path="/yeasttypes" component={YeastTypesPage} />
        <Route path="/yeasts" component={YeastsPage} />
        <Route exact path="/yeast" component={YeastManagerPage} />
        <Route path="/yeast/:index" component={YeastManagerPage} />
        <Route path="/equipments" component={EquipmentsPage} />
        <Route exact path="/equipment" component={EquipmentManagerPage} />
        <Route path="/equipment/:index" component={EquipmentManagerPage} />
        <Route path="/equipmenttypes" component={EquipmentTypesPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>

      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  </ErrorBoundary>
);

export default App;
