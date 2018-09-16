import * as React from 'react';
import './App.css';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface IState{
  cryptoSearch: any,
  interResult: any,
  results: any,
  searching: boolean,
  error: boolean
}

export default class App extends React.Component<{},IState> {
  
  constructor(props: any){
    super(props);
    
    this.state = {
      cryptoSearch: '', 
      interResult: '',
      results: [],
      searching: false,
      error: false
    }
    
    this.handleInput = this.handleInput.bind(this);
    this.handleUserSearch = this.handleUserSearch.bind(this);
  }
  
  
  public handleInput(event: React.ChangeEvent<HTMLInputElement>) : void {
    this.setState({ cryptoSearch: event.target.value });
  }
  
  public handleUserSearch() {
    this.setState({ 
      searching: true,
      interResult: this.state.cryptoSearch
    });
    
    Axios.get("https://min-api.cryptocompare.com/data/price?fsym="+this.state.cryptoSearch+"&tsyms=NZD")
    .then((res:any) => {
      if(res.data.Response === "Error") {
        this.setState({
          error: true
        });
      }
      else {
        this.setState({
          results: res.data,
          error: false
        });
      }
      this.setState({searching: false});  // Disable searching field after async operation is complete
    }).catch((err:any) => {
      this.setState({results: ""});
      this.setState({searching: false});
    });
  }
  
  
  public render() {
    if(this.state.searching) {
      return (
        <div className="container-fluid">
        <div className="centreText">
        <h1 className = "title">Cryptocurrency Price Tracker</h1>
        <CircularProgress style = {{transform: "scale(1,3)",top:"250px"}} id = "progressBar"thickness = {8} />
        </div>
        </div>
      )
    }
    else if(this.state.error) {
      return (
        <div className="container-fluid">
        <div className="centreText">
        
        <h1 className = "title" >Cryptocurrency Price Tracker</h1>
        
        <fieldset>
        <legend>Enter the Cryptocurrency symbol you wish to find the price of:</legend>
        <TextField
        id="Cryptocurrency Symbol"
        label="E.g. BTC"
        onChange={this.handleInput}
        margin="normal"
        style = {{transform: "scale(1.3)"}}
        />
        <br/> 
        </fieldset>
        
        <Button style = {{transform: "scale(1.3)",top:"20px"}} variant="outlined" color="primary" size = "small" onClick = {this.handleUserSearch}> Search </Button>
        <p id = "errorMessage" style= {{paddingTop: "50px",fontSize: "medium"}}> <b> No Cryptocurrency with that symbol, please visit the Cryptocurrency List </b> </p>
        <br/> 
        </div>
        </div>
      );
    }
    else {
      return (
        <div className="container-fluid">
        <div className="centreText">
        
        <div> 
        <h1 className = "title" >Cryptocurrency Price Tracker</h1>
      
        <fieldset>
        <legend>Enter the Cryptocurrency symbol you wish to find the price of:</legend>
        <TextField
        id="Cryptocurrency Symbol"
        label="E.g. BTC"
        onChange={this.handleInput}
        margin="normal"
        style = {{transform: "scale(1.3)"}}
        />
        <br/> 
        </fieldset>
        <Button style = {{transform: "scale(1.3)",top:"20px"}} variant="outlined" color="primary" size = "small" onClick = {this.handleUserSearch}> Search </Button>
        </div>
        <br/> 
        <div id="cryptoInfo" style = {{fontSize: "medium",paddingTop:"30px"}}>
        {Object.keys(this.state.results).map((key) => (
          <p>
          <b>The price of {this.state.interResult} is {key} </b>: $<i>{this.state.results[key]} </i>
          </p>
        ))}
        </div>
        </div>
        </div>
      );
    }
  }
}