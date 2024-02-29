using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCURD_EX.Infrastructure.Interface;
using ReactCURD_EX.Model;
using static ReactCURD_EX.ComponyContext;

namespace ReactCURD_EX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IStudentrepo _studentRepository;
        private readonly ComponyContext _cc;


        public HomeController(IStudentrepo studentRepository, ComponyContext cc)
        {
            _studentRepository = studentRepository;
            _cc = cc;

        }

        //[HttpGet]

        //public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
        //{
        //    if (_cc.Students == null)
        //    {
        //        return NotFound();
        //    }
        //    return await _cc.Students.ToListAsync();
        //}

        [HttpGet]
        public async Task<IActionResult> GetStudent()
        {
            try
            {
                var Students = await _studentRepository.GetStudent();
                return Ok(Students);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("GetDegree")]
        public IActionResult GetDegree()
        {
            try
            {
                var Students = _cc.StudentDegree.ToList();
                return Ok(Students);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
       


        [HttpGet("GetCoursesByDegree/{degreeName}")]
        public ActionResult<IEnumerable<StudentCources>> GetCoursesByDegree(string degreeName)
        {
            var courses = _cc.StudentCources
                .Where(c => c.studentDegree.Name.ToUpper() == degreeName.ToUpper())
                .ToList();

            return Ok(courses);
        }
        [HttpGet("{id}")]

        public async Task<IActionResult> GetStudents(int? id)
        {
            try
            {
                var student = await _studentRepository.GetStudents(id);

                if (student == null)
                {
                    return NotFound($"Student with ID {id} not found.");
                }

                return Ok(student);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }



        [HttpPost]
        public async Task<ActionResult<int>> AddStudent([FromBody] StudentDetailsDTO studentDetails)
        {
            try
            {
                if (ModelState.IsValid)
            {
                var result = await _studentRepository.AddStudent(studentDetails);

                if (result > 0)
                {
                    return Ok("Student added successfully.");
                }

                return BadRequest("Failed to add student.");
            }
            return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

      
        [HttpPut("{id}")]
        public async Task<ActionResult> EditStudent(int id, [FromBody] StudentDetailsDTO studentDetails)
        {
            try
            {
                //// Ensure the ID in the DTO matches the route parameter
                if (id != studentDetails.Id)
                {
                    return BadRequest();
                }

                var result = await _studentRepository.EditStudent(id, studentDetails);

                if (result)
                {
                    return Ok($"Student with ID {id} updated successfully.");
                }

                return NotFound($"Student with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        [HttpDelete("deleteMultiple")]
        public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
        {
            try
            {
                int deletedCount = await _studentRepository.DeleteMultiple(ids);

                if (deletedCount == 0)
                {
                    return NotFound("No items found or deleted.");
                }

                return Ok($"Successfully deleted {deletedCount} item(s).");
            }
            catch (Exception)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Student>>> DeleteStudent(int id)
        {
            if (_cc.Students == null)
            {
                return NotFound();
            }
            var stud = await _cc.Students.FindAsync(id);
            if (stud == null)
            {
                return NotFound();
            }
            _cc.Students.Remove(stud);
            await _cc.SaveChangesAsync();
            return Ok();
        }


       
        [HttpGet("search")]
        public IActionResult SearchStudents(string searchTerm)
        {
            var filteredStudents = _studentRepository.SearchStudents(searchTerm);
            return Ok(filteredStudents);
        }
        // POST: api/Home/login
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(SignUpFormModel signUpModel)
        {
            if (ModelState.IsValid)
            {
                await _studentRepository.SignUp(signUpModel);
                return Ok(new { Message = "Signup successful." });
            }
            return BadRequest(ModelState);
        }

        // POST: api/Home/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginFormModel loginModel)
        {
            try
            {
                var user = await _studentRepository.Login(loginModel);

                if (user != null)
                {
                    return Ok(user);
                }
                else
                {
                    return NotFound("Invalid email or password");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while processing your request: {ex.Message}");
            }
        }
    }
}

