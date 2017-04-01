import React, {Component} from 'react';
import './Form.css'
import {Title} from 'react-scrabble'
import Loader from './Loader'
import axios from 'axios';
const uuidV4 = require('uuid/v4');

export default class Form extends Component {

  state = {data: [], loading: false, popup: false, key: undefined}

  closePopup = () => {
    this.setState({popup: false})
  }

  updateWord = (idx, evt) => {
    const {data} = this.state
    const item = data[idx]
    if (evt.target.value.length <= 10) {
      item.word = evt.target.value
      this.setState({data: data})
    }
  }

  updateHint = (idx, evt) => {
    const {data} = this.state
    const item = data[idx]
    item.hint = evt.target.value
    this.setState({data: data})
  }

  componentWillMount() {
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({word: '', hint: ''})
    }
    this.setState({data: data})
  }

  persist = () => {
    this.setState({loading: true})
    const dataToBeSaved = this.state.data.filter((item) => item.word !== '')
    const token = uuidV4().split('-')[0].toUpperCase()
    axios.post(`https://85phjmgac9.execute-api.us-west-2.amazonaws.com/prod/react-scrabble/${token}`, dataToBeSaved).then((res) => {
      const key = res.data.key.split(".")[0]
      this.setState({loading: false, popup: true, key: key})

    })
  }

  render() {
    const {data, loading, popup} = this.state
    if (loading) {
      return <Loader/>
    }
    return <div>
      <Title text="SCRABBLE"/>
      <div className="container">
        <p>Please type in the words and the corresponding hints to generate the scrabble board</p>
        {
          data.map((item, idx) => {
            return <div className="row" key={`Input${idx}`}>
              <input type="text"
                     value={item.word}
                     placeholder="word"
                     onChange={this.updateWord.bind(this, idx)}
                     style={{width: 200}}/>
              <input type="text"
                     value={item.hint}
                     onChange={this.updateHint.bind(this, idx)}
                     placeholder="hint"
                     style={{width: 500}}/>
            </div>
          })
        }
        <button className='generateButton' onClick={this.persist}>Generate</button>
      </div>
      {popup && <div className="overlay">
        <div className="popup">
          <button className="closeButton" onClick={this.closePopup}>&times;</button>
          <div className="content">
            <p>Use the following link to play/share the scrabble game that you created</p>
            <a href={`http://app.scrabbler.click/${this.state.key}`} className="link">
              http://app.scrabbler.click/{this.state.key}
              </a>
          </div>
        </div>
      </div>}
    </div>
  }
}