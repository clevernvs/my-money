import '../common/template/dependencies';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import Header from '../commmon/template/header';
import Sidebar from '../commmon/template/sideBar';
import Footer from '../commmon/template/footer';
import Messages from '../common/msg/messages';

import Routes from './routes';

export default (props) => {

    <HashRouter>
        <div className='wrapper'>
            <Header />
            <Sidebar />
            <Routes />
            <Footer />
            <Messages />
        </div>
    </HashRouter>

}