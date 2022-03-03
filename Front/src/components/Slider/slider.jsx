import style from "./slider.module.css";

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      }
    };
  
    return (
      <div className={style.}>
        <div className={style.Arrow} direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </div>
        <div className={style.Wrapper} slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <div className={style.Slide} bg={item.bg} key={item.id}>
              <div className={style.ImgContainer}>
                <img className={style.Image} src={item.img} />
              </div>
              <div className={style.InfoContainer}>
                <h1 className={style.Title}>{item.title}</h1>
                <p className={style.Desc}>{item.desc}</p>
                <button className={style.Button}> Saber +</button>
              </div>
            </div> 
          ))}
        </div>
        <div className={style.Arrow} direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </div>
      </div>
    );
  };

export default Slider;
