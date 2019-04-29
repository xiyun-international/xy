function getToken():void {
  localStorage.getItem('TOKEN')
}

function setToken(token:string):void {
  localStorage.setItem('TOKEN', token)
}

function removeToken():void {
  localStorage.removeItem('TOKEN')
}

export { getToken, setToken, removeToken };
