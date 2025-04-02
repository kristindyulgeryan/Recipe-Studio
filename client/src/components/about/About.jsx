import { useState } from "react";
import { images, descriptions } from "./aboutData.js";
import {ArrowLeft, ArrowRight} from 'lucide-react';
import style from './About.module.css'

const getRandomNumber = ()=>Math.floor(Math.random() * 41) - 20;


export default function About() {
 const [index, setIndex]= useState(0)

  
  return (
    <section className={`${style.aboutSec} py-4`}>
      <div className="container">
        <div className={`${style.about} row position-relative `}>
          <div className="col-md-6 text-center ">
            <div className={style.aboutImg}>
              {images.map((image, i) => (
                <img 
                  key={i} 
                  src={image} 
                  alt={`About us ${i}`}
                  className={`${style.galleryImage} ${
                    i === index ? style.activeImg : style.inactiveImg
                  }`}
                  style={{
                    transform: `rotate(${index === i ? 0 : getRandomNumber()}deg)`,
                   
                  }}
                />
              ))}
            </div>
          </div>
          <div className="col-md-6 ">
            <p className={style.titleP}>About Us</p>
            <h2 className={style.titleH}>
              Nurturing Health Through Homemade Cooking
            </h2>
            <div className={style.descriptions}>
              {descriptions.map((description, i) => (
                <p key={i} className={`${i === index ? style.activeDesc : style.inactiveDesc}`}>{description}</p>
              ))}
            </div>
          </div>
          <div className={style.arrowContainer} >
          <button className={style.arrowButton} onClick={()=>setIndex((prev)=> prev === 0 ? images.length - 1 : prev-1)}>
            <ArrowLeft size={18} />
          </button>
          <button className={style.arrowButton} onClick={()=>setIndex((prev)=> prev === images.length -1 ? 0 : prev + 1)}>
            <ArrowRight size={18}/>
          </button>
        </div>
        </div>
      
      </div>
    </section>
  );
}
