// Permits management service
const permissions = [
  { id: '1', name: 'admin' },
  { id: '2', name: 'user' },
];

exports.getAllPermissions = async () => permissions;

exports.createPermission = async (data) => {
  const newPermission = { id: String(Date.now()), ...data };
  permissions.push(newPermission);
  return newPermission;
};

exports.updatePermission = async (id, data) => {
  const idx = permissions.findIndex(p => p.id === id);
  if (idx === -1) throw new Error('Permission not found');
  permissions[idx] = { ...permissions[idx], ...data };
  return permissions[idx];
};

exports.deletePermission = async (id) => {
  const idx = permissions.findIndex(p => p.id === id);
  if (idx === -1) throw new Error('Permission not found');
  permissions.splice(idx, 1);
};
