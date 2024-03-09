import React from "react";
import { Helmet } from "react-helmet";

const PageMeta = ({ title, desc, name="DTYTECH", type="E-commerce", image }) => {
  const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  return (
    <Helmet>
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta property="og:image" content={image} />
    <link rel="icon" type="image/x-icon" href={shopInfo.logo} />
    {/* Facebook tags */}
    <meta property="og:type" content={type} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="300" />
    <meta
      property="og:image:alt"
      content="A shiny red apple with a bite taken out"
    />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    {/* End Facebook tags */}
    {/* Twitter tags */}
    <meta name="twitter:creator" content={name} />
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
  </Helmet>
  );
};

export default PageMeta;