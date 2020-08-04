import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ValidationMessage } from './validation.message';

// s Transloco
// export function validateTargetDate(i18n: TranslocoService): ValidatorFn {
export function validateTargetDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // a konstanta s Transloco
    // const TARGET_DATE_MUST_BE_FUTURE_DATE = i18n.translate('error.targetDate.before.now');
    const TARGET_DATE_MUST_BE_FUTURE_DATE = 'Target date can not be past';
    const targetDate = new Date(control.value);
    const now = new Date(formatDate(Date.now(), 'yyyy-MM-dd', 'en-US'));

    if (targetDate < now) {
      return {
        'error.targetDate.isBeforeNow': ValidationMessage.error(
          TARGET_DATE_MUST_BE_FUTURE_DATE
        ),
      };
    }
    return null;
  };
}
