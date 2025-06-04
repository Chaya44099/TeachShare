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

// CORS Configuration - מאפשר קריאות מכל מקור (אפשר לצמצם לפי הצורך)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Controllers Configuration
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Swagger Configuration (רק בסביבת פיתוח)
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

// AWS Configuration (נשאיר כמו שהיה)
builder.Services.AddDefaultAWSOptions(new AWSOptions
{
    Credentials = new BasicAWSCredentials(
        builder.Configuration["AWS:AccessKey"],
        builder.Configuration["AWS:SecretKey"]
    ),
    Region = RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"])
});
builder.Services.AddAWSService<IAmazonS3>();

var app = builder.Build();

// Seeder הרצה בזמן האתחול
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var seeder = services.GetRequiredService<DataSeeder>();
    await seeder.SeedCategoriesAsync();
}

// Swagger רק בסביבת פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TeachShare API V1");
        c.RoutePrefix = "swagger";
        c.DocExpansion(DocExpansion.None);
    });
}

// אם תרצי לשרת React סטטית (לדוגמה מתיקיית build), תוסיף את השורות הבאות:

// app.UseDefaultFiles();  
// app.UseStaticFiles();  
// app.MapFallbackToFile("index.html");

// אחרת פשוט:

app.MapGet("/", () => "TeachShare API is running...");

// Middleware Configuration
app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
