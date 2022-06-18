import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
    palette:{
        primary:{
            main: '#0288d1',
            light: '#01579b',
            contrastText: '#FFFFFF',
        },
        secondary:{
            main: '#4fc3f7',
            dark: '#03a9f4',
            light: '#29b6f6',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#212121',
            paper: '#FFF',
        }
    }
});