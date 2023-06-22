import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from "./history";
import Home from "./views/Home"
import Customers from "./views/Customers"
import Customer from "./views/Customer"
import AddCustomer from "./views/AddCustomer"
import Footer from './components/Footer'
import Navbar from "./components/Navbar"
import StepContext from './Context/StepContext'
import AddtionalInfo from './views/AddtionalInfo'
import Login from './views/Login'
import AboutUs from './views/AboutUs'
import ApiPage from './views/ApiPage'
import ContactUsPage from './views/ContactUsPage'
import ProfilePage from './views/ProfilePage'
import TransTable from './views/TransTable'
import NotFound from './views/NotFound';
import AdminPage from './views/AdminPage';

export default function Main() {
    return (
        <div>
            <StepContext>
                <Router history={history}>
                    <Navbar transparent />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/customers" component={Customers} />
                        <Route exact path="/customers/:id" component={Customer} />
                        <Route exact path="/add" component={AddCustomer} />
                        <Route exact path="/signup" component={AddCustomer} />
                        <Route exact path="/addtional" component={AddtionalInfo} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/about" component={AboutUs} />
                        <Route exact path="/api" component={ApiPage} />
                        <Route exact path="/customer-service" component={ContactUsPage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/transactions/" component={TransTable} />
                        <Route exact path="/admin" component={AdminPage} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </Router>
            </StepContext>
        </div>
    )
}
