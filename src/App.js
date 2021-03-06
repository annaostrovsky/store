import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar.js';
import MainContent from './components/main-content/main-content.js';
import data from './data.json';
import AboutPage from './components/about';
import Form from './components/form';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types'; 
import ProtfolioDetails from './components/portfolio-details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedData: data,
      obj: null,
    }
  }

  deletePortfolioItem = (index) => {
    this.setState({
      generatedData: [...this.state.generatedData.filter(item => item.key !== index)]
    });
  }

  addNewPortfolioItem = (id, title, description, imageUrl) => {
    this.setState(prevState => {
      const newId = (+_.maxBy(prevState.generatedData, item => +item.key).key + 1).toString();
      return ({
        generatedData: [...prevState.generatedData, { key: newId, title, description, imageUrl }]
      })
    }
    )
  }
  updatePortfolioItem = (id, title, description, imageUrl) => {
    this.setState(prevState => {
      let newItems = prevState.generatedData.filter(item => item.key.toString() !== id.toString())
      newItems= [...newItems,{key:id, title, description, imageUrl}];     
      return { generatedData: newItems};
    })
  }

  showEditedContent = (elementKey) => {    
    return this.state.generatedData.filter(item => item.key.toString() === elementKey.toString())[0];   
  }

  changeToFullScreen =(elementKey)=>{
    console.log(elementKey)
    this.setState({
      obj: this.state.generatedData.filter(item => item.key.toString() === elementKey.toString())[0]      

    })
  }

  render() {
    return (
      <Router>
        <div className="flex">
          <Route path="/" component={Sidebar} />
          <Route exact path="/" render={() => (
            <MainContent onFullScreen={this.changeToFullScreen} generatedData={this.state.generatedData} delete={this.deletePortfolioItem} edit={this.editHandleClick} />
          )} />
          <Route path="/about" component={AboutPage} />
          <Route path="/edit/:id" render={(props) => (
            <Form {...props} onSubmit={this.updatePortfolioItem} showEditedContent={this.showEditedContent} />
          )} />
          <Route exact path="/edit" render={(props) => (
            <Form {...props} onSubmit={this.addNewPortfolioItem} showEditedContent={this.showEditedContent} />
          )} />
          <Route path="/portfolio-details/:id" render={(props) => (
            <ProtfolioDetails {...props} {...this.state.obj} />
          )} />         

        </div>
      </Router>
    );
  }
}
App.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,  
}

export default App;
