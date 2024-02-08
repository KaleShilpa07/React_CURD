using Microsoft.EntityFrameworkCore;
using ReactCURD_EX;
using ReactCURD_EX.Infrastructure.Interface;
using ReactCURD_EX.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IStudentrepo, StudentRepo>();
builder.Services.AddDbContext<ComponyContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultCon"));
});
// Error(Not fetch data into the table) :Access to XMLHttpRequest at 'https://localhost:7195/api/home'
//from origin 'https://localhost:44494'
//has been blocked by CORS policy:
//No 'Access-Control-Allow-Origin' header is present on the requested resource.
//Solution=>
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
