const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

//POST /Login
router.post('/login', employeeController.loginUser);

// GET /employees/:id
router.get('/employee/:id', employeeController.getEmployeeById);

// POST /employees
router.post('/employee', employeeController.createEmployee);

// PUT /employees/:id
router.put('/employee/:id', employeeController.updateEmployeeById);

// DELETE /employees/:id
router.delete('/employee/:id', employeeController.deleteEmployeeById);

// GET /api/employees?minAge=a&maxAge=b
router.get('/employees', employeeController.getEmployeesByAgeRange);

module.exports = router;