import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    data.append('file', this.state.file);
    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: data
    }).then(function(response){
      console.log('responseeee ', response);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form action="http://localhost:8000/upload" method="post" encType="multipart/form-data">
            <input type="file" name="myFile" onChange={(e) => this.setState({file: e.target.files[0]})}/>
            <input type="submit" value="upload"/>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
