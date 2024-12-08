using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventKey.Server.Infrastructure;
using EventKey.Server.Models;
using Microsoft.AspNetCore.Identity.Data;

namespace EventKey.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private readonly DataContext _context;

        public SignUpController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddUserOrEventManager([FromBody] SignUpViewModel model)
        {
            if (model.UserType == "User")
            {
                var user = new User()
                {
                    FullName = model.FullName,
                    Age = model.Age,
                    Gender = model.Gender,
                    Email = model.Email,
                    Password = model.Password,
                    PhoneNumber = model.PhoneNumber,
                    Address = model.Address,
                };

                _context.User.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            else if (model.UserType == "EventManager")
            {
                var eventManager = new EventManager()
                {
                    FullName = model.FullName,
                    Age = model.Age,
                    Gender = model.Gender,
                    CompanyName = model.CompanyName,
                    EventType = model.EventType,
                    Email = model.Email,
                    Password = model.Password,
                    PhoneNumber = model.PhoneNumber,
                    Address = model.Address,
                };

                _context.EventManager.Add(eventManager);
                await _context.SaveChangesAsync();
                return Ok(eventManager);
            }
            else
            {
                return BadRequest("Invalid user type");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersOrEventManagers([FromQuery] string userType)
        {
            if (userType == "User")
            {
                var users = await _context.User.ToListAsync();
                return Ok(users);
            }
            else if (userType == "EventManager")
            {
                var eventManagers = await _context.EventManager.ToListAsync();
                return Ok(eventManagers);
            }
            else
            {
                return BadRequest("Invalid user type");
            }
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LogInRequest request)
        {
            // Validate the incoming request
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { Message = "Invalid request. Email and Password are required." });
            }

            if (string.IsNullOrEmpty(request.LoginAs))
            {
                return BadRequest(new { Message = "Please specify login type as 'User' or 'EventManager'." });
            }

            Console.WriteLine($"Login Request - Type: {request.LoginAs}, Email: {request.Email}");

            if (request.LoginAs == "User")
            {
                // Validate against User table
                var user = _context.User
                    .FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);

                if (user == null)
                {
                    return Unauthorized(new { Message = "Invalid User credentials." });
                }

                return Ok(new
                {
                    Message = "User login successful.",
                    UserId = user.Id,
                    UserName = user.FullName
                });
            }
            else if (request.LoginAs == "EventManager")
            {
                // Validate against EventManager table
                var eventManager = _context.EventManager
                    .FirstOrDefault(em => em.Email == request.Email && em.Password == request.Password);

                if (eventManager == null)
                {
                    return Unauthorized(new { Message = "Invalid Event Manager credentials." });
                }

                return Ok(new
                {
                    Message = "Event Manager login successful.",
                    EventManagerId = eventManager.Id,
                    EventManagerName = eventManager.FullName
                });
            }

            // Invalid login type
            return BadRequest(new { Message = "Invalid login type. Must be 'User' or 'EventManager'." });
        }


        [HttpPut("{FullName}")]
        public async Task<IActionResult> UpdateUserOrEventManager(string FullName, [FromBody] SignUpViewModel model)
        {
            if (model.UserType == "User")
            {
                var user = await _context.User.FirstOrDefaultAsync(u => u.FullName == FullName);
                if (user == null) return NotFound("User not found");

                // Update user details
                user.FullName = model.FullName ?? user.FullName;
                user.Age = model.Age;
                user.Gender = model.Gender;
                user.Email = model.Email ?? user.Email;
                user.Password = model.Password; // Consider hashing the password
                user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;
                user.Address = model.Address ?? user.Address;

                await _context.SaveChangesAsync();
                return Ok(user);
            }
            else if (model.UserType == "EventManager")
            {
                var eventManager = await _context.EventManager.FirstOrDefaultAsync(e => e.FullName == FullName);
                if (eventManager == null) return NotFound("Event Manager not found");

                // Update event manager details
                eventManager.FullName = model.FullName ?? eventManager.FullName;
                eventManager.Age = model.Age;
                eventManager.Gender = model.Gender;
                eventManager.CompanyName = model.CompanyName ?? eventManager.CompanyName;
                eventManager.EventType = model.EventType ?? eventManager.EventType;
                eventManager.Email = model.Email ?? eventManager.Email;
                eventManager.Password = model.Password; // Consider hashing the password
                eventManager.PhoneNumber = model.PhoneNumber ?? eventManager.PhoneNumber;
                eventManager.Address = model.Address ?? eventManager.Address;

                await _context.SaveChangesAsync();
                return Ok(eventManager);
            }
            else
            {
                return BadRequest("Invalid user type");
            }
        }
        [HttpDelete("{FullName}")]
        public async Task<IActionResult> DeleteUserOrEventManager(string FullName, [FromQuery] string userType)
        {
            if (string.IsNullOrWhiteSpace(FullName) || string.IsNullOrWhiteSpace(userType))
            {
                return BadRequest("FullName and UserType are required.");
            }

            if (userType == "User")
            {
                var user = await _context.User.FirstOrDefaultAsync(u => u.FullName == FullName);
                if (user == null)
                {
                    return NotFound($"User with FullName '{FullName}' not found.");
                }

                _context.User.Remove(user);
                await _context.SaveChangesAsync();
                return Ok($"User with FullName '{FullName}' has been deleted.");
            }
            else if (userType == "EventManager")
            {
                var eventManager = await _context.EventManager.FirstOrDefaultAsync(e => e.FullName == FullName);
                if (eventManager == null)
                {
                    return NotFound($"Event Manager with FullName '{FullName}' not found.");
                }

                _context.EventManager.Remove(eventManager);
                await _context.SaveChangesAsync();
                return Ok($"Event Manager with FullName '{FullName}' has been deleted.");
            }
            else
            {
                return BadRequest("Invalid user type. Valid values are 'User' or 'EventManager'.");
            }
        }

    }
}
