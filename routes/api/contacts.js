const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:id", authenticate, ctrl.deleteById);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

module.exports = router;
