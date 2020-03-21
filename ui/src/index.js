import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './containers/app/private_route';

import store from './services/store';
import ConnectedIntlProvider from './containers/connected_intl_provider';

import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';

import registerServiceWorker from './services/registerServiceWorker';
import App from './App';

// todo: move to router component
import Register from './containers/auth/register';
import Login from './containers/auth/login';
import ArticleDetail from './containers/article/article_detail';
import ArticleTop from './containers/article/article_top';
import ArticleEditor from './containers/article/article_editor';
import EventEditor from './containers/event/event_editor';
import EventTop from './containers/event/event_top';
import TagTop from './containers/eventTag/tag_top';
import EventManageTop from './containers/event/event_manage_top';
import EventDetail from './containers/event/event_detail';
import UserTop from './containers/user/user_top';
import PlacesTop from './containers/place/place_top';
import PlaceDetail from './containers/place/place_detail';
import PlaceEditor from './containers/place/place_editor';
import UserDetail from './containers/user/user_detail';
import UserEditor from './containers/user/user_editor';
import TagEditor from './containers/eventTag/tag_editor';
import TagDetail from './containers/eventTag/tag_detail';
import PhotoManage from './containers/photo/photo_manage';

import moment from 'moment';
import 'moment/locale/sk';
import 'moment/locale/pl';
import 'moment/locale/en-gb';
moment.locale('sk');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <BrowserRouter>
                <div>
                    <App>
                        <Switch>
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route exact path="/potw" component={PhotoManage} />
                            <Route exact path="/users" component={UserTop} />
                            <Route exact path="/places" component={PlacesTop} />
                            <Route exact path="/events" component={EventTop} />
                            <PrivateRoute exact path="/tags" component={TagTop} />
                            <Route exact path="/articles" component={ArticleTop} />
                            <Route exact path="/events/manage" component={EventManageTop} />
                            <Route path="/events/edit/:eventId?/:placeId?" component={EventEditor} />
                            <Route path="/events/:eventId/:placeId" component={EventDetail} />
                            <Route path="/articles/edit/:articleId?" component={ArticleEditor} />
                            <Route path="/articles/:articleId" component={ArticleDetail} />
                            <Route path="/places/edit/:placeId?" component={PlaceEditor} />
                            <Route path="/places/:placeId" component={PlaceDetail} />
                            <Route path="/users/edit/:userId?" component={UserEditor} />
                            <Route path="/users/:userId" component={UserDetail} />
                            <Route path="/tags/edit/:tagId?" component={TagEditor} />
                            <Route path="/tags/:tagId" component={TagDetail} />
                            <Route path="/" component={EventTop} />
                        </Switch>
                    </App>
                </div>
            </BrowserRouter>
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
