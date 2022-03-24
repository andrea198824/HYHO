import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'
import videoLanding from '../Img/landing_verde_OK.mp4'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${mobile({ display: 'none' })}
  @media (max-width: 320px) {
    display: none;
   
  // }
  // @media (min-width: 390px) {
  //   display: none;
    
  // }
`

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({
    display: 'none'
  })} // @media (min-width: 320px) {
  //   display: none;
  //   padding-top: 10px;
  // }
  // @media (min-width: 390px) {
  //   display: none;
  // }
`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #dbd3f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.direction === 'left' && '10px'};
  right: ${props => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props => props.slideIndex * -100}vw);
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #${props => props.bg};
`

const ImgContainer = styled.div`
  width: 100%;
  flex: 2;
  align-self: stretch;
`

const Image = styled.img`
  height: 80%;
  width: 100%;
  ${mobile({ display: 'none' })}
`

const Video = styled.video`
  height: 72%;
  margin-top: -180px;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`

// const ContTitle = styled.div`

//   // background-color: #dbd3f7;
//   border: 0.5px solid #dbd3f7 ;
//   border-radius: 10px;
//   margin: 10px;
//   padding: 10px;
// `;
const Title = styled.h1`
  color: #8aa290;
  font-size: 40px;
  margin: 6px;
  // @media (min-width: 320px) {
  //
  //  font-size: 30px;
  // padding-top: 10px;
  // }
  ${mobile({ display: 'none' })}
`

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: #dbd3f7;
  cursor: pointer;
  border: 0.5px solid lightgray;
`

// <video  ref={vidRef} muted autoPlay loop src={videoLanding} />;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const vidRef = useRef()
  const handleClick = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3)
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0)
    }
  }

  useEffect(() => {
    vidRef.current.play()
  }, [])
  return (
    <Div>
      <Title> ¿ A quienes estamos ayudando ?</Title>
      <Container>
        <Arrow direction='left' onClick={() => handleClick('left')}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map(item => (
            <Slide bg={item.bg} key={item.id}>
              {item.video ? (
                <Video
                  ref={vidRef}
                  muted
                  autoplay
                  controls
                  src={videoLanding}
                  type='video/mp4'
                />
              ) : (
                <>
                  <ImgContainer>
                    <Image src={item.img[0]} />
                  </ImgContainer>
                  <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Link to='/infoSlider'>
                      <Button>Saber +</Button>
                    </Link>
                  </InfoContainer>
                </>
              )}
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction='right' onClick={() => handleClick('right')}>
          <ArrowRightOutlined />
        </Arrow>
      </Container>
    </Div>
  )
}

export default Slider
