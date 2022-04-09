export const VIEW_PERM = 'view'
export const CHANGE_PERM = 'change'
export const ADD_PERM = 'add'
export const DELETE_PERM = 'delete'
export const resourcePermissions = [VIEW_PERM, CHANGE_PERM, ADD_PERM, DELETE_PERM];

export const getPermission = (permissions, resource, action) =>
    !permissions
        ? false
        : permissions.findIndex(perm => perm.codename === `${action}_${resource.replaceAll('_', '')}`) >= 0;

export const getResourcePermissions = (permissions, resource) => {
    const perms = {};
    resourcePermissions.forEach(permission => perms[permission] = getPermission(permissions, resource, permission));
    return perms;
};
