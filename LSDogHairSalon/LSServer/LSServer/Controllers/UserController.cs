using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LSServer.BL;
using LSServer.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace LSServer.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserBL _userBL;

        public UserController()
        {
            _userBL = new UserBL();
        }

        /// <summary>
        /// function to Add user to the database
        /// </summary>
        /// <param name="UserUserName">user username</param>
        /// <param name="UserPassword">user password</param>
        /// <param name="UserName">user first and last name</param>
        /// <returns>action result</returns>
        [HttpPost]
        [Route("addUser")]
        public ActionResult<User> AddUser([FromBody] User user)
        {
            return _userBL.AddUser(user);
          
        }

        /// <summary>
        /// function to autenticate log in attempt
        /// </summary>
        /// <param name="UserUserName">User username</param>
        /// <param name="UserPassword">User password</param>
        /// <returns>action result</returns>
        [HttpPost]
        [Route("Authenticate")]
        public ActionResult<AuthenticationResult> AuthenticateUser([FromBody] User user)
        {
            AuthenticationResult res = new AuthenticationResult
            {
                AuthenticationChecked = _userBL.AuthenticateUser(user),
                obj = _userBL.GetUserByUserName(user.UserUserName)
            };
            return res;
        }

        [HttpPost]
        [Route("ChangeUsername")]
        public ActionResult<MyBooleanResult> ChangeUserUsername([FromBody]UpdateUserUserName user)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _userBL.ChangeUserUsername(user)
            };
            return res;
        }

        [HttpPost]
        [Route("ChangePassword")]
        public ActionResult<MyBooleanResult> ChangeUserPassword([FromBody]UpdateUserPassword user)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _userBL.ChangeUserPassword(user)
            };
            return res; 
        }

        [HttpPost]
        [Route("ChangeName")]
        public ActionResult<MyBooleanResult> ChangeUserName([FromBody]UpdateUserName user)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _userBL.ChangeUserName(user)
            };
            return res;

        }

        [HttpPost]
        [Route("ValidUsername")]
        public ActionResult<MyBooleanResult> IsValidUsername([FromBody] User user)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = !_userBL.IsPropInUse("user_usernmae",user.UserUserName)
            };
            return res;
        }

        [HttpPost]
        [Route("GetUserById")]
        public ActionResult<User> GetUserByProp([FromQuery]int UserId)
        {
            return _userBL.GetUserByUserId(UserId);
        }

        [HttpPost]
        [Route("DeleteUser")]
        public ActionResult<MyBooleanResult> DeleteUser([FromQuery]int Userid)
        {
            MyBooleanResult res = new MyBooleanResult
            {
                ResultValue = _userBL.DeleteUser(Userid)
            };
            return res;
        }
    }
}