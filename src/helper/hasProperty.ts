/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable space-before-function-paren */
export const hasProperty = function <T>(object: any): object is T {
    return object?.data;
};

export default hasProperty;
