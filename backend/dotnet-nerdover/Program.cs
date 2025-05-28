using dotnet_nerdover.Data;
using Google.Cloud.Firestore;
using Google.Cloud.Storage.V1;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevServer", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite("Data Source=nerdover.db");
});

builder.Services.AddSingleton(p => FirestoreDb.Create("nerdover"));
builder.Services.AddSingleton(p => StorageClient.Create());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularDevServer");

app.UseAuthorization();

app.MapControllers();

app.Run();
