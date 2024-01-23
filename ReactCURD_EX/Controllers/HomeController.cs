using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ReactCURD_EX.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ComponyContext _cc;
        public HomeController(ComponyContext cc)
        {
            _cc = cc;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
        {
            if (_cc.students == null) {
                return NotFound();
            }
            return await _cc.students.ToListAsync();
        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Student>> GetStudent(int? id)
        {
            if (_cc.students == null)
            { return NotFound(); }

            var student = await _cc.students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return student;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Student>>> AddStudent(Student student)
        {
            try
            {
                
                // Convert base64 string to byte array and set the Photo property
                if (!string.IsNullOrEmpty(student.PhotoBase64))
                {
                    student.Photo = Convert.FromBase64String(student.PhotoBase64);
                }

                _cc.students.Add(student);
                await _cc.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Console.WriteLine($"Concurrency Exception: {ex.Message}");
                throw;
            }
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<Student>>> EditStudent(int id, Student ss)
        {
            if (id != ss.Id)
            {
                return BadRequest();
            }

            // Convert base64 string to byte array and set the Photo property
            if (!string.IsNullOrEmpty(ss.PhotoBase64))
            {
                ss.Photo = Convert.FromBase64String(ss.PhotoBase64);
            }

            _cc.Entry(ss).State = EntityState.Modified;
            try
            {
                await _cc.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Student>>> DeleteStudent(int id)
        {
            if (_cc.students==null)
            {
                return NotFound();
            }
            var stud=await _cc.students.FindAsync(id);
            if (stud==null)
            {
                return NotFound();
            }
            _cc.students.Remove(stud);
            await _cc.SaveChangesAsync();
            return Ok();    
        }


        [HttpGet("search")]
        public IActionResult SearchStudents(string searchTerm)
        {
            var filteredStudents = _cc.students
                .Where(s => s.Name.Contains(searchTerm) || s.Standard.Contains(searchTerm) || s.Age.Contains(searchTerm) || s.City.Contains(searchTerm) || s.MobileNo.Contains(searchTerm) || s.Gender.Contains(searchTerm) || s.EmailId.Contains(searchTerm) )
                .ToList();

            return Ok(filteredStudents);
        }
    }

} 

