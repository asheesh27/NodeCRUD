const employeeService = require('../services/employeeService');

// Controller function to login user

async function loginUser(req, res) {
  const { username, password } = req.body;
  try{
    const token = await employeeService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(404).json({ error: 'Not Admin' });
  }
}

// Controller function to get an employee by ID
async function getEmployeeById(req, res) {
  const { id } = req.params;
  try {
    const employee = await employeeService.getEmployeeById(id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: 'Employee not found' });
  }
}

// Controller function to create a new employee
async function createEmployee(req, res) {
  const employeeData = req.body;
  console.log(req.body);
  try {
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Error creating employee' });
  }
}

// Controller function to update an employee by ID
async function updateEmployeeById(req, res) {
  const { id } = req.params;
  const employeeData = req.body;
  try {
    const updatedEmployee = await employeeService.updateEmployeeById(id, employeeData);
    res.status(201).json(updatedEmployee);
  } catch (error) {
    res.status(404).json({ error: 'Employee not found' });
  }
}

// Controller function to delete an employee by ID
async function deleteEmployeeById(req, res) {
  const { id } = req.params;
  try {
    await employeeService.deleteEmployeeById(id);
    res.status(200).json({success: 'Employee Deleted'});
  } catch (error) {
    res.status(404).json({ error: 'Employee not found' });
  }
}

// Controller function to get employees by age range
async function getEmployeesByAgeRange(req, res) {
  const { minAge, maxAge, page, limit } = req.query;
  // Convert page and limit to numbers and provide default values
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  try {
    // Call the service function to get employees by age range
    const result = await employeeService.getEmployeesByAgeRange(minAge, maxAge, pageNumber, limitNumber);
    console.log(result);
    const { count, rows } = result;
    const totalPages = Math.ceil(count / limitNumber);
    if(rows.length > 0){
    res.json({
      totalPages,
      currentPage: pageNumber,
      totalEmployees: count,
      employees: rows,
    });
  }else{
    res.status(200).json({success: 'No employees in this page/range'});
  }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  loginUser,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeesByAgeRange
};
