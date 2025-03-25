using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TeachShare.Api.Entities;
using TeachShare.Core.DTOs;
using TeachShare.Core.Iservices;

namespace TeachShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // POST: api/user/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserPostModel user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            var userDto = _mapper.Map<UserDTO>(user);
            var (token, registeredUser) = await _userService.RegisterAsync(userDto);

            if (registeredUser == null)
            {
                return Conflict("User registration failed.");
            }

            return Ok(new { Token = token, User = registeredUser/*_mapper.Map<UserPostModel>( registeredUser)*/ });
        }

        // POST: api/user/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO login)
        {
            if (login == null)
                return BadRequest("User data is required.");

            var (token, user) = await _userService.LoginAsync(login);
            if (user == null)
                return Unauthorized();

            return Ok(new { Token = token,User=user /*User = _mapper.Map<UserPostModel> (user)*/});
        }

        // GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, UserDTO userDto)
        {
            if (id != userDto.Id)
            {
                return BadRequest("User ID mismatch");
            }

            var updatedUser = await _userService.UpdateUserAsync(userDto);
            return Ok(updatedUser);
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
