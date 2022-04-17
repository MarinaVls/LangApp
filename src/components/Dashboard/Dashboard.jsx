import React from 'react';
import classes from './Dashboard.module.css'
import PlayButton from './../../assets/img/play.svg'

const Dashboard = ({points}) => {

    console.log((0.2 * Math.sqrt(points)).toFixed())
    return (
        <section className={classes.dashboardContainer}>
            <div className={classes.gameBlock}>
                <p>The most populat game is <br />
                    <b>Speak IT</b>
                </p>
                <img className={classes.btnPlay} src={PlayButton} alt='' />
                <button className={classes.btnRandom}>Play random game</button>
            </div>
            <div className={classes.pointsBlock}>
                <span>Common experience</span>
                <h3>{points} points</h3>
            </div>
            <div className={classes.levelBlock}>
                <span>Level</span>
                <h3>{(0.2 * Math.sqrt(points)).toFixed()}Level</h3>
                <p>Learn 75 new words in one course</p>
                <div className={classes.levelBackground}></div>
            </div>
        </section>
    )
}

export default Dashboard