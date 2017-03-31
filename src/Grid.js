import React, {Component} from 'react';
import axios from 'axios';
import {Board} from 'react-scrabble'
import Loader from './Loader'

class Grid extends Component {

  state = {data: []}

  componentWillMount() {
    axios.get(`https://85phjmgac9.execute-api.us-west-2.amazonaws.com/prod/react-scrabble/${this.props.params.id}`).then((res) => {
      this.setState({data: JSON.parse(res.data)})
    })
  }

  boardContent = () => {
    const {data} = this.state
    if (data && data.length > 0) {
      return <Board data={data}/>
    }
    else {
      return <Loader/>
    }
  }

  render() {
    return <div>
      {this.boardContent()}
    </div>
  }
}

export default Grid;
