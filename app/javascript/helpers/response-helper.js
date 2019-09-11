const MAP = {
  email_already_taken: 'email already taken',
  user_creation_success: 'user created successfully',
  user_creation_error: 'user creation failed',
  action_not_allowed_for_user: 'action now allowed for user',
  incorrect_password: 'incorrect password',
  user_update_error: 'user could not update',
  user_update_success: 'user update successful',
  incorrect_email_or_password: 'incorrect email or password',
  user_sign_in_success: 'user signed in',
  user_sign_out_success: 'successfully signed out',
  user_signed_out_error: 'sign out failed',
};

export function translateResponseMessage(message) {
  if (MAP[message]) {
    return MAP[message];
  }

  console.error('Response message not recognized. You probably need to update the map in "response-helpers"');

  return message;
}

export function parseErrors(errors) {
  if (Object.getPrototypeOf(errors) !== Object.prototype) {
    console.warn('"errors" argument should be an object');
  }

  const res = [];

  for (const attr in errors) {
    const arr = errors[attr];

    for (const error of arr) {
      res.push(`${attr} ${error}`);
    }
  }

  return res;
}
