import React, {useEffect} from 'react'
import { useHistory } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Success = () => {
    const { width, height } = useWindowSize()
    useEffect(() => {
        setTimeout(()=>{
            window.location = `${window.location.origin}/dash`
        },8000);
      }, []);
  return (
    <>
    <Confetti width={width}  height={height}/>
    <h1>Thank you so much for your support</h1>
    </>
  )
}

export default Success