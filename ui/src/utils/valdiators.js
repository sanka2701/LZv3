export const required = value => (value ? null : 'error.field.required');
export const requiredArray = value => (Array.isArray(value) && value.length >= 1) ? null : 'error.field.requiredAtLeastOne';
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'error.email.invalid'
        : null;