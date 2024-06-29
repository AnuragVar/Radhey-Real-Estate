function About() {
  return (
    <div className="text-slate-500 max-w-6xl mx-auto pt-20 flex flex-col gap-2">
      <h1 className="text-3xl text-slate-700 font-bold ">About Us:</h1>
      <p>
        Welcome to Radhey Real Estate, your premier destination for buying,
        selling, and renting properties. We are dedicated to transforming your
        real estate journey into an extraordinary experience by offering
        unparalleled expertise, exceptional service, and a deep commitment to
        our clients' needs.
      </p>
      <br />
      <h2 className="text-2xl text-slate-700 font-bold">Our Mission</h2>
      <p>
        At Radhey Real Estate, our mission is to connect people with their dream
        homes and investment opportunities. Whether you are looking to buy,
        sell, or rent, we provide personalized solutions tailored to your unique
        preferences and requirements.
      </p>
      <h2 className="text-2xl text-slate-700 font-bold">What We Offer</h2>
      <ul className="flex flex-col gap-1">
        <li>
          <span className="text-md text-slate-700 font-semibold underline">
            Property Sales:{" "}
          </span>
          Explore a wide range of properties for sale, from cozy starter homes
          to luxurious estates. Our expert agents are here to guide you through
          every step of the buying process.
        </li>
        <li>
          <span className="text-md text-slate-700 font-semibold underline">
            Property Rentals:
          </span>{" "}
          Find your perfect rental home with ease. We offer a diverse selection
          of rental properties that cater to various lifestyles and budgets.
        </li>
        <li>
          <span className="text-md text-slate-700 font-semibold underline">
            Expert Guidance:
          </span>{" "}
          Our team of experienced real estate professionals brings a wealth of
          knowledge and insight to help you make informed decisions. We are
          committed to providing honest, transparent, and reliable advice.
        </li>
        <li>
          <span className="text-md text-slate-700 font-semibold underline">
            Exceptional Service:
          </span>{" "}
          We pride ourselves on our dedication to client satisfaction. Our
          personalized approach ensures that your real estate experience is
          smooth, efficient, and enjoyable.
        </li>
      </ul>
      <h2 className="text-2xl text-slate-700 font-bold">
        Why Choose Radhey Real Estate?{" "}
      </h2>
      <ul className="flex flex-col gap-1">
        <li>
          <span className="text-md text-slate-700 font-semibold underline">
            Local Expertise:
          </span>{" "}
          With a deep understanding of the local market, we offer valuable
          insights into neighborhoods, property values, and market trends.
          Comprehensive Support: From initial consultation to closing, we
          provide comprehensive support throughout your real estate journey.
        </li>
        <li>
          <span className="text-md text-slate-700 font-semibold underline">
            Client-Centered Approach:
          </span>{" "}
          Your goals are our priority. We listen, understand, and work
          tirelessly to exceed your expectations. At Radhey Real Estate, we
          believe that finding the perfect home or investment property is a
          significant milestone. Let us be your trusted partner in this exciting
          journey, and together, we'll unlock the doors to your dreams.
        </li>
      </ul>
      <p className="pb-20 ">
        Thank you for choosing Radhey Real Estate. We look forward to working
        with you.
      </p>
    </div>
  );
}

export default About;
