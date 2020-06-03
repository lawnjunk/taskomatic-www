import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Switch,  Route} from 'react-router-dom'


// internal modules
import Landing from './component/landing'
import Dashboard from './component/dashboard'
import Settings from './component/settings'
import Header from './component/header'
import Footer from './component/footer'
import createStore from './store'

const store = createStore()

let App = ()  => {
  return (
    <div className='app'>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/settings' component={Settings} />
          </ Switch>
          <Footer />
       </ BrowserRouter>
    </Provider>
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('app-container'))
