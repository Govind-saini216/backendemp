import express from 'express';
const router = express.Router();
import { CreateEmployee, getAllEmployee, getEmployeeById, deletedEmployeeById, updateEmployeeBtId } from '../Controller/Employess_controller.js';
import upload from '../Middlewear/File_Uploders.js';

// get all details by employee
router.get('/', getAllEmployee )
// create employee details
router.post('/', upload.single('profileImage') , CreateEmployee )
// update employee details
router.put('/:id', upload.single('profileImage') , updateEmployeeBtId )
// find employee details by id
router.get('/:id', getEmployeeById )
// delte employee details by id
router.delete('/:id', deletedEmployeeById )

export default router ;