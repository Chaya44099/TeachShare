using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TeachShare.Api.Entities;
using TeachShare.Core.DTOs;
using TeachShare.Core.Iservices;
using TeachShare.Service.Services;

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

            var UserDto = _mapper.Map<UserDto>(user);
            var (token, registeredUser) = await _userService.RegisterAsync(UserDto);

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

            return Ok(new { Token = token, User = user /*User = _mapper.Map<UserPostModel> (user)*/});
        }

        // GET: api/user
        //[Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null)
        {
            var result = await _userService.GetUsersAsync(page, pageSize, search);
            return Ok(result);
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(UserPostModel userPostModel)
        {
            var userDto = _mapper.Map<UserDto>(userPostModel);
            var createdUser = await _userService.CreateUserAsync(userDto);
            return Ok(createdUser);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> UpdateUser(int id, UserPostModel userPostModel)
        {
            var userDto = _mapper.Map<UserDto>(userPostModel);
            userDto.Id = id;
            var updatedUser = await _userService.UpdateUserAsync(userDto);
            if (updatedUser == null)
                return NotFound();
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
