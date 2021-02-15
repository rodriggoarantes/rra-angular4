import { MatSnackBarConfig } from '@angular/material/snack-bar';

const config = {
  success: <MatSnackBarConfig>{
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snackbar-success-style'],
  },
  error: <MatSnackBarConfig>{
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snackbar-error-style'],
  },
};

export default config;
