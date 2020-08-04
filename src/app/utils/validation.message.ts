import { ValidationSeverity } from './validation.severity';

export class ValidationMessage {
  text: string;
  severity: ValidationSeverity;

  constructor(text: string, severity: ValidationSeverity) {
    this.text = text;
    this.severity = severity;
  }

  static of(validationSeverity: ValidationSeverity, text: string) {
    return new ValidationMessage(text, validationSeverity);
  }

  static error(text: string) {
    return new ValidationMessage(text, ValidationSeverity.ERROR);
  }

  static warning(text: string) {
    return new ValidationMessage(text, ValidationSeverity.WARNING);
  }
}
