import React , {useState} from 'react';
import NumberFormat from 'react-number-format';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import calimage from './emi.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rounded: '5px',
    bgcolor: '',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

// const defaultProps = {
//   bgcolor: 'background.paper',
//   m: 1,
//   border: 1,
//   style: { width: '5rem', height: '5rem' },
// };

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
    />
  );
}

 export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [principal, setPrincipal] = useState();
  const [years, setYears] = useState();
  const [interest, setInterest] = useState();
  const [emi, setEmi] = useState();
  const [totalinterest, setTotalinterest] = useState();
  const [totalamt, setTotalamt] = useState();


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const calculate = () => {
    // A=p(1+(r/n))^(nt)
    const i=interest/(100*12);
    const monthlyinterest=Math.pow(1 + i, years*12);
    const result = principal *i* monthlyinterest/(monthlyinterest-1);
    const resinterest=result*(years*12)-principal;
    const resamt=result*(years*12);
    setEmi(result.toFixed(3));
    setTotalamt(resamt.toFixed(3));
    setTotalinterest(resinterest.toFixed(3));
  };


  const reset_val = () => {
    const v = 0;
    setEmi(v);
    setTotalinterest(v);
    setTotalamt(v);
    setPrincipal(v);
    setYears(v);
    setInterest(v);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Box display="flex" justifyContent="center">
          <Paper style={{borderRadius:"20px"}} elevation="9">
          <Box p={5}> 
            <Box display="flex" justifyContent="center" xs={12} sm={6}>
              {/* <Avatar className={classes.avatar} src={calimage}/> */}
              <Typography  component="h1" variant="h5" justifyContent="center">
                 Emi Calculator
                </Typography>
            </Box>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    defaultValue="0"
                    label="Loan Amount"
                    value={principal}
                    // value={values.numberformat}
                    onChange={(e) => setPrincipal(e.target.value)}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Time"
                  label="Time"
                  defaultValue="0"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  name="Time"
                  InputProps={{
                      inputComponent: NumberFormatCustom,
                  }}
                  // autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  // id="email"
                  defaultValue="0"
                  value={interest}
                  label="Interest Rate"
                  onChange={(e) => setInterest(e.target.value)}
                  InputProps={{
                      inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 variant="outlined"
                  fullWidth
                  id="result"
                  label="EMI"
                  defaultValue="0"
                  value={emi}
                  name="result"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                 <TextField
                 variant="outlined"
                  fullWidth
                  id="Total Interest"
                  label="Total Interest"
                  defaultValue="0"
                  value={totalinterest}
                  name="Total Interest"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 variant="outlined"
                  fullWidth
                  id="Total Amount Payable"
                  label="Total Amount Payable"
                  defaultValue="0"
                  value={totalamt}
                  name="Total Amount Payable"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
              calculate();;
            }}
            >
              Calculate
            </Button>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
              reset_val();
            }}
            >
              Reset
            </Button>
            <Grid container justify="flex-end">
            </Grid>
          </form>
          </Box>
          </Paper>
            {/* <Box borderColor="secondary.main" {...defaultProps} />
            <Box borderColor="error.main" {...defaultProps} />
            <Box borderColor="grey.500" {...defaultProps} />
            <Box borderColor="text.primary" {...defaultProps} /> */}        
          </Box>
        </div>
      </Container>
    </div>
  );
} 