import React, { Fragment, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DeviceHub from '@material-ui/icons/DeviceHub';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';


import NextLink from '../src/Link'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


import { createWorker } from 'tesseract.js';


/// essentials-----------------
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {' © '}
          SunPower Fab4 {' '}
        {new Date().getFullYear()}
        {'. Built with ❤️ by '}
          <Tooltip title="Kevin Mocorro" placement="top">
          <Link color="inherit" href="https://kevinmocorro.com">
              kdm
          </Link>
          </Tooltip>
      </Typography>
    );
}
const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
        color: '#333'
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(20)
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 6,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));
/// end of essentials

export default function Layout(props) {
    const classes = useStyles();
    const user = props.data;
    const worker = createWorker();
    
    const [ boatID, setBoatID ] = useState('');

    /**
     What does useEffect do? By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.
    */
    useEffect(() => {

        async function OCRit(){ // OCR Engine...
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const data = await worker.recognize(props.imageSrcBuff);
    
            if(data.data.lines.length == 3){
                setBoatID(data.data.lines[2].text);
            } else if (data.data.lines.length == 2){
                setBoatID(data.data.lines[1].text);
            } else {;
                setBoatID(data.data.lines[0].text);
            }

            await worker.terminate();
        }
        // Invoke OCR engine..
        OCRit();
    }, []);

    return (
        <Fragment>
        <CssBaseline />
        <AppBar position="relative" style={{backgroundColor: '#fff', boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 1px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)    '}}>
            <Toolbar>
            <DeviceHub className={classes.icon}/>
            <Typography variant="h6" color="textPrimary">
                META
            </Typography>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Typography color="textPrimary" variant="overline">
                        {user.username}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" size="small" color="default" onClick={props.logout}>
                        logout
                    </Button>
                </Grid>
            </Grid>
            </Toolbar>
        </AppBar>
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
            <Container maxWidth="sm">

                <Grid>
                    <Grid item>
                        <img src={`data:image/png;base64,${props.imageSrcBase64}`} alt={props.imageId} />
                        <p>{boatID}</p>
                    </Grid>
                </Grid>
               
            </Container>
            </div>
            {/* End hero unit */}
            { /**
            <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={2}>

            </Grid>
            </Container>
            */ }
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                {/** meta/yep */}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
               {/**  2019 Year End Party Online Registration */}
            </Typography>
            <Copyright />
            <Typography variant="caption" align="center" color="textSecondary" component="p">
            {/** meta is made possible through the work of other open source software. */}
            </Typography>
        </footer>
        {/* End footer */}
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};