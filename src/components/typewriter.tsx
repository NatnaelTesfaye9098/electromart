'use client';

import { useState, useEffect } from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const phrases = ['affordable price', 'modern tech','reliable quality', 'fast delivery'];

export default function Typewriter(){
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const intervalID = setInterval(() => {
            setIndex((prev)=>(prev+1) % phrases.length)
        }, 3000);

        return () => clearInterval(intervalID);
    }, []);

    return(
        <div className="flex flex-col items-center justify-center p-8">
            <div className="max-w-md text-center text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
                <p>Your one-stop shop for</p>
                <div className="h-10 flex justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.span key={index} className="text-primary-500 inline-block text-center" initial={{width:0}} animate={{width:'auto'}} exit={{width:0}} transition={{duration: 0.5, type:'spring'}}>
                            {phrases[index]}
                        </motion.span>
                    </AnimatePresence>
                    <motion.span className="inline-block h-6 w-1 bg-gray-900 ml-1" initial={{opacity:0}} animate={{opacity:[0,1,1,0]}} transition={{duration:1, repeat:Infinity, ease:'easeInOut'}}/>
                </div>
            </div>
        </div>
    );
}