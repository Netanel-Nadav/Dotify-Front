import React from "react"

import { socketService } from "../services/socket.service"


export class EditPlaylist extends React.Component {

    state = {
        station: null,
        colorIdx: null,
        colors: [
            {
                name: 'cyan',
                value: '#49B6FF',
            },
            {
                name: 'blue',
                value: '#779BE7',
            },
            {
                name: 'magenta',
                value: '#D264B6',
            },
            {
                name: 'green',
                value: '#4FB477',
            },
            {
                name: 'sand',
                value: '#EDCBB1',
            },
        ]
    }

    componentDidMount() {
        this.setState({ station: this.props.station })
        document.body.style.overflow = "hidden"
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.station !== this.props.station) {
            this.setState({ station: this.props.station })
        }
    }


    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        this.setState((prevState) => ({ station: { ...prevState.station, [field]: value } }))
    }


    onChooseColor = (color, idx) => {
        this.setState({colorIdx: idx})
        this.setState((prevState) => ({ station: { ...prevState.station, backgroundColor: color } }))
    }



    uploadImg = (ev) => {
        const CLOUD_NAME = 'dvxuxsyoe'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append('file', ev.target.files[0])
        formData.append('upload_preset', 'mx6fvrvl');

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                const imgUrl = res.url
                this.setState((prevState) => ({ station: { ...prevState.station, imgUrl: imgUrl } }))
            })
            .catch(err => console.error(err))
    }


    handleSubmit = async (ev) => {
        ev.preventDefault()
        this.props.setIsModalShown(false)
        await this.props.updateStation(this.state.station)
        socketService.emit('update station', this.state.station)
    }

    render() {

        const { station, colors, colorIdx } = this.state
        if (!station) return <React.Fragment></React.Fragment>
        if (!colors) return <React.Fragment></React.Fragment>
        const { name, imgUrl, songs } = station
        return (
            <section className='edit-playlist flex justify-center align-center'>
                <form className='edit-info flex column justify-center' onSubmit={this.handleSubmit}>
                    <button className="close-btn" onClick={() => this.props.setIsModalShown(false)}>X</button>
                    <div className='wrraper flex justify-center align-center'>
                        <div className='img-upload' style={{ backgroundImage: station.imgUrl ? `url(${imgUrl})` : `url(${songs[0].imgUrl})` }}>
                            <input type="file" onChange={this.uploadImg} />
                        </div>
                        <div className='input-container flex column'>
                            <label>Enter Playlist Name</label>
                            <input type="text" name="name" value={name} onChange={this.handleChange} />
                            <div className='color-container flex justify-center align-center'>
                                {colors.map((color, idx) => (
                                   <div key={idx} className={`color ${color.name} ${colorIdx === idx ? 'clicked' : ''}`} onClick={() => this.onChooseColor(color.value, idx)}></div>
                                ))}
                            </div>
                            <button>Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        )

    }
}