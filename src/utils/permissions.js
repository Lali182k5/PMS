// Permissions module removed — exporting no-op stubs to avoid runtime errors
export function isAdminLike() { return false; }
export function isPatient() { return false; }
export function can() { return true; }

const permissions = { isAdminLike, isPatient, can };
export default permissions;
