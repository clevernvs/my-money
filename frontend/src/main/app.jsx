import React from 'react';
import Routes from './routes';

import Header from '../commmon/template/header';
import Sidebar from '../commmon/template/sideBar';
import Footer from '../commmon/template/footer';
import Messages from '../common/msg/messages';

import '../common/template/dependencies';

export default (props) => {

    <div className='wrapper'>
        <Header/>
        <Sidebar/>
        <div className='content-wrapper'>
            <Routes/>
        </div>
        <Footer/>
        <Messages/>
    </div>

}