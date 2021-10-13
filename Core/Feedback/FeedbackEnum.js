module.exports = class FeedbackEnum {

    static SUCCESS = {
        NAME: "success",
        TYPE: "feedback",
        DEFAULT_TIMEOUT: 5,
        COLOR: "feedback-success"
    };
    static ERROR = {
        NAME: "error",
        TYPE: "feedback",
        DEFAULT_TIMEOUT: 5,
        COLOR: "feedback-error"
    }
};
