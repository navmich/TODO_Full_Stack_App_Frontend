export enum ValidationSeverity {
  ERROR,
  WARNING,
}

export function getSeverity(text: string): ValidationSeverity {
  if (text && 'error' === text.toLowerCase()) {
    return ValidationSeverity.ERROR;
  } else if (text && 'warning' === text.toLowerCase()) {
    return ValidationSeverity.WARNING;
  } else {
    return ValidationSeverity.ERROR;
  }
}
