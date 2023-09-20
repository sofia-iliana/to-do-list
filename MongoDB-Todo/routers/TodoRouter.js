const router = require("express").Router();
const controller = require("../controllers/TodoController.js");

router.get("/todo", controller.getTodo);
router.post("/todo/create", controller.postTodo);
router.delete("/todo/delete/:id", controller.deleteTodo);
router.put("/todo/update/:id", controller.updateTodo);

module.exports = router;
