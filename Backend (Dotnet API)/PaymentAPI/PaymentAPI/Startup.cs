using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PaymentAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data;
//using TempWeb.Data;
//using Microsoft.EntityFrameworkCore.Tools;
using Microsoft.EntityFrameworkCore.Sqlite;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Swashbuckle.AspNetCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace PaymentAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.Add(new ServiceDescriptor(typeof(Data.ApiDbContext), new Data.ApiDbContext(Configuration.GetConnectionString("DefaultConnection"))));
            //services.AddDbContextPool<ApiDbContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection") ));   
            //services.AddMvc();
            services.AddControllers();
            //services.Configure<JwtConfig>(Configuration.GetSection("JwtConfig"));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PaymentAPI", Version = "v1" });

                //  var securitySchema = new OpenApiSecurityScheme
                // {
                //     Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                //     Name = "Authorization",
                //     In = ParameterLocation.Header,
                //     Type = SecuritySchemeType.Http,
                //     Scheme = "bearer",
                //     Reference = new OpenApiReference
                //     {
                //         Type = ReferenceType.SecurityScheme,
                //         Id = "Bearer"
                //     }
                // };

                // c.AddSecurityDefinition("Bearer", securitySchema);

                // var securityRequirement = new OpenApiSecurityRequirement
                // {
                //     { securitySchema, new[] { "Bearer" } }
                // };

                // c.AddSecurityRequirement(securityRequirement);
            });

            var connectionString = "server=remotemysql.com;user id=iX8a7U5geI;password=o9BYH3fU9q;database=iX8a7U5geI";
            //var connectionString = "Server=localhost;Port=3306;Database=PaymentDetailDb;Uid=root;Pwd=root;SSL Mode=None";
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 26));

            services.AddDbContext<PaymentDetailContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(connectionString, serverVersion)
            );
            
            services.AddCors();

        //     var key = Encoding.ASCII.GetBytes(Configuration["JwtConfig:Secret"]);
        //     var tokenValidationParams = new TokenValidationParameters {
        //         ValidateIssuerSigningKey = true,
        //         IssuerSigningKey = new SymmetricSecurityKey(key),
        //         ValidateIssuer = false,
        //         ValidateAudience = false,
        //         ValidateLifetime = true,
        //         RequireExpirationTime = false,
        //         ClockSkew = TimeSpan.Zero
        //     };
            
        //     services.AddSingleton(tokenValidationParams);

        //     services.AddAuthentication(options => {
        //         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //         options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        //         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //     })
        // .AddJwtBearer(jwt => {
            //var key = Encoding.ASCII.GetBytes(Configuration["JwtConfig:Secret"]);
            // jwt.SaveToken = true;
            // jwt.TokenValidationParameters = tokenValidationParams; //{
                // ValidateIssuerSigningKey = true,
                // IssuerSigningKey = new SymmetricSecurityKey(key),
                // ValidateIssuer = false,
                // ValidateAudience = false,
                // ValidateLifetime = true,
                // RequireExpirationTime = false
            //};
        // });

        // services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
        // .AddEntityFrameworkStores<ApiDbContext>();
        // }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
            options.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PaymentAPI v1"));
            }
            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

           // app.UseAuthentication();
        }
    }
}
