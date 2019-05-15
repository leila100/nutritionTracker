export const GET_CURRENT_USER_QUERY = `
{
  getCurrentUser {
    id
    firstName
    lastName
    email
  }
}
`;

export const GET_USERS_QUERY = `
{
  getUsers {
    id
    firstName
    lastName
    email
  }
}
`;

export const GET_USER_BYID_QUERY = `
query($userId: ID!)
{
  getUserById(userId: $userId) {
    id
    firstName
    lastName
    email
  }
}
`;
