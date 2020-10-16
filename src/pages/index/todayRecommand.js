import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Paper from '@material-ui/core/Paper';
import tileData from './tileData';
// 用于展示今日推荐内容

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        width: '80vw',
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        padding: theme.spacing(1),
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridListTile:{
        '&:hover': {
            outline:'green 1px solid'
        },
    },
    title: {
        color: theme.palette.secondary.dark,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

function TodayRecommand() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={5}>
                <GridList className={classes.gridList} cols={5}>
                    {tileData.map((tile) => (
                        <GridListTile className={classes.gridListTile} key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`star ${tile.title}`}>
                                        <StarBorderIcon className={classes.title} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>

                <p style={{height:'5px'}}> Today Recommand</p>
            </Paper>
        </div>
    );
}

export default TodayRecommand
