export const asyncHandler = (responsefunction) => {
    return (req, res, next) => {
        Promise.resolve(responsefunction(req, res, next)).catch(err => next(err));
    }
}