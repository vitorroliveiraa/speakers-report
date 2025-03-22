import MainLayout from '@/layouts/main-layout'
import { getAccessToken } from '@/utils/handle_cookies'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
const PrivateRoutes = () => {
    let isExpired= false;
    const token = getAccessToken()
    if(token == null || token==undefined)
      isExpired=true
    else{
      var decodedToken= jwtDecode(token);
    var dateNow = new Date();

    if(!decodedToken.exp || decodedToken.exp < dateNow.getTime())
        isExpired = true;
    }
    

    return (
    !isExpired ? <MainLayout/> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes