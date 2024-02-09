using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCURD_EX.Infrastructure.Interface;
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

        //[HttpGet("{id}")]

        //public async Task<ActionResult<Student>> GetStudents(int? id)
        //{
        //    if (_cc.Students == null)
        //    { return NotFound(); }

        //    var student = await _cc.Students.FindAsync(id);
        //    if (student == null)
        //    {
        //        return NotFound();
        //    }
        //    return student;
        //}

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


        //[HttpPost]
        //public async Task<ActionResult<IEnumerable<Student>>> AddStudent(Student student)
        //{
        //    try
        //    {

        //        // Convert base64 string to byte array and set the Photo property
        //        if (!string.IsNullOrEmpty(student.PhotoBase64))
        //        {
        //            student.Photo = Convert.FromBase64String(student.PhotoBase64);
        //        }

        //        _cc.Students.Add(student);
        //        await _cc.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException ex)
        //    {
        //        Console.WriteLine($"Concurrency Exception: {ex.Message}");
        //        throw;
        //    }
        //    return Ok();
        //}

        [HttpPost]
        public async Task<ActionResult<int>> AddStudent([FromBody] StudentDetailsDTO studentDetails)
        {
            try
            {
                var result = await _studentRepository.AddStudent(studentDetails);

                if (result > 0)
                {
                    return Ok("Student added successfully.");
                }

                return BadRequest("Failed to add student.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        //[HttpPut("{id}")]
        //public async Task<ActionResult<IEnumerable<Student>>> EditStudent(int id, Student ss)
        //{
        //    if (id != ss.Id)
        //    {
        //        return BadRequest();
        //    }

        //    // Convert base64 string to byte array and set the Photo property
        //    if (!string.IsNullOrEmpty(ss.PhotoBase64))
        //    {
        //        ss.Photo = Convert.FromBase64String(ss.PhotoBase64);
        //    }

        //    _cc.Entry(ss).State = EntityState.Modified;
        //    try
        //    {
        //        await _cc.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        throw;
        //    }
        //    return Ok();
        //}
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


        //[HttpGet("search")]
        //public IActionResult SearchStudents(string searchTerm)
        //{
        //    var filteredStudents = _.Students
        //        .Where(s => s.Name.Contains(searchTerm) || s.Standard.Contains(searchTerm) || s.Age.Contains(searchTerm) || s.City.Contains(searchTerm) || s.MobileNo.Contains(searchTerm) || s.Gender.Contains(searchTerm) || s.EmailId.Contains(searchTerm))
        //        .ToList();

        //    return Ok(filteredStudents);
        //}




        [HttpGet("search")]
        public IActionResult SearchStudents(string searchterm)
        {
            var filteredStudents = _studentRepository.SearchStudents(searchterm);
            return Ok(filteredStudents);
        }
    }



}

