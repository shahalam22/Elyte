import React from 'react'

export default function About() {
  return (
    <section className="text-gray-600 body-font">
      <div className=" pt-8 pb-3 md:pt-10 md:pb-5 text-center text-black">
      <h1 className="text-3xl text-bold mt-5 mb-10">About Us</h1>
      </div>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Our Mission</h1>
          <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork authentic tumeric truffaut hexagon try-hard chambray. Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray. Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-black border-2 border-black py-2 px-6 hover:bg-white hover:text-black rounded text-lg">Read More</button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Our Goal</h1>
          <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork authentic tumeric truffaut hexagon try-hard chambray. Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray. Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-black border-2 border-black py-2 px-6 hover:bg-white hover:text-black  rounded text-lg">Read More</button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/>
        </div>
      </div>
    </section>
  )
}
