import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import Loader from '../components/Loader'

const Home = lazy(() => import('../pages/Home'))
const Contact = lazy(() => import('../pages/ContactUs'))
const Host = lazy(() => import('../pages/HostAHome'))
const Rent = lazy(() => import('../pages/RentAHome'))

const Routes = () => (
  <Suspense fallback={<Loader/>}>
    <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={Host} path="/host"/>
      <Route exact component={Rent} path="/homes"/>
      <Route exact component={Contact} path="/contact" />
    </Switch>
  </Suspense>
)

export default Routes
