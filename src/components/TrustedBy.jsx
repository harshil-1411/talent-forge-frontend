import React from "react";

const TrustedBy = () => {
  return (
    <div className="bg-slate-100 flex justify-center py-8">
      <div className="w-full max-w-5xl flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16">
        <span className="text-slate-500 font-medium whitespace-nowrap">
          Trusted by:
        </span>
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png"
          alt="Facebook"
          className="h-10 object-contain filter grayscale opacity-75"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png"
          alt="Google"
          className="h-10 object-contain filter grayscale opacity-75"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png"
          alt="Netflix"
          className="h-10 object-contain filter grayscale opacity-75"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png"
          alt="P&G"
          className="h-10 object-contain filter grayscale opacity-75"
        />
        <img
          src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png"
          alt="PayPal"
          className="h-10 object-contain filter grayscale opacity-75"
        />
      </div>
    </div>
  );
};

export default TrustedBy;