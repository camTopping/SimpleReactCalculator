import { Button, Grid, styled } from "@mui/material";

const NumberButton = styled(Button)((props) => ({
    backgroundColor: '#616161',
    height: '100%',
}))

function GridNumberButton({number, setNumber, xs=3}){
    return(
        <Grid item xs={xs}>
            <NumberButton 
                fullWidth 
                onClick={() => setNumber(number)}
            >
                {number}
            </NumberButton>
        </Grid>
    )
}

export default GridNumberButton;