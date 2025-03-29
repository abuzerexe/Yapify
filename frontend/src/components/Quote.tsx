import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";    

const quotes = [
    {
      text: "The customer support I received was exceptional. The support team went above and beyond to address my concerns.",
      author: "Julies Winfield",
      title: "CEO | Acme Corp",
    },
    {
      text: " This platform has transformed how we do business. Highly recommended!",
      author: "Mark Johnson",
      title: "COO | Tech Solutions",
    },
    {
      text: " Outstanding experience from start to finish. Their team really knows their stuff!",
      author: "Sophia Lee",
      title: "Founder | Innovate Inc.",
    },
    {
      text: "I’ve never been more satisfied with a product. Exceptional quality and service.",
      author: "James Carter",
      title: "Manager | Global Enterprises",
    },
    {
      text: "Their innovative solutions have made a tremendous difference in our operations. We’re seeing great results.",
      author: "Emily Davis",
      title: "CTO | Future Visions",
    },
    {
      text: "Exceptional value and performance. I would recommend them without hesitation.",
      author: "David Roberts",
      title: "Consultant | Growth Analytics",
    },
    {
      text: "The dedication and expertise of their team are unmatched. It’s been a game changer for us.",
      author: "Olivia Brown",
      title: "VP | Strategy & Solutions",
    },
    {
      text: "I was impressed by their professionalism and commitment to delivering the best experience possible.",
      author: "Liam Anderson",
      title: "Director | Pinnacle Systems",
    },
    {
      text: "A truly fantastic service. They exceeded all my expectations and more!",
      author: "Charlotte Wilson",
      title: "Owner | Design Sphere",
    },
    {
      text: "Their insights and strategies have propelled our company to the next level. Incredible work!",
      author: "Ethan Martinez",
      title: "CEO | Visionary Leaders",
    },
  ]

export const Quote = () => {

    const [currQuoteIndex,setCurrQuoteIndex] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrQuoteIndex((prevIndex)=>(prevIndex+1) % quotes.length)
        },5000)

        return ()=>clearInterval(interval)
    },[])

    const currQuote = quotes[currQuoteIndex]

    return (
        <div className="bg-slate-200 h-screen flex justify-center flex-col">
          <div className="flex justify-center">
            <div className="max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold ">
                    "{currQuote.text}"
                  </div>
                  <div className="max-w-md text-xl font-semibold text-left mt-4 pl-5">
                    {currQuote.author}
                  </div>
                  <div className="max-w-md text-sm font-light text-slate-700 text-left pl-5">
                    {currQuote.title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      );
    };