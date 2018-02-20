fetchToYelp = (lat,lng) =>{

  const body = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      lat: lat,
      lng: lng,
      term: 'restaurant'
    })
  }
  return fetch(`$https://mymidpointserver.herokuapp.com/api/v1/adapters`, body).then(res => res.json())
}

export default fetchToYelp
