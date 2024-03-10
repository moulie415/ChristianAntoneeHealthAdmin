import {defaultTheme} from 'react-admin';
import colors from './colors';

/**
 * Soft: A gentle theme for apps with rich content (images, charts, maps, etc).
 *
 * Uses white app bar, rounder corners, light colors.
 */

export const softDarkTheme = {
  palette: {
    primary: {
      main: colors.appBlue,
    },
    secondary: {
      main: colors.appBlue,
    },
    mode: 'dark' as const, // Switching the dark mode on is a single property value change.
  },
  sidebar: {
    width: 200,
  },
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderLeft: '3px solid #000',
          '&.RaMenuItemLink-active': {
            borderLeft: `3px solid ${colors.appBlue}`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          color: '#ffffffb3',
          backgroundColor: '#616161',
        },
      },
      defaultProps: {
        elevation: 1,
      },
    },
  },
};

export const softLightTheme = {
  palette: {
    primary: {
      main: colors.appBlue,
    },
    secondary: {
      light: colors.appBlueLight,
      main: colors.appBlue,
      dark: colors.appBlueDark,
      contrastText: '#fff',
    },
    background: {
      default: '#fcfcfe',
    },
    mode: 'light' as const,
  },
  shape: {
    borderRadius: 10,
  },
  sidebar: {
    width: 200,
  },
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderLeft: '3px solid #fff',
          '&.RaMenuItemLink-active': {
            borderLeft: `3px solid ${colors.appBlue}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: 'none',
        },
        root: {
          border: '1px solid #e0e0e3',
          backgroundClip: 'padding-box',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          color: '#808080',
          backgroundColor: '#fff',
        },
      },
      defaultProps: {
        elevation: 1,
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#f5f5f5',
        },
        barColorPrimary: {
          backgroundColor: '#d7d7d7',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {border: 0},
        },
      },
    },
  },
};
