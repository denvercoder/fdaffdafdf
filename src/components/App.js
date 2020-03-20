import React from 'react'
import useAuth from './Auth/useAuth'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import SearchLinks from './Link/SearchLinks'
import ForgotPassword from './Auth/ForgotPassword'
import Login from './Auth/Login'
import CreateLink from './Link/CreateLink'
import LinkList from './Link/LinkList'
import LinkDetail from './Link/LinkDetail'
import firebase, { FirebaseContext } from '../firebase'

import Header from './Header'

function App() {
  const user = useAuth()
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div className='app-container'>
          <Header />
          <div className='route-container'>
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/new/1' />} />
              <Route path='/create' component={CreateLink} />
              <Route path='/login' component={Login} />
              <Route path='/forgot' component={ForgotPassword} />
              <Route path='/search' component={SearchLinks} />
              <Route path='/new/:page' component={LinkList} />
              <Route path='/link/:linkId' component={LinkDetail} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  )
}

export default App
