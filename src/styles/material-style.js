import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple, red,white } from '@material-ui/core/colors';

export const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[900]),
      backgroundColor: red[500],
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