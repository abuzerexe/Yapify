import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";    

const quotes = [
    {
      text: "Writing is the painting of the voice, and your voice deserves to be heard.",
      author: "Julies Winfield",
      title: "Author & Storyteller",
    },
    {
      text: "Every great blog begins with a single word. Let your story unfold today.",
      author: "Mark Johnson",
      title: "Blogger | Tech Enthusiast",
    },
    {
      text: "Blogging is not just writing; it's about connecting with people who share your passion.",
      author: "Sophia Bennett",
      title: "Travel Blogger",
    },
    {
      text: "Your ideas are your superpower. Blogging is how you share them with the world.",
      author: "Liam Carter",
      title: "Creative Writer",
    },
    {
      text: "A blog is your personal space on the internet. Make it meaningful, make it yours.",
      author: "Emily Davis",
      title: "Content Creator",
    },
    {
      text: "The best blogs inspire, educate, and empower readers. Start your journey now.",
      author: "Michael Edwards",
      title: "Educator & Blogger",
    },
    {
      text: "Blogging isn't about being perfect; it's about being authentic.",
      author: "Olivia Martinez",
      title: "Lifestyle Blogger",
    },
    {
      text: "A blog is a place where your thoughts can take flight and inspire others.",
      author: "James Wilson",
      title: "Motivational Blogger",
    },
    {
      text: "Share your story, one post at a time. The world is waiting to hear from you.",
      author: "Isabella Brown",
      title: "Personal Growth Blogger",
    },
    {
      text: "Blogging is the art of turning ideas into stories that resonate with others.",
      author: "Ethan Harris",
      title: "Freelance Blogger",
    },
  ];

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