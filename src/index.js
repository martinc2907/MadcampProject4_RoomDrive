import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Login, Register, Mypage, Roomimage, MyRoom } from 'containers';

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
// thunk 는 특정 작업의 처리를 미루기위해서 함수로 wrapping 하는것을 의미
///:id/roomimage 하는방법???
const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router history = {browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="roomimage" component={Roomimage}/>
            <Route path="/:i" component={MyRoom} />
            <Route path="/:id" component={Mypage}/>
        </Route>
    </Router>
  </Provider>, rootElement
);
