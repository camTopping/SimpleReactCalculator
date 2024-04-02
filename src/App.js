import { Container, Grid, Paper, styled } from "@mui/material";
import GridNumberButton from "./GridNumberButton";
import GridOperationButton from "./GridOperationButton";
import { useState } from "react";

const OutputContainer = styled(Paper)(({theme}) => ({
  width: '100%',
  height: '100%',
  textAlign: 'right',
  alignContent: 'center',
  padding: theme.spacing(2),
  fontSize: '3em',
  overflow: 'hidden'
}))

const Base = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 16
}))

function App() {

  /*
    STATE VARIABLES:
    currentNumber stores the number currently visible at the top of the calculator. 
    previousNumber stores the number previously entered into the calculator before any operation button was pressed. 
    operation stores the current operator that will be performed on the previous and current number. 
    overwrite is uses to remove the inital 0 placed in the calculator when appropriate.
  */
  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  // Logic for handling new numbers into calculator 
  const selectNumber = (number) => {
    // Check for invalid inputs
    if (currentNumber.includes('.') && number === '.') return
    if (currentNumber[0] && number === '0') return

    // Overwrite if the leading digit/number is 0, and following input is not decimal
    if (overwrite && number !== '.'){
      setCurrentNumber(`${number}`)
    }
    // Append the number to the current value
    else {
      setCurrentNumber(`${currentNumber}${number}`)
    }
    setOverwrite(false)
  }

  // Logic for handling operators on calculator
  const selectOperation = (operation) => {
    // If previous value already exist, perform calculation
    if(previousNumber){
      const val = calculate()
      setCurrentNumber(`${val}`);
      setPreviousNumber(`${val}`);
    }
    else {
      setPreviousNumber(currentNumber);
    }
    setOperation(operation);
    setOverwrite(true);
  }

  // Special Operators
  const clear = () => {
    setCurrentNumber("0");
    setPreviousNumber("");
    setOverwrite(true);
  }

  const clearEntry = () => {
    setCurrentNumber("0");
    setOverwrite(true);
  }

  const perc = () => {
    const curr = parseFloat(currentNumber);
    setCurrentNumber((curr / 100).toString());
  }

  // Calculate
  const calculate = () => {
    if (!operation || !previousNumber) return currentNumber

    const curr = parseFloat(currentNumber);
    const prev = parseFloat(previousNumber);

    let result;
    switch(operation){
      case '÷':
        result = prev / curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      default:
        result = prev;
    }
    return result
  }

  const equals = () => {
    const val = calculate()
    setCurrentNumber(val);
    setPreviousNumber("");
    setOperation("");
    setOverwrite(true);
  }

  return (
    <Container maxWidth="md">
      <Base elevation={3} sx={{height: '80vh'}}>
        <Grid container spacing={0.5} minHeight={'100%'}>
          <Grid item xs={12}>
              <OutputContainer elevation={1}>{currentNumber}</OutputContainer>
          </Grid>
          <Grid item container spacing={0.5}>
            <GridOperationButton operation={'%'} setOperation={perc}/>
            <GridOperationButton operation={'CE'} setOperation={clearEntry}/>
            <GridOperationButton operation={'C'} setOperation={clear}/>
            <GridOperationButton operation={'÷'} setOperation={selectOperation}/>
          </Grid>
          <Grid item container spacing={0.5}>
            <GridNumberButton number={7} setNumber={selectNumber}/>
            <GridNumberButton number={8} setNumber={selectNumber}/>
            <GridNumberButton number={9} setNumber={selectNumber}/>
            <GridOperationButton operation={'×'} setOperation={selectOperation} />
          </Grid>
          <Grid item container spacing={0.5}>
            <GridNumberButton number={4} setNumber={selectNumber}/>
            <GridNumberButton number={5} setNumber={selectNumber}/>
            <GridNumberButton number={6} setNumber={selectNumber}/>
            <GridOperationButton operation={'-'} setOperation={selectOperation} />
          </Grid>
          <Grid item container spacing={0.5}>
            <GridNumberButton number={1} setNumber={selectNumber}/>
            <GridNumberButton number={2} setNumber={selectNumber}/>
            <GridNumberButton number={3} setNumber={selectNumber}/>
            <GridOperationButton operation={'+'} setOperation={selectOperation} />
          </Grid>
          <Grid item container spacing={0.5}>
            <GridNumberButton number={0} setNumber={selectNumber} xs={6}/>
            <GridNumberButton number={'.'} setNumber={selectNumber} />
            <GridOperationButton operation={'='} setOperation={equals} variant="bold"/>
          </Grid>
        </Grid>
      </Base>
    </Container>
  );
}

export default App;
