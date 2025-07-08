

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import type { Board } from "../types/Board";

const initialBoard: Board = Array(9).fill(null);

export const TicTacToeBoard: React.FC = () => {
    return (
    <Box textAlign={"center"} mt={4}>
        <Typography variant="h4" gutterBottom>
            Tic Tac Toe
        </Typography>
        <Grid container spacing={1} justifyContent="center" sx={{width: 400, margin: '0 auto'}}>
            {initialBoard.map((cell, index) => (
                <Grid  key={index}>
                    <Paper elevation={3}>
                        <Button
                            onClick={() => console.log(`Cell ${index} clicked`)}
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
                            {cell}
                        </Button>
                    </Paper>
                </Grid>
            ))}
        </Grid>

    </Box>
    )
}