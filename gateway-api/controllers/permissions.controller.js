// Controlador de permisos (RBAC)
const permissionsService = require('../services/permissions.service');

exports.getPermissions = async (req, res, next) => {
  try {
    const permissions = await permissionsService.getAllPermissions();
    res.json({ permissions });
  } catch (err) {
    next(err);
  }
};

exports.createPermission = async (req, res, next) => {
  try {
    const permission = await permissionsService.createPermission(req.body);
    res.status(201).json({ permission });
  } catch (err) {
    next(err);
  }
};

exports.updatePermission = async (req, res, next) => {
  try {
    const permission = await permissionsService.updatePermission(req.params.id, req.body);
    res.json({ permission });
  } catch (err) {
    next(err);
  }
};

exports.deletePermission = async (req, res, next) => {
  try {
    await permissionsService.deletePermission(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
