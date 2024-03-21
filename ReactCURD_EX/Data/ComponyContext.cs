
using Microsoft.EntityFrameworkCore;
using ReactCURD_EX.Model;
using ReactCURD_EX.Model.CalenderModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace ReactCURD_EX
{
    public class ComponyContext : DbContext
    {
        public ComponyContext(DbContextOptions<ComponyContext> options) : base(options)
        {

        }
         public DbSet<SignUpFormModel> signUpFormModels { get; set; }
        public DbSet<LoginFormModel> loginFormModels { get; set; }

        public DbSet<Cource> courses { get; set; }
        public DbSet<StudentCources> StudentCources { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<StudentDegree> StudentDegree { get; set; }
        public DbSet<Enrollment> enrollments { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentContact> studentContacts { get; set; }
        public DbSet<Event> events { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships
            // Define the foreign key relationship
            modelBuilder.Entity<StudentCources>()
                .HasOne(c => c.studentDegree)
                .WithMany(d => d.studentCources)
                .HasForeignKey(c => c.DegreeId);
            // Many-to-Many relationship between Cource and Student through Enrollment
            modelBuilder.Entity<Enrollment>()
                .HasKey(e => new { e.Id, e.CourceId });

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Student)
                .WithMany(s => s.Enrollments)
                .HasForeignKey(e => e.Id);

            modelBuilder.Entity<Enrollment>()
                .HasOne(e => e.Cource)
                .WithMany(c => c.Enrollments)
                .HasForeignKey(e => e.CourceId);

            // Optionally, add other configurations for entities here

            // Configure your entity relationships here if needed
            // modelBuilder.Entity<YourEntity>().HasOne(...);
        }

        // DTO for Student
        
        public class StudentDetailsDTO
        {
            public int Id { get; set; }
            public string? Name { get; set; }
            public string? City { get; set; }
            public int Age { get; set; }
            public string? Degree { get; set; }
            public byte[]? Photo { get; set; }
            public string? PhotoBase64 { get; set; }
            public DateTime? DOB { get; set; }
            public string? Gender { get; set; }
            public string? MobileNo { get; set; }
            public string? EmailId { get; set; }
            public bool IsActive { get; set; }
            public int CourceId { get; set; }
            public string? CourceName { get; set; }
            public string? CourceCode { get; set; }
            public string? Grade { get; set; }
            public int Credits { get; set; }
            public int EnrollmentId { get; set; }
            public DateTime? EnrollmentDate { get; set; }

        }
    }
}
