import React from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/under_contruction.jpg";
import Footer from "../components/Footer";

function PricingMonthly() {
 return (
  <div>
   <Navbar />

   <section
    id="cta1"
    class="bg-brightRed  bg-[url('../img/pricing_image.svg')] h-[29.75rem]"
   >
    {/* <!-- Flex Container --> */}
    {/* <div
        class="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0"
      > */}
    <div class="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12  md:py-12 md:flex-col md:space-y-10">
     {/* <!-- Heading --> */}
     <h2
      // class="text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left"
      class="text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-full md:text-left"
     >
      {/* Simplify how your team works today */}
      {/* Pricing */}
     </h2>
     {/* <!-- Button --> */}
    </div>
   </section>

     <section id="hero">
        <h1 class="text-center mt-20 mb-20 font-bold  md:text-5xl">Premium Offers</h1> 
       <div class="container flex flex-col-reverse items-center px-6 mx-auto mt-20 mb-20 space-y-0 md:space-y-0 md:flex-row">
        
         <div class="flex flex-col mb-32 space-y-12 md:w-1/2">
           
      <h2 class="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
       Benefits you can <br/> Feel Immediately
      </h2>
      <p class="max-w-sm text-center text-darkGrayishBlue md:text-left">
       Stakepro premium gets you earning higher and quicker rewards in a record
       short time than regular users. You get full access to enjoy all features
       in the platform.
      </p>
      <div class="flex justify-center md:justify-start">
       <a
        href="#"
        class="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
       >
        Try Premium Now
       </a>
      </div>
     </div>

     <div class="md:w-1/2">
      <img src="img/price-list.svg" alt="f-nav_profile" />
     </div>
    </div>
      
       
  <div class="items-center px-6 mx-auto text-center mt-20 mb-20 md:space-y-0 md:flex-row">
         <img src="img/ava-profile.png" class="mx-auto mb-8 mt-4" alt="f-nav_profile" />
         <div class="flex flex-col mb-32 space-y-8 mx-auto md:w-1/2">
                    <h3 class="font-bold md:text-2xl">Still have questions?</h3>
         <p class=" md:text-2xl">Can’t find the answer to your question? Please chat our friendly team.</p>

    <div class="flex justify-center md:justify-center">
           <a href="#" class="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight font-medium">Contact us Now</a>
           
         </div>
         </div>

   
    </div>
     </section>
     

   <Footer />
  </div>
 );
}

export default PricingMonthly;
