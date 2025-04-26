import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HomeNavBar from './utils/HomeNavBar';
// Sample Image URLs (replace with your actual image paths or URLs)
const studioImage1 = 'https://via.placeholder.com/800x400/a8dadc/1d3557?Text=Studio+Space';
const studioImage2 = 'https://via.placeholder.com/800x400/457b9d/f1faee?Text=Dance+Floor';
const instructorImage1 = 'https://via.placeholder.com/150/1d3557/f1faee?Text=Rhythm+Master';
const instructorImage2 = 'https://via.placeholder.com/150/e63946/f1faee?Text=Groove+Guru';

function BeatboxDanceStudio() {
  const navigate = useNavigate();
  const login = () => {
    navigate('/signin');
  };
  return (
    <div className="container-fluid bg-dark text-light p-0" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation Bar */}
      <HomeNavBar/>

      <div className="p-5">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-3 fw-bold text-primary mb-0">Beatbox Dance Studio</h1>
            <p className="lead text-secondary">Unleash Your Inner Rhythm and Groove</p>
          </div>
          {/* Removed Login Button */}
        </header>

        {/* About Section */}
        <section id="about" className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="text-info mb-4">About Us</h2>
            <p className="lead text-light">
              Beatbox Dance Studio is a vibrant community dedicated to the fusion of beatboxing and dance. Founded by passionate artists, our studio provides a unique platform for individuals to explore their creativity, develop their skills, and connect with others who share a love for rhythm and movement. We believe in fostering a supportive and inspiring environment where everyone can thrive, regardless of their experience level.
            </p>
            <p className="text-light">
              Our innovative approach combines the intricate sounds of beatboxing with various dance styles, creating a dynamic and engaging learning experience. We offer a range of classes and workshops designed to cater to different interests and skill levels, from beginner fundamentals to advanced choreography. Join us and discover the exciting synergy between vocal percussion and expressive movement!
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="row mb-5">
          <div className="col-md-6 mb-3">
            <img
              src={studioImage1}
              alt="Studio Space"
              className="img-fluid rounded shadow-lg"
              style={{ transition: 'transform 0.3s ease-in-out' }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
          <div className="col-md-6 mb-3">
            <img
              src={studioImage2}
              alt="Dance Floor"
              className="img-fluid rounded shadow-lg"
              style={{ transition: 'transform 0.3s ease-in-out' }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
          {/* You can add more image divs here */}
        </section>

        {/* Our Classes Section (Enhanced) */}
        <section id="classes" className="row mb-5">
          <div className="col-md-6">
            <div className="card bg-secondary text-light mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title text-warning">Beatboxing Fundamentals</h5>
                <p className="card-text">
                  Learn the core sounds (bass drum, snare, hi-hat, etc.) and essential techniques of beatboxing. Develop your rhythmic foundation, timing, and breath control. Perfect for beginners.
                </p>
                <button className="btn btn-outline-warning btn-sm rounded-pill">Explore Details</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-secondary text-light mb-3 shadow">
              <div className="card-body">
                <h5 className="card-title text-warning">Dance Fusion: Hip-Hop Rhythms</h5>
                <p className="card-text">
                  Explore the dynamic connection between hip-hop dance and beatboxing. Learn grooves and choreography that complement vocal percussion. All dance levels welcome.
                </p>
                <button className="btn btn-outline-warning btn-sm rounded-pill">Explore Details</button>
              </div>
            </div>
          </div>
          {/* Add more class cards here */}
          <div className="col-12 text-center mt-3">
            <button className="btn btn-primary btn-md rounded-pill shadow-sm">View All Classes</button>
          </div>
        </section>

        {/* Our Instructors Section (Enhanced with Images) */}
        <section id="instructors" className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="text-info mb-4">Meet Our Awesome Instructors</h2>
            <p className="lead text-light">
              Our dedicated and talented instructors bring a wealth of experience in both beatboxing and various dance styles. They are passionate about sharing their knowledge and helping you achieve your goals.
            </p>
            <div className="row justify-content-center">
              <div className="col-md-4 mb-3">
                <div className="card bg-info text-light text-center shadow">
                  <img
                    src={instructorImage1}
                    alt="Rhythm Master"
                    className="card-img-top rounded-circle p-2"
                    style={{ border: '3px solid #f1faee' }}
                  />
                  <div className="card-body">
                    <h6 className="card-title fw-bold">Rhythm Master</h6>
                    <p className="card-text text-secondary">Beatboxing Expert</p>
                    {/* Social Media Buttons */}
                    <div className="mt-2">
                      <button className="btn btn-light btn-sm rounded-circle me-2">
                        <FaFacebook />
                      </button>
                      <button className="btn btn-light btn-sm rounded-circle me-2">
                        <FaTwitter />
                      </button>
                      <button className="btn btn-light btn-sm rounded-circle">
                        <FaInstagram />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card bg-info text-light text-center shadow">
                  <img
                    src={instructorImage2}
                    alt="Groove Guru"
                    className="card-img-top rounded-circle p-2"
                    style={{ border: '3px solid #f1faee' }}
                  />
                  <div className="card-body">
                    <h6 className="card-title fw-bold">Groove Guru</h6>
                    <p className="card-text text-secondary">Dance Choreographer</p>
                    {/* Social Media Buttons */}
                    <div className="mt-2">
                      <button className="btn btn-light btn-sm rounded-circle me-2">
                        <FaFacebook />
                      </button>
                      <button className="btn btn-light btn-sm rounded-circle me-2">
                        <FaTwitter />
                      </button>
                      <button className="btn btn-light btn-sm rounded-circle">
                        <FaInstagram />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more instructor cards here */}
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="row justify-content-center mb-5">
          <div className="col-md-6 text-center">
            <h2 className="text-info mb-4">Contact Us</h2>
            <p className="lead text-light">Have questions or want to learn more? Reach out to us!</p>
            <p className="text-secondary">Email: <span className="text-light">info@beatboxdancestudio.com</span></p>
            <p className="text-secondary">Phone: <span className="text-light">(123) 456-7890</span></p>
            <p className="text-secondary">Address: <span className="text-light">123 Beat Street, Rhythm City</span></p>
            {/* Social Media Buttons */}
            <div className="mt-3">
              <button className="btn btn-outline-info btn-lg rounded-pill me-2">
                <FaFacebook className="me-2" /> Facebook
              </button>
              <button className="btn btn-outline-info btn-lg rounded-pill me-2">
                <FaTwitter className="me-2" /> Twitter
              </button>
              <button className="btn btn-outline-info btn-lg rounded-pill">
                <FaInstagram className="me-2" /> Instagram
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center py-3 text-secondary">
          <p>&copy; {new Date().getFullYear()} Beatbox Dance Studio. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default BeatboxDanceStudio;