import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { deepPurple, blue , red, indigo, green, amber, } from '@material-ui/core/colors';

export const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[900]),
      backgroundColor: red[900],
      '&:hover': {
        backgroundColor: red[900],
      },
    },
}))(Button);

export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const navBarUseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  login: {
    textAlign: "right",
  },
}));

export const profileButton = makeStyles((theme) => ({
  root: {

  }
}))

export const textFieldStyle = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const sendersTable = makeStyles((theme) => ({
  root: {
    backgroundColor: red[50]
  }
}))

export const BlueButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
    '&:hover': {
      backgroundColor: indigo[500],
    },
  },
}))(Button);

export const PurpleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[500],
    },
  },
}))(Button);

export const LightBlueButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[500],
    },
  },
}))(Button);

export const GreenButton = withStyles((theme) => ({
  root: {
    color: green[50],
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
  },
}))(Button);

export const AmberButton = withStyles((theme) => ({
  root: {
    color: amber[50],
    backgroundColor: amber[600],
    '&:hover': {
      backgroundColor: amber[600],
    },
  },
}))(Button);

export const DarkPurpleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepPurple[700]),
    backgroundColor: deepPurple[700],
    '&:hover': {
      backgroundColor: deepPurple[700],
    },
  },
}))(Button);