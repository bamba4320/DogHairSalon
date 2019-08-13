using LSServer.Models;
using LSServer.SQLConnector;
using LSServer.Utils;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LSServer.BL
{
    public class UserBL
    {

        public UserBL() { }

        /// <summary>
        /// add user to database
        /// </summary>
        /// <param name="UserUserName">username</param>
        /// <param name="UserPassword">password</param>
        /// <param name="UserName">name</param>
        /// <returns>Success status</returns>
        public User AddUser(User user)
        { 
            DataSet ReturnedData = SqlConnector.Select("user_username", "[BarberShop].[dbo].[Users]", $"where user_username = '{user.UserUserName}'");
            if (!DataToObj.IsRecordExist(ReturnedData))
            {
                SqlConnector.Insert("Users", $"'{user.UserUserName.Trim()}','{user.UserPassword.Trim()}','{user.UserName.Trim()}'");
                return DataToObj.DataToUser(SqlConnector.Select("*", "[BarberShop].[dbo].[Users]", $"where user_username = '{user.UserUserName}'"));
            }
            return null;
        }

        /// <summary>
        /// authenticate login attempt 
        /// </summary>
        /// <param name="UserUserName">username</param>
        /// <param name="UserPaswword">password</param>
        /// <returns>boolean value</returns>
        public bool AuthenticateUser(User user)
        {
            DataSet ReturnedData = SqlConnector.Select("user_username, user_password", "[BarberShop].[dbo].[Users]", $"where user_username = '{user.UserUserName}'");
            return DataToObj.IsValidUser(ReturnedData, user.UserUserName, user.UserPassword);
        }

        /// <summary>
        /// function to check if a Property Value is already taken 
        /// </summary>
        /// <param name="Prop"> field name</param>
        /// <param name="PropValue">fieil value</param>
        /// <returns>is prop exists (true/false)</returns>
        public bool IsPropInUse(string Prop, string PropValue)
        {
            DataSet ReturnedData = SqlConnector.Select($"{Prop}", "[BarberShop].[dbo].[Users]", $"where {Prop} = '{PropValue}'");
            return DataToObj.IsRecordExist(ReturnedData);
        }

        /// <summary>
        /// Change User username
        /// </summary>
        /// <param name="UserId">target user</param>
        /// <param name="NewUserName">new username</param>
        /// <returns>Success status</returns>
        public bool ChangeUserUsername(UpdateUserUserName user)
        {
            if (IsPropInUse("user_username", user.OldUserName) && !IsPropInUse("user_username", user.NewUserName))
                return SqlConnector.Update("Users", "user_username", $"'{user.NewUserName}'", $"where user_user_id = {user.UserId}");
            return false;
        }

        /// <summary>
        /// Change User password
        /// </summary>
        /// <param name="UserId">target user</param>
        /// <param name="NewPassword">new password</param>
        /// <returns>Success status</returns>
        public bool ChangeUserPassword(UpdateUserPassword user)
        {
            if (IsPropInUse("user_password",user.OldPassword)&&!IsPropInUse("user_password", user.NewPassword))
                return SqlConnector.Update("Users", "user_password", $"'{user.NewPassword}'", $"where user_user_id = {user.UserId}");
            return false;
        }

        /// <summary>
        /// Change User name
        /// </summary>
        /// <param name="UserId">target user</param>
        /// <param name="NewName">new name</param>
        /// <returns>Success status</returns>
        /// 
        public bool ChangeUserName(UpdateUserName user)
        {
            if (IsPropInUse("user__name", user.OldName)&&!IsPropInUse("user__name", user.NewName))
                return SqlConnector.Update("Users", "user__name", $"'{user.NewName}'", $"where user_user_id = {user.UserId}");
            return false;
        }
       
        public User GetUserByUserName(string Username) {

            DataSet ReturnedData = SqlConnector.Select("*", "Users", $"where user_username = '{Username}' ");
            return DataToObj.DataToUser(ReturnedData);
        }

        public User GetUserByUserId(int UserId)
        {

            DataSet ReturnedData = SqlConnector.Select("*", "Users", $"where user_user_id = {UserId} ");
            return DataToObj.DataToUser(ReturnedData);
        }

        public bool DeleteUser(int UserId)
        {
            new AppointmentBL().CancelAllUserAppointments(UserId);
            return SqlConnector.Delete("Users", $"where user_user_id = {UserId}");
        }
    }


}
