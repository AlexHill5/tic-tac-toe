

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { initialTicTacToeBoard } from "../utils/InitialTicTacToeBoard";
import type { Player } from "../types/Player";
import type { Board } from "../types/Board";

export const TicTacToeBoard: React.FC = () => {
    const [board, setBoard] = React.useState<Board>(initialTicTacToeBoard); // track state of the board
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>("X"); // track current player
    const [winner, setWinner] = React.useState<Player | "Draw" | null>(null);

    const resetGame = () => {
        setBoard(initialTicTacToeBoard);
        setCurrentPlayer("X"); 
        setWinner(null);
    }

    const size = Math.sqrt(board.length);
    const checkWinner = (board: Board): Player | "Draw" | null => {
        for (let row = 0; row < size; row++) {
            const first = board[row * size];
            if (!first) continue;
            let win = true;
            for (let col = 1; col < size; col++) {
                if (board[row * size + col] !== first) {
                    win = false;
                    break;
                }
            }
            if (win) return first;
        }
        // Check columns
        for (let col = 0; col < size; col++) {
            const first = board[col];
            if (!first) continue;
            let win = true;
            for (let row = 1; row < size; row++) {
                if (board[row * size + col] !== first) {
                    win = false;
                    break;
                }
            }
            if (win) return first;
        }
        // Check main diagonal
        const firstDiag = board[0];
            if (firstDiag) {
            let win = true;
            for (let i = 1; i < size; i++) {
                if (board[i * size + i] !== firstDiag) {
                    win = false;
                    break;
                }
            }
            if (win) return firstDiag;
        }
        // Check anti-diagonal
        const firstAntiDiag = board[size - 1];
        if (firstAntiDiag) {
            let win = true;
            for (let i = 1; i < size; i++) {
                if (board[i * size + (size - 1 - i)] !== firstAntiDiag) {
                    win = false;
                    break;
                }
            }
            if (win) return firstAntiDiag;
        }
        // Draw check
        if (board.every(cell => cell)) return "Draw";
        return null;
    };
    
    const handlePlayerMove = (index: number) => {
        if(board[index] || winner) return; // I would rather disable the button than here but mui is fighting me.

        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;

        const result = checkWinner(updatedBoard);
        setWinner(result);
        setBoard(updatedBoard);

        if(!result) {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }

    }

    return (
    <Box textAlign={"center"} mt={4}>
        <Typography variant="h4" gutterBottom>
            Tic Tac Toe
        </Typography>
        <Grid container spacing={1} justifyContent="center" sx={{width: 400, margin: '0 auto'}}>
            {board.map((square, index) => (
                <Grid  key={index}>
                    <Paper elevation={3}>
                        <Button
                            onClick={() => handlePlayerMove(index)}
                            variant="outlined"
                            sx={{
                            width: 100,
                            height: 100,
                            fontSize: '2rem',
                            minWidth: 0,
                            minHeight: 0,
                            p: 0,
                            borderRadius: 0,
                            }}
                        >
                            {square}
                        </Button>
                    </Paper>
                </Grid>
            ))}
        </Grid>
        <Box mt={2}>
            <Typography variant="h6">
                { winner === "Draw" ? `DRAW` : winner ? `${winner} WON!` : "Current Player: " + currentPlayer }
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={resetGame}
            >
                Reset Game
            </Button>
        </Box>
    </Box>
    )
}