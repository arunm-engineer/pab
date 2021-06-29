import React from 'react'
import { Container, Grid, Paper, makeStyles } from '@material-ui/core'

function GridComponent() {
    // classes
    // Hook for css classes
    let useStyles = makeStyles({
        size: {
            height: "20vh",
            backgroundColor: "lightgrey"
        },
        color: {
            color: "blueviolet"
        }
    })

    let classes = useStyles();

    // Grid is mobile first
    // xs, sm, md, lg, xl
    // Grid divided into 12 equal parts

    return (
        <div>

            <Container>
                <Grid container spacing={5}>
                    <Grid item xs={5} sm={3} md={5} lg={10}>
                        <Paper className={classes.size}>HELLO</Paper>
                    </Grid>
                    <Grid item xs={5} sm={3} md={5} lg={2}>
                        <Paper className={[classes.size, classes.color]}>HELLO</Paper>
                    </Grid>
                    <Grid item xs={5} sm={6} md={2}>
                        <Paper className={[classes.size, classes.color]}>HELLO</Paper>
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}

export default GridComponent
