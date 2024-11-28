export const gerenateInfoError = (users) =>{
  return `incomplete data. We need to receive the following data:
  -Name: String, but we received ${users.first_name}
  -Last_name: String, but we received ${users.last_name}
  -Email: String, but we received ${users.email}
  -Pasword: String, but we receives ${users.password}`
}