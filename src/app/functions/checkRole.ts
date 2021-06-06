export function checkRole(){
  let jwt = localStorage.getItem('token');
  if(jwt != null && jwt != ''){
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    console.log(decodedJwtData.role[0]['authority']);
    return decodedJwtData.role[0]['authority'];
  }
  return jwt
}

export function logout(){
  localStorage.setItem('token', '');
}
