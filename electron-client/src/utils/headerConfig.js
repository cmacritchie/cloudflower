export default (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`${token}`
          }
    }
}