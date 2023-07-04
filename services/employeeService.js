const Employee = require('../models/employee');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

// Service function to login
async function login(username, password){
  if (username === 'admin' && password === 'password') {
    console.log(username, password);
    const token = jwt.sign({ username }, 'Qwerty123');
    return token;
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

// Service function to get an employee by ID
async function getEmployeeById(id) {
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
async function createEmployee(employeeData) {
  try {
    const newEmployee = await Employee.create(employeeData);
    return newEmployee;
  } catch (error) {
    throw new Error('Error creating employee');
  }
}

// Service function to update an employee by ID
async function updateEmployeeById(id, employeeData) {
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
async function deleteEmployeeById(id) {
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
async function getEmployeesByAgeRange(minAge, maxAge, pageNumber, limitNumber) {
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

module.exports = {
  login,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeesByAgeRange
};
