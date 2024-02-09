
using Microsoft.EntityFrameworkCore;
using ReactCURD_EX.Model;

namespace ReactCURD_EX
{
    public class ComponyContext : DbContext
    {
        public ComponyContext(DbContextOptions<ComponyContext> options) : base(options)
        {

        }
         public DbSet<Skill> skills { get; set; }
        public DbSet<Registration> registrations { get; set; }

        public DbSet<Cource> courses { get; set; }
        public DbSet<Enrollment> enrollments { get; set; }
        public DbSet<Student> Students { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {  // Configure relationships

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
            public string? Age { get; set; }
            public string? Standard { get; set; }
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
            public DateTime EnrollmentDate { get; set; }

        }
    }
}
