'use client';

import {motion} from 'framer-motion';

interface HamburgerProps{
    isOpen: boolean
}

export default function HamburgerButton({isOpen}:HamburgerProps){
    return(
        <div className="flex flex-col h-12 w-12 justify-center items-center group">
            <div className="flex flex-col h-6 w-6 justify-between items-center transform transition-all duration-300">
                <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="bg-black h-0.5 w-6 rounded-sm origin-left"></motion.div>
                <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className="bg-black h-0.5 w-6 rounded-sm"></motion.div>
                <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="bg-black h-0.5 w-6 rounded-sm origin-left"></motion.div>
            </div>
        </div>
    )
}