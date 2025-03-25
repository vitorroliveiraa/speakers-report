import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface Tokens {
    accessToken: string | null
    refreshToken: string | null
  }
  
  export const getAccessToken = () => {
    const cookie = Cookies.get('_uac_us')
    if (cookie) {
      const { token } = JSON.parse(cookie)
      return token
    }
  }
  
  export const getCurrentUserLocal = () => {
    const cookie = Cookies.get('_uac_us')
    const cookieRefresh = Cookies.get('_uac_us_r')
  
    if (cookie) {
      const { token } = JSON.parse(cookie)
  
      const decodedToken: any = jwtDecode(token)
  
      return {
        email: decodedToken?.email,
        id: decodedToken?.user_id,
        name: decodedToken?.name,
        token,
        role: decodedToken?.role,
        ward_id:
          decodedToken?.ward_id,
        member_number: decodedToken?.member_number,
      }
    }
  
    return null
  }
  
  export const setLegacyCookies = ({ refreshToken, accessToken }: Tokens) => {
    if (accessToken) {
      Cookies.set(
        '_uac_us',
        JSON.stringify({
          token: accessToken,
          timeStamp: new Date().toISOString(),
        }),
        {
          sameSite: 'lax',
          httpOnly: false,
          expires: 1,
        },
      )
    }
    if (refreshToken) {
      Cookies.set('_uac_us_r', JSON.stringify({ refreshToken }), {
        sameSite: 'lax',
        httpOnly: false,
        expires: 1,
      })
    }
  }
  
  export const clearLegacyCookies = () => {
    Cookies.remove('_uac_us')
    Cookies.remove('_uac_us_r')
  }