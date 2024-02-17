const employee = [
  { id: '1', name: 'Mohamed Sayed' },
  { id: '2', name: 'Abd elrahman Ahmed' },
  { id: '3', name: 'Karim Magdy' }
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  const index = employee.findIndex((e) => e.id === employeeId);
  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted ' });
  } else {
    res.status(404).json({ message: 'employee not found' });
  }

};


// TODO
exports.createEmployee = async (req, res, next) => {
  const newEmp = req.body;
  employee.push(newEmp);
  res.status(201).json({ message: 'Employee created successfully', data: newEmp });
};




