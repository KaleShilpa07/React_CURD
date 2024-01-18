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
                _cc.students.Add(student);
                await _cc.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
            //return CreatedAtAction(nameof(AddStudent),new {id=student.Id},student);
    
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<Student>>> EditStudent( int id, Student ss)
        {

            if (id != ss.Id)
            {
                return BadRequest();
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
        } 
}
