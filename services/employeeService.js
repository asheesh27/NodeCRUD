import Employee from '../models/employee.js';
import Op from 'sequelize';
import jwt from 'jsonwebtoken';

class employeeService{
// Service function to login
static async login(username, password){
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, 'Qwerty123');
    return token;
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

// Service function to get an employee by ID
static async getEmployeeById(id) {
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  } catch (error) {
    throw new Error('Error fetching employee');
  }
}

// Service function to create a new employee
static async createEmployee(employeeData) {
  try {
    const newEmployee = await Employee.create(employeeData);
    return newEmployee;
  } catch (error) {
    throw new Error('Error creating employee');
  }
}

// Service function to update an employee by ID
static async updateEmployeeById(id, employeeData) {
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    const updatedEmployee = await employee.update(employeeData);
    return updatedEmployee;
  } catch (error) {
    throw new Error('Error updating employee');
  }
}

// Service function to delete an employee by ID
static async deleteEmployeeById(id) {
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    await employee.destroy();
  } catch (error) {
    throw new Error('Error deleting employee');
  }
}

// Service function to get employees by age range
static async getEmployeesByAgeRange(minAge, maxAge, pageNumber, limitNumber) {
  console.log("hello");
  const offset = (pageNumber - 1) * limitNumber;
  try{
    if (minAge && maxAge) {
      const result = await Employee.findAndCountAll({
        offset,
        limit: limitNumber,
        where: {
          age: {
            [Op.between]: [minAge, maxAge],
          },
      }
      });
      return result;
    } else {
      console.log("hello1");
      const result = await Employee.findAndCountAll({
        offset,
        limit: limitNumber})
      console.log(result)
      return result;
    }
  } catch (error) {
    throw new Error('Error getting employees');
  }
}
}

export default employeeService;
