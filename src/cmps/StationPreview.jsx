import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { setStation } from '../store/media.action'




function _StationPreview({ station, setStation }) {


    if (!station.songs.length) return <React.Fragment></React.Fragment>
    return (
        <Link to={`/station/${station._id}`}>
            <section className='station-preview card flex' onClick={() => setStation(station)} >
                <div className='img-container'>
                    <img src={station.songs[0].imgUrl} />
                </div>
                <button className='play-btn' ><i className="fas fa-play-circle"></i></button>
                <div className='wrraper flex'>
                    <div className='info-container'>
                        <h3>{station.createdBy.fullname}</h3>
                        <small>{station.name}</small>
                    </div>
                    <div className='likes-count flex column align-center space-between'>
                        <i className="fas fa-thumbs-up"></i>
                        <small>{station.likesCount}</small>
                    </div>
                </div>
                {/* <span>{station.songs.map(song => <p key={song._id}>{song.url}</p>)}</span> */}
            </section>
        </Link>
    )
}


function mapStateToProps({ }) {
    return {
    }
}

const mapDispatchToProps = {
    setStation,
}


export const StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview)
