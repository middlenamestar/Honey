import React, {useEffect} from 'react'
import { useHistory } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';
import Navigation from "../components/Nav";
import { Container, Row, Col } from 'react-bootstrap';

const Success = () => {
  const { width, height } = useWindowSize()
  useEffect(() => {
      setTimeout(()=>{
          window.location = `http://localhost:3000/dash`
      },8000);
    }, []);

  return (
    <>
      <Container className='my-4'>
        <Row className='justify-content-center'>
          <Col>
            <Confetti width={width} height={height}/>
            <h3>Thank you so much for your support! (っ^_^)っ</h3>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default Success;