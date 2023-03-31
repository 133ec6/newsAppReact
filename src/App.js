

import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default function App() {
  let pageSize=6;
  let apikey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(10);
  let setProgressfxn = (progress)=>{
    setProgress(progress)
  }
  return (
    <Router>
        <div>
        <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
          <Navbar/>
          <Routes>
              <Route exact path="/" element={<News setProgress={setProgressfxn}  pageSize={pageSize} apikey = {apikey} country="in" category="science"/>}/>
              <Route exact path='/business' element={<News setProgress={setProgressfxn}  key='business' pageSize={pageSize} apikey = {apikey} country='in' category='business' />}></Route>
              <Route exact path='/entertainment' element={<News setProgress={setProgressfxn}  key='entertainment' pageSize={pageSize} apikey = {apikey} country='in' category='entertainment' />}></Route>
              <Route exact path='/general' element={<News setProgress={setProgressfxn}  key='general' pageSize={pageSize} apikey = {apikey} country='in' category='general' />}></Route>
              <Route exact path='/health' element={<News setProgress={setProgressfxn}  key='health' pageSize={pageSize} apikey = {apikey} country='in' category='health' />}></Route>
              <Route exact path='/science' element={<News setProgress={setProgressfxn}  key='science' pageSize={pageSize} apikey = {apikey} country='in' category='science' />}></Route>
              <Route exact path='/sports' element={<News setProgress={setProgressfxn}  key='sports' pageSize={pageSize} apikey = {apikey} country='in' category='sports' />}></Route>
              <Route exact path='/technology' element={<News setProgress={setProgressfxn}  key='technology' pageSize={pageSize} apikey = {apikey} country='in' category='technology' />}></Route>
          </Routes>
          
        </div>
      </Router>
  )
}



