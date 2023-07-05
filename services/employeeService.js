import Employee from '../models/employee.js';
import Op from 'sequelize';
import jwt from 'jsonwebtoken';

class employeeService {

  // Service function to login
  static async login(username, password) {
    if (username === 'admin' && password === 'password') {
      // throw new CustomError("Check", "Just a sample check");
      // throw new Error()
      // const token = jwt.sign({ username }, 'Qwerty123');
      const token=null;
      if(token===null){
        throw new Error("token not generated")
      }
      else{
        return token;
      }
      
    } else {
      // res.status(401).json({ error: 'Invalid credentials' });
      throw new CustomError("Check", "Just a sample check");
    }
  }

  // Service function to get an employee by ID
  static async getEmployeeById(id) {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
  }

  // Service function to create a new employee
  static async createEmployee(employeeData) {
      const newEmployee = await Employee.create(employeeData);
      if(!newEmployee){
        throw new Error("Employee not created")
      }
      else{
        return newEmployee;
      }   
  }

  // Service function to update an employee by ID
  static async updateEmployeeById(id, employeeData) {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      const updatedEmployee = await employee.update(employeeData);
      if(!updatedEmployee){
        throw new Error("Emplayee not updated")
      }
      else{
        return updatedEmployee;
      }   
  }

  // Service function to delete an employee by ID
  static async deleteEmployeeById(id) {
      const employee = await Employee.findByPk(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      await employee.destroy();
  }

  // Service function to get employees by age range
  static async getEmployeesByAgeRange(minAge, maxAge, pageNumber, limitNumber) {
    console.log("hello");
    const offset = (pageNumber - 1) * limitNumber;
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
          limit: limitNumber
        })
        console.log(result)
        return result;
      }
  }
}

export default employeeService;

export class CustomError extends Error {
  constructor(name, message) {
    super(message, message)
    this.name = name;
    this.message = message;
  }
}
