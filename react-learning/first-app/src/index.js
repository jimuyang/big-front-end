import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

console.log(styles);

/**
 * check if someone win.
 * @param {Array} squares
 */
function checkWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        // let line = lines[i];
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // someone win!
            console.log(squares[a] + ' win!');
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            currentPlayer: 'X',
            winner: null
        }

    }
    handleClick(i) {
        // create array copy
        const squares = this.state.squares.slice();
        if (squares[i] || this.state.winner) {
            return null;
        }
        squares[i] = this.state.currentPlayer;
        this.setState({
            squares: squares,
            currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
            winner: checkWinner(squares)
        });
    }


    renderSquare(i) {
        return <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />;
    }

    render() {
        // rerender: this.state has changed.
        // now check if win
        // const winner = checkWinner(this.state.squares);
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner;
        } else {
            status = 'Next player: ' + this.state.currentPlayer;
        }
        // const status = 'Next player: ' + this.state.currentPlayer;
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
