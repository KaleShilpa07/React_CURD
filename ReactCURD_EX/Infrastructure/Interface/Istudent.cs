using ReactCURD_EX.Model;
using static ReactCURD_EX.ComponyContext;

namespace ReactCURD_EX.Infrastructure.Interface
{
    public interface IStudentrepo
    {
        Task<LoginFormModel> Login(LoginFormModel loginModel);
        Task SignUp(SignUpFormModel signUpModel);
        Task<IEnumerable<StudentDetailsDTO>> GetStudent();
        Task<StudentDetailsDTO> GetStudents(int? id);
        Task<int> AddStudent(StudentDetailsDTO studentDetails);
        Task<int> AddContact(StudentContact studentContact);
        Task<bool> EditStudent(int id, StudentDetailsDTO studentDetails);
        List<StudentDetailsDTO> SearchStudents(string searchTerm);
        Task<int> DeleteMultiple(List<int> ids);
    }
}
