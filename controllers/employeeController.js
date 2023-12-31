import employeeService from '../services/employeeService.js'
// Controller function to login user

class employeeController{
static async loginUser(req, res) {
  const { username, password } = req.body;
  try{
    const token = await employeeService.login(username, password);
    // if(token===null){
    //   throw new Error("token not generated")
    // }
    res.json({ token });
    // return {token};
  } catch (error) {
    res.status(404).json({ error:error.message });
  }
}

// Controller function to get an employee by ID
static async getEmployeeById(req, res) {
  const { id } = req.params;
  try {
    const employee = await employeeService.getEmployeeById(id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: 'Employee not found' });
  }
}

// Controller function to create a new employee
static async createEmployee(req, res) {
  const employeeData = req.body;
  try {
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Error creating employee' });
  }
}

// Controller function to update an employee by ID
static async updateEmployeeById(req, res) {
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
static async deleteEmployeeById(req, res) {
  const { id } = req.params;
  try {
    await employeeService.deleteEmployeeById(id);
    res.status(200).json({success: 'Employee Deleted'});
  } catch (error) {
    res.status(404).json({ error: 'Employee not found' });
  }
}

// Controller function to get employees by age range
static async getEmployeesByAgeRange(req, res) {
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
}

export default employeeController;
