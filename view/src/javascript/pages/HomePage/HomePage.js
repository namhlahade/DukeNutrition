import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../../NavigationBar';
import ImageCarousel from './ImageCarousel';
import ContactForm from '../../ContactForm';

function HomePage() {
  return (
    <div>
      <ImageCarousel />
      <ContactForm />
    </div>
  );
}

export default HomePage;
