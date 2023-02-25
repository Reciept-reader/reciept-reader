import { createSupaClient } from './databaseFun.js'

/* Sign up function
Takes in a username and password to sign up 
If the username doesnt exist works 
If the username already exists return that they cant sign-up with that username 
*/
export async function signUp(username, password) {
    const supabase = await createSupaClient();
    const { data: user, error } = await supabase
      .from("users")
      .insert({ username, password })
      .single();
  
    if (error) {
      if (error.message.includes("duplicate key value violates unique constraint")) {
        return "username taken";
      } else {
        throw error;
      }
    }
  
    return user.id;
  };

/* Sign in function
Takes in a user entered username and password 
Checks to see if the combination exists 
If so returns the user_id and logs the user in 
If false returns "login credenials dont exist" for the app to tell the user
*/
export async function signIn(username, password) {
  const supabase = await createSupaClient();
  const { data: user, error } = await supabase
    .from("users")
    .select("user_id")
    .eq("username", username)
    .eq("password", password)

  if (error) {
    if (error.message.includes("duplicate key value violates unique constraint")) {
        return "username taken";
    } else {
        throw error
    }
  }

  if (user.user_id === undefined) {
    return "login credentials don't exist";
  }

  return { user_id: user.user_id, username: user.username };
};


/* Password change function
Takes in a user_id, users old password, and a new password
Checks to see if the user_id and password combination exists in the db
If so changes the password and returns success 
If doesnt exist returns current password doesnt exist
*/
export async function changePassword(user_id, password, new_password) {
  const supabase = await createSupaClient();
  const { data, error } = await supabase
        .from("users")
        .update({password: new_password})
        .eq('user_id', user_id)
        .eq('password', password)
        .select()

    if (error) {
        console.error(error);
        return "password is incorrect";
    }

    if (data.length == 0) {
        return "password is incorrect";
    }
    
    return 'Password changed';
}


  /* Username change function
Takes in a user_id, users old username, and a new username
Checks to see if the user_id and username combination exists in the db
If so changes the username and returns success 
If doesnt exist returns current username doesnt exist
*/
export async function changeUsername(user_id, username, new_username) {
  const supabase = await createSupaClient();
  const { data, error } = await supabase
        .from("users")
        .update({username: new_username})
        .eq('user_id', user_id)
        .eq('username', username)
        .select()

    if (error) {
        console.error(error);
        return "username is incorrect";

    }

    if (data.length == 0) {
        return "username is incorrect";
    }
    
    return 'Username changed';
};



export default { signIn , changePassword, changeUsername }
