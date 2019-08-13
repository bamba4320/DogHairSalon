using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
namespace LSServer.SQLConnector
{
    public class SqlConnector
    {
        public static string ConnectionString = "Data Source=DESKTOP-N7FPIC6;initial Catalog=BarberShop;User ID = DogBarberShopOwner; Password = 1234";
        public static SqlConnection Connection;
        public static DataSet Ds = new DataSet();
        public static SqlDataAdapter Adapter;
        public static SqlCommand SqlCommand;
        public static SqlDataReader Reader;
        
        /// <summary>
        /// select quary 
        /// </summary>
        /// <param name="fields">fields to get</param>
        /// <param name="tables">tables get data from</param>
        /// <param name="where"> where statment</param>
        /// <returns>dataset, if trubled null</returns>
        public static DataSet Select(string fields, string tables, string where)
        {
            try
            {
                Ds.Clear();
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                SqlCommand = new SqlCommand($"select {fields} from {tables} {where}", Connection);
                Adapter = new SqlDataAdapter(SqlCommand);
                Adapter.Fill(Ds);
                
                Connection.Close();
                return Ds;
            }
            catch (Exception ex) { Console.WriteLine(ex.StackTrace);return null; }
        }

        /// <summary>
        /// insert quary
        /// </summary>
        /// <param name="table">table to insert to</param>
        /// <param name="values">values to insert</param>
        /// <returns>Seccess status</returns>
        public static bool Insert(string table, string values)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                SqlCommand = new SqlCommand($"insert into {table} values( {values} )", Connection);
                Reader = SqlCommand.ExecuteReader(CommandBehavior.CloseConnection);
                Connection.Close();
                return true;
            }
            catch (Exception ex) { Console.WriteLine(ex.StackTrace); return false; }
        }

        /// <summary>
        /// update quary
        /// </summary>
        /// <param name="table">table to update</param>
        /// <param name="field">field to update</param>
        /// <param name="value">updated value</param>
        /// <param name="where">where statment</param>
        /// <returns>seccess status</returns>
        public static bool Update(string table, string field, string value, string where)
        {
            try
            {
                Connection = new SqlConnection(ConnectionString);
                Connection.Open();
                SqlCommand = new SqlCommand($"update {table} set {field} = {value} {where}", Connection);
                Reader = SqlCommand.ExecuteReader(CommandBehavior.CloseConnection);
                Connection.Close();
                return true;
            }
            catch (Exception ex) { throw ex;}
        }

        /// <summary>
        /// delete quary
        /// </summary>
        /// <param name="table">table to delete from</param>
        /// <param name="where">where statment</param>
        /// <returns>seccess status</returns>
        public static bool Delete(string table, string where)
        {
            {
                try
                {
                    Connection = new SqlConnection(ConnectionString);
                    Connection.Open();
                    SqlCommand = new SqlCommand($"delete from {table} {where}", Connection);
                    Reader = SqlCommand.ExecuteReader(CommandBehavior.CloseConnection);
                    Connection.Close();
                    return true;
                }
                catch (Exception ex) { Console.WriteLine(ex.StackTrace); return false; }
            }
        }
    }
}
