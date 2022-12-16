/* eslint-disable @typescript-eslint/no-explicit-any */
//type checking function: return target type in (string)
export default function getType(target: any) {
    return Object.prototype.toString.call(target).slice(8, -1);
}
