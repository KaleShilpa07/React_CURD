﻿using Microsoft.EntityFrameworkCore;
using ReactCURD_EX.Infrastructure.Interface;
using ReactCURD_EX.Model;
using static ReactCURD_EX.ComponyContext;

namespace ReactCURD_EX.Infrastructure.Repository
{
    public class StudentRepo : IStudentrepo
    {
        private readonly ComponyContext _cc;

        public StudentRepo(ComponyContext context)
        {
            _cc = context;
        }

        public async Task<int> AddStudent(StudentDetailsDTO studentDetails)
        {
            using (var transaction = _cc.Database.BeginTransaction())
            {
                try
                {
                    // Create a new Student entity
                    var student = new Student
                    {
                        Name = studentDetails.Name,
                        City = studentDetails.City,
                        Age = studentDetails.Age,
                        Standard = studentDetails.Standard,
                        Photo = studentDetails.Photo,
                        DOB = studentDetails.DOB,
                        Gender = studentDetails.Gender,
                        MobileNo = studentDetails.MobileNo,
                        EmailId = studentDetails.EmailId,
                        IsActive = studentDetails.IsActive,
                        // Set other properties accordingly
                    };

                    // Save the student data to the Student table
                    _cc.Students.Add(student);
                    await _cc.SaveChangesAsync();

                    // Create a new Cource entity
                    var course = new Cource
                    {
                        CourceName = studentDetails.CourceName,
                        CourceCode = studentDetails.CourceCode,
                        Credits = studentDetails.Credits,
                        Grade = studentDetails.Grade
                        // Set other properties accordingly
                    };

                    // Save the course data to the Cource table
                    _cc.courses.Add(course);
                    await _cc.SaveChangesAsync();

                    // Create a new Enrollment entity
                    var enrollment = new Enrollment
                    {
                        Id = student.Id,
                        CourceId = course.CourceId,
                        EnrollmentDate = studentDetails.EnrollmentDate
                        // Set other properties accordingly
                    };

                    // Save the enrollment data to the Enrollment table
                    _cc.enrollments.Add(enrollment);
                    await _cc.SaveChangesAsync();

                    // Commit the transaction
                    transaction.Commit();

                    // Return the student ID
                    return student.Id;
                }
                catch (Exception)
                {
                    // An error occurred, roll back the transaction
                    transaction.Rollback();
                    throw;  // Rethrow the exception to signal failure
                }
            }
        }

        public async Task<IEnumerable<StudentDetailsDTO>> GetStudent()
        {
            var studentsWithDetails = await _cc.Students
                .Include(s => s.Enrollments)
                .ThenInclude(e => e.Cource)
                .ToListAsync();

            var result = studentsWithDetails.Select(s => new StudentDetailsDTO
            {
                Id=s.Id,
                Name = s.Name,
                City = s.City,
                Age = s.Age,
                Standard = s.Standard,
                Photo = s.Photo,
                DOB = s.DOB,
                Gender = s.Gender,
                MobileNo = s.MobileNo,
                EmailId = s.EmailId,
                IsActive = s.IsActive,
                CourceName = s.Enrollments?.FirstOrDefault()?.Cource?.CourceName,
                Grade = s.Enrollments?.FirstOrDefault()?.Cource?.Grade,
                CourceCode = s.Enrollments?.FirstOrDefault()?.Cource?.CourceCode,
                Credits = s.Enrollments?.FirstOrDefault()?.Cource?.Credits ?? 0,
                EnrollmentDate = s.Enrollments?.FirstOrDefault()?.EnrollmentDate ?? DateTime.MinValue,
            }).ToList();

            return result;
        }
        public async Task<bool> EditStudent(int id, StudentDetailsDTO student)
        {
            // Start a database transaction
            using (var transaction = _cc.Database.BeginTransaction())
            {
                try
                {
                    // Retrieve the existing student from the database
                    var existingStudent = await _cc.Students.FindAsync(id);

                    if (existingStudent == null)
                    {
                        // Student not found
                        return false;
                    }

                    // Update the existing student properties

                    if (!string.IsNullOrEmpty(student.PhotoBase64))
                    {
                        student.Photo = Convert.FromBase64String(student.PhotoBase64);
                    }
                    existingStudent.Id=student.Id;
                    existingStudent.Photo = Convert.FromBase64String(student.PhotoBase64);
                    existingStudent.Name = student.Name;
                    existingStudent.City = student.City;
                    existingStudent.Age = student.Age;
                    existingStudent.Standard = student.Standard;
                    existingStudent.DOB = student.DOB;
                    existingStudent.Gender = student.Gender;
                    existingStudent.MobileNo = student.MobileNo;
                    existingStudent.EmailId = student.EmailId;
                    existingStudent.IsActive = student.IsActive;

                    // Update the student data in the Student table
                    _cc.Students.Update(existingStudent);
                    await _cc.SaveChangesAsync();

                    // Retrieve the existing enrollment for the student from the database
                    var existingEnrollment = await _cc.enrollments
                        .Where(e => e.Id == id)
                        .FirstOrDefaultAsync();

                    if (existingEnrollment == null)
                    {
                        // Enrollment not found
                        return false;
                    }

                    // Update the existing enrollment properties
                    existingEnrollment.EnrollmentDate = student.EnrollmentDate;

                    // Update the enrollment data in the Enrollment table
                    _cc.enrollments.Update(existingEnrollment);
                    await _cc.SaveChangesAsync();

                    // Retrieve the existing course for the enrollment from the database
                    var existingCourse = await _cc.courses.FindAsync(existingEnrollment.CourceId);

                    if (existingCourse == null)
                    {
                        // Course not found
                        return false;
                    }

                    // Update the existing course properties
                    existingCourse.CourceName = student.CourceName;
                    existingCourse.CourceCode = student.CourceCode;
                    existingCourse.Credits = student.Credits;

                    // Update the course data in the Course table
                    _cc.courses.Update(existingCourse);
                    await _cc.SaveChangesAsync();

                    // Commit the transaction
                    transaction.Commit();

                    // Return true indicating success
                    return true;
                }
                catch (Exception)
                {
                    // An error occurred, roll back the transaction
                    transaction.Rollback();
                    throw;  // Rethrow the exception to signal failure
                }
            }
        }

        public async Task<StudentDetailsDTO> GetStudents(int? id)
        {
            var studentWithDetails = await _cc.Students
             .Include(s => s.Enrollments)
             .ThenInclude(e => e.Cource)
             .FirstOrDefaultAsync(s => s.Id == id);

            if (studentWithDetails == null)
            {
                // Handle case where student is not found
                return null;
            }

            var result = new StudentDetailsDTO
            {
                Id = studentWithDetails.Id,
                Name = studentWithDetails.Name,
                City = studentWithDetails.City,
                Age = studentWithDetails.Age,
                Standard = studentWithDetails.Standard,
                Photo = studentWithDetails.Photo,
                DOB = studentWithDetails.DOB,
                Gender = studentWithDetails.Gender,
                MobileNo = studentWithDetails.MobileNo,
                EmailId = studentWithDetails.EmailId,
                IsActive = studentWithDetails.IsActive,
                CourceName = studentWithDetails.Enrollments?.FirstOrDefault()?.Cource?.CourceName,
                Grade = studentWithDetails.Enrollments?.FirstOrDefault()?.Cource?.Grade,
                CourceCode = studentWithDetails.Enrollments?.FirstOrDefault()?.Cource?.CourceCode,
                Credits = studentWithDetails.Enrollments?.FirstOrDefault()?.Cource?.Credits ?? 0,
                EnrollmentDate = studentWithDetails.Enrollments?.FirstOrDefault()?.EnrollmentDate ?? DateTime.MinValue,
            };

            return result;
        }

        public List<StudentDetailsDTO> SearchStudents(string searchterm)
        {
            var filteredStudents = _cc.enrollments
      .Where(s => s.Cource.CourceName.Contains(searchterm) || s.Student.Name.Contains(searchterm))
      .Select(s => new StudentDetailsDTO
      { Name= s.Student.Name,
          City = s.Student.City,
          Age = s.Student.Age,
          Standard = s.Student.Standard,
          DOB = s.Student.DOB,
          Photo = s.Student.Photo,
          Gender = s.Student.Gender,
          MobileNo = s.Student.MobileNo,
          EmailId = s.Student.EmailId,
          IsActive = s.Student.IsActive,
          CourceName = s.Cource.CourceName,
          CourceCode = s.Cource.CourceCode,
          Credits = s.Cource.Credits,
          EnrollmentDate = s.EnrollmentDate,
          Grade = s.Cource.Grade
      })
      .ToList();

            return filteredStudents;
        }
    }
}