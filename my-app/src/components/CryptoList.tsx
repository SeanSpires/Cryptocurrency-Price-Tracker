import * as React from "react";
import Cryptocurrencies from 'cryptocurrencies';
import '../App.css';


interface IState {
        list:any
}

export default class CryptoList extends React.Component<{},IState> {
        
        constructor(props: any){
                super(props);
                
                this.state = {
                        list: []
                }       
        }
        
        
        public componentDidMount() {
                this.setState({list: Cryptocurrencies});
        }
        
        
        public render() {  
                return (
                        <div className="container-fluid">
                        <div className = "center-text">
                        <h1 className = "title" style = {{textAlign:"center" ,paddingBottom:"50px"}}> List of Cryptocurrencies</h1>                             
                        <table>
                        <tr>
                        <th> Name </th>
                        <th> Symbol </th>
                        </tr>
                        {Object.keys(this.state.list).map((key) => (                       
                                <tr>
                                <td> <span>{this.state.list[key]}</span> </td>
                                <td> <span> {key} </span> </td>
                                </tr>                     
                        ))}
                        </table>
                        </div>
                        </div>);
                }
        }