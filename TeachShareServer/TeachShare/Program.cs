using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Text;
using System.Text.Json.Serialization;
using TeachShare.Api.Entities;
using TeachShare.Core;
using TeachShare.Core.Irepositories;
using TeachShare.Core.Iservices;
using TeachShare.Data;
using TeachShare.Data.Repository;
using TeachShare.Service.Services;
using Amazon.S3;
using Amazon.Runtime;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using TeachShare.Data.Seed;
using TeachShare.Api;

var builder = WebApplication.CreateBuilder(args);
//var credentials = new BasicAWSCredentials(
//    builder.Configuration["AWS:AccessKey"],
//    builder.Configuration["AWS:SecretKey"]
//);
//var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]); // בדקי שהאזור נכון

//var s3Client = new AmazonS3Client(credentials, region);

//builder.Services.AddSingleton<IAmazonS3>(s3Client);
// AWS S3 Configuration
//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var awsConfig = builder.Configuration.GetSection("AWS");
//    var credentials = new BasicAWSCredentials(
//        awsConfig["AccessKey"],
//        awsConfig["SecretKey"]
//    );

//    var regionEndpoint = RegionEndpoint.GetBySystemName(awsConfig["Region"]);

//    return new AmazonS3Client(credentials, regionEndpoint);
//});
//builder.Services.AddAWSService<IAmazonS3>();
// Add bucket name as a singleton service for easy injectionמה זה???
//builder.Services.AddSingleton(sp =>
//    builder.Configuration.GetValue<string>("AWS:BucketName")
//);
var connectionString = builder.Configuration.GetConnectionString("TeachShare");

// DataContext Configuration
builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.Parse("8.0.32-mysql")));

// Dependency Injection for Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRatingRepository, RatingRepository>();
builder.Services.AddScoped<IColleltionRepository, CollectionRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IMetirialRepository, MaterialRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();

// Dependency Injection for Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRatingService, RatingService>();
builder.Services.AddScoped<ICollectionService, CollectionService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IMaterialService, MaterialService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddScoped<DataSeeder>();

// AutoMapper Configuration
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfilePostModel));

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        //policy.WithOrigins("http://localhost:3000", "http://localhost:3001") // הוספת גם את 3001
        //      .AllowAnyMethod()
        //      .AllowAnyHeader()
        //      .AllowCredentials();
        policy.SetIsOriginAllowed(_ => true)
        .AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});
// Controllers Configuration
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Swagger Configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

// Authentication Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
    };
});
builder.Services.AddDefaultAWSOptions(new AWSOptions
{
    Credentials = new BasicAWSCredentials(
        builder.Configuration["AWS:AccessKey"],
        builder.Configuration["AWS:SecretKey"]
    ),
    Region = RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"])
});

// רישום שירות S3
builder.Services.AddAWSService<IAmazonS3>();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var seeder = services.GetRequiredService<DataSeeder>();
    await seeder.SeedCategoriesAsync();
}
// Swagger and Development Configuration
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TeachShare API V1");
        c.RoutePrefix = "swagger";
        c.DocExpansion(DocExpansion.None);
    });
}

// Middleware Configuration

app.MapGet("/", () => Results.Redirect("/swagger")).ExcludeFromDescription();
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();