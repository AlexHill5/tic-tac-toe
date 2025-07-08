

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { initialTicTacToeBoard } from "../utils/InitialTicTacToeBoard";
import type { Player } from "../types/Player";

export const TicTacToeBoard: React.FC = () => {
    const [board, setBoard] = React.useState(initialTicTacToeBoard); // track state of the board
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>("X"); // track current player

    const resetGame = () => {
        setBoard(initialTicTacToeBoard);
        setCurrentPlayer("X"); 
    }

    return (
    <Box textAlign={"center"} mt={4}>
        <Typography variant="h4" gutterBottom>
            Tic Tac Toe
        </Typography>
        <Grid container spacing={1} justifyContent="center" sx={{width: 400, margin: '0 auto'}}>
            {initialTicTacToeBoard.map((square, index) => (
                <Grid  key={index}>
                    <Paper elevation={3}>
                        <Button
                            onClick={() => console.log(`square ${index} clicked`)}
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
                Current Player: {currentPlayer}
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