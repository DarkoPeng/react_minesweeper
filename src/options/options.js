import React, { Component } from 'react';

class Options extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    return (
      <div className="options">
        <h3>React版扫雷</h3>
        <div className="options-list">
          <label>
            <input type="radio" name="level"></input> 初级
          </label>
          <label>
            <input type="radio" name="level"></input> 中级
          </label>
          <label>
            <input type="radio" name="level"></input> 高级
          </label>
          <label>
            <input type="radio" name="level"></input> 自定义
          </label>                                    
        </div>
      </div>
    )
  }
}

export default Options;
