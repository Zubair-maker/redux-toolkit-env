import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '50px',
        },
      },
    },
  },
});
