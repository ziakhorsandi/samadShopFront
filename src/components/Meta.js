import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To SamadShop',
  description: 'We sell everything',
  keywords: 'خرید لبنیات,خرید نوشابه,لبنیات,',
};

export default Meta;
