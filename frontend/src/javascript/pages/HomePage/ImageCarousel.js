import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/ImageCarousel.css';

function ImageCarousel() {
  return (
      <Carousel id="carousel">
        <Carousel.Item>
          <img
            className="img"
            src="/resources/images/van_gogh_images/cafe-terrace.jpeg"
            alt="The Cafe Terrace"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img"
            src="/resources/images/van_gogh_images/cherry-blossom.jpeg"
            alt="Cherry Blossom"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img"
            src="/resources/images/van_gogh_images/cyprus-tree.jpeg"
            alt="Cyprus Tree"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img"
            src="/resources/images/van_gogh_images/ship-workers-sunset.jpeg"
            alt="Ship Workers At Sunset"
          />
          <Carousel.Caption>
            <h3>Fourth slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  );
}

export default ImageCarousel;