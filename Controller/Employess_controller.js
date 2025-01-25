import EmployeModel from "../Model/Employee_model.js";

const CreateEmployee = async (req, res) => {
     try {
          const body = req.body;
          body.profileImage = req.file ? req.file?.path : null;
          const emp = new EmployeModel(body);
          await emp.save()
          res.status(201).json({ message: "Employee Created", success: true })


     } catch (error) {
          res.status(500).json({
               message: "internal server error",
               success: false,
               error: error
          })
     }
}
const updateEmployeeBtId = async (req, res) => {
     try {
          const { id } = req.params;
          const { name, email, phone, department, salary } = req.body;
          const updatedata = { name, email, phone, department, salary, updatedAt: new Date() }
          if (req.file) { updatedata.profileImage = req.file.path }

          const EmployeUpdate = await EmployeModel.findByIdAndUpdate(id, updatedata, { new: true })
          res.status(201).json({ message: "Employee Update Data", success: true, EmployeUpdate })
     } catch (error) {
          res.status(500).json({
               message: "employee update error",
               success: false,
               error: error
          })
     }
}

const getAllEmployee = async (req, res) => {
     try {
          // this is page functionality only
          let { page, limit, search } = req.query;
         
          page = parseInt(page) || 1;
          limit = parseInt(limit) || 5;

          const skip = (page - 1) * limit;

          // this is search functionality
          // ager kisi user ne search nhi kra hy to  searchCriteria ka object return kr do

               // search: मान लें कि कोई यूज़र किसी नाम को सर्च करता है।
               // $regex: यह MongoDB की एक विशेषता है, जो दिए गए नाम को ढूंढने में मदद करती है।
               // $options: 'i': इसका मतलब है कि सर्च "case insensitive" होगा(छोटे - बड़े अक्षरों का फर्क नहीं होगा)।          

          let searchCriteria = {};
          // ager kisi user ne search kra hy to searchCriteria ka yeh object return kr do
          if (search) {
               searchCriteria = {
                    // $regex and $options yeh nodjs ki by default property hy
                    name:{ $regex: search, $options: 'i'} // i mtlb hy ki case insensitiv hy
               };
          }
          

          // Optimize Query with Timeout Handling
          // countDocuments(searchCriteria): यह डेटाबेस से उन कर्मचारियों की कुल गिनती करता है जो searchCriteria से मेल खाते हैं।
          // maxTimeMS(15000): अगर यह क्वेरी 15 सेकंड से ज्यादा समय लेती है, तो इसे रोक दिया जाएगा।
          const totalEmployee = await EmployeModel.countDocuments(searchCriteria).maxTimeMS(15000); // Set a max time for query execution


          // find(searchCriteria): यह सर्च के आधार पर कर्मचारियों की सूची निकालता है।
          // skip(skip): पेजिनेशन के लिए, पहले के डेटा को स्किप कर देता है।
          // limit(limit): एक बार में केवल limit संख्या के डेटा को निकालता है।
          // sort({ updatedAt: -1 }): डेटा को "Updated At" समय के अनुसार सबसे नया डेटा पहले दिखाता है।
          const employees = await EmployeModel.find(searchCriteria)
               .skip(skip)
               .limit(limit)
               .sort({ updatedAt: -1 });

          // totalPages: यह पता करता है कि कुल डेटा को दिखाने के लिए कितने पेज चाहिए।
          const totalPages = Math.ceil(totalEmployee / limit);

          res.status(200).json({
               message: 'Get Employees All Data',
               success: true,
               data: {
                    employees,
                    pagination: {
                         totalEmployee,
                         currentPage: page,
                         totalPages,
                         pageSize: limit
                    }
               }
          });
     } catch (error) {
          res.status(500).json({
               message: 'Internal server error',
               success: false,
               error: error.message
          });
     }
};



const getEmployeeById = async (req, res) => {
     try {
          const { id } = req.params;
          const emp = await EmployeModel.findOne({ _id: id });
          res.status(200).json({ message: "Get Employee Details", success: true, employee: emp })


     } catch (error) {
          res.status(500).json({
               message: "Get Employe Details ",
               success: false,
               error
          })
     }
}
const deletedEmployeeById = async (req, res) => {
     try {
          const { id } = req.params;
          const emp = await EmployeModel.findByIdAndDelete({ _id: id });
          res.status(200).json({ message: "delete Employee Details", success: true, employee: emp })


     } catch (error) {
          res.status(500).json({
               message: "deleted Employe Details ",
               success: false,
               error
          })
     }
}



export { CreateEmployee, getAllEmployee, getEmployeeById, deletedEmployeeById, updateEmployeeBtId };