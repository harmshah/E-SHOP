import { Switch, Route } from 'react-router-dom';

// Import your page components
import Home from '../pages/Home'
import Products from '../pages/Products'
import Women from '../pages/Women'
import Men from '../pages/Men'
import Jewelery from '../pages/Jewelery'
import Eletronics from '../pages/Eletronics'
import Inspect from '../pages/Inspect'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Forgot from '../pages/Forgot'
import Delivery from '../pages/Delivery'
import Payment from '../pages/Payment'
import NotFound from '../pages/NotFound'
import AboutUs from '../pages/AboutUs'
import UserList from '../pages/UserList'
import UserProfile from '../pages/UserProfile'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainRoutes() {
    return (
        <>
            {/* Include the Header component */}
            <Header />
            <div className="container">
                <Switch>
                    {/* Define your routes using Route components */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/women" component={Women} />
                    <Route exact path="/men" component={Men} />
                    <Route exact path="/jewelery" component={Jewelery} />
                    <Route exact path="/electronics" component={Eletronics} />
                    <Route exact path="/products/:id" component={Inspect} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/profile" component={UserProfile} />
                    <Route exact path="/userlist" component={UserList} /> 
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/reset" component={Forgot} />
                    <Route exact path="/delivery" component={Delivery} />
                    <Route exact path="/payment" component={Payment} />
                    <Route path="*" component={NotFound} /> {/* Catch-all route for 404 */}
                </Switch>
            </div>
            {/* Include the Footer component */}
            <Footer />
        </>
    )
}
