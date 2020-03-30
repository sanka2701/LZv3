const STEPS = {
    FORM_PROCESS: 1,
    FILE_STORAGE: 2,
    LOAD: 3,
    UPDATE: 4,
    SAVE: 5,
};

// todo: finish file revertion
class RequestProcessingError {
    constructor(message, code, step) {
        this.message = message;
        this.code = code;
        this.step = step;
    }
}

module.exports = RequestProcessingError;