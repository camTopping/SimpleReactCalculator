import { Button, Grid, styled } from "@mui/material";

const OperationButton = styled(Button)((props) => ({
    backgroundColor: '#424242',
    borderColor: props.selected ? "#455a64" : '#424242',
    height: '100%',
    ...(props.variant === "bold" && {
        backgroundColor: '#009688',
        "&:hover": {
            backgroundColor: '#00695f'
        }
    }),
}))

function GridOperationButton({operation, setOperation, xs=3, variant=''}){
    return(
        <Grid item xs={xs}>
            <OperationButton 
                fullWidth
                variant={variant}
                onClick={() => setOperation(operation)}
            >
                {operation}
            </OperationButton>
        </Grid>
    )
}

export default GridOperationButton;