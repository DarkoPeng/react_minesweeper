import React, { Component } from 'react';
import './minesweeper.css';

class MineSweeper extends Component {
  constructor(props){
    super(props);
    this.initMap = this.initMap.bind(this);
    this.clickCell = this.clickCell.bind(this);
    this.state = {
      rowCount: 9,
      columnCount: 9,
      mineMap: []
    }
  }

  // 初始化地图
  initMap(){
    let tempMap = [];
    for(let i = 0; i < this.state.rowCount; i++){
      tempMap[i] = [];
      for(let j = 0; j < this.state.columnCount; j++){
        tempMap[i][j] = {
          isMine: this.randomMine(),
          isClick: false,
          isFlag: false,
          count: 0
        }
      }
    }
    
    return tempMap;
  }

  // 随机生成地雷
  randomMine(){
    return Math.floor(Math.random() * 10) > 8;
  }

  // 点击格子周围8个格子的坐标
  nearCell(row, column){
    const nearCellSet = [
      [row - 1, column - 1],
      [row - 1, column],
      [row - 1, column + 1],
      [row, column - 1],
      [row, column + 1],
      [row + 1, column - 1],
      [row + 1, column],
      [row + 1, column + 1]
    ];
    return nearCellSet.filter(item => {
      let [x, y] = item;
      return x > -1 && x < this.state.rowCount && y > -1 && y < this.state.columnCount;
    })    
  }

  // 递归
  recursion(row, column){
    const {mineMap} = this.state;
    const nearCell = this.nearCell(row, column);

    for(let i = 0; i < nearCell.length; i++){
      let [x, y] = nearCell[i];
      if(!mineMap[x][y].isClick && !mineMap[x][y].isFlag){
        this.clickCell(x, y);
      }
    }
  }

  // 右键点击事件处理
  onContextMenuHandler(row, column, e){
    e.preventDefault();
    const {mineMap} = this.state;
    mineMap[row][column].isFlag = true;
    this.setState({
      mineMap: mineMap
    })    
  }

  // 点击事件处理
  clickCell(row, column){
    const {mineMap} = this.state;
    const nearCell = this.nearCell(row, column);

    // 已点开
    if(mineMap[row][column]['isClick']) {
      return;
    }

    // 点击区域置灰
    mineMap[row][column].isClick = true;

    // 踩到地雷
    if(mineMap[row][column]['isMine']){
      console.error('loser');
      return;
    }

    // 点击方块周围有地雷
    for(let i = 0; i < nearCell.length; i++){
      let [x, y] = nearCell[i];
      if(mineMap[x][y]['isMine']){
        mineMap[row][column]['count']++;
      }  
    }

    // 点击方块周围没有地雷，递归调用
    if(Number(mineMap[row][column]['count']) === 0){
      this.recursion(row, column);
    }
    // 重绘
    this.setState({
      mineMap: mineMap
    })        

  }

  componentWillMount(){
    this.setState({
      mineMap: this.initMap()
    })
  }

  render(){
    return (
      <div className="mine-map">
        {this.state.mineMap.map((row, rowIndex) => 
          <div className="mine-row" key={rowIndex}>
            {row.map((column, columnIndex) => 
              <span className={`mine-cell ${column.isClick ? 'clicked' : ''}`} key={columnIndex} 
                    onClick={(e) => this.clickCell(rowIndex, columnIndex, e)}
                    onContextMenu={(e) => this.onContextMenuHandler(rowIndex, columnIndex, e)}>
                { column.isClick && column.count ? 
                  column.count : (column.isFlag ?
                  'F' : (column.isClick && column.isMine ? 'X' : ''))}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default MineSweeper;
