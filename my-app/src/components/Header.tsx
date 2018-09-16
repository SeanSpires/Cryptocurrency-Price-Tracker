import * as React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <AppBar position="static">
        <Toolbar>
        <Typography variant="display2" color="inherit">
        <Link style={{color: "white", float: "left"}} to="/">Cryptocurrency Price Search</Link>
        <Link style={{color: "white", paddingLeft: "1250px"}} to="/CryptoList"> Cryptocurrency List </Link>
        </Typography>
        </Toolbar>
        </AppBar>
    );
}