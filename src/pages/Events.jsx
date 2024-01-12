import React from 'react'
import Navbar from '../components/Navbar'
import orchestraImg from '../assets/orchestra.png'
import pastEventsImg from '../assets/PastEvents.webp'

const Events = () => {
  return (
    <div className='events'>
      <div className='navdiv'>
        <Navbar></Navbar>
      </div>
      <section className='hero'>
        <h1>Events</h1>
        <p>See our past, upcoming, and future events</p>
      </section>
      <section className='upcoming'>
        <div className="upcoming-content">
          <div className="image">
            <img src={orchestraImg} alt="Image" />
          </div>
          <div className="text">
            <h2>Upcoming Events</h2>
            <h3>Advuth Orchestra 2023</h3>
            <ul>
              <li>When: October 21st</li>
              <li>Where: India House, Houston</li>
              <li>Ticket Fee: Free, courtesy of SDKKM, a nonprofit organization</li>
            </ul>
          </div>
        </div>
      </section>
      <section className='past'>
        <div className="past-content">
          <div className="image">
            <img src={pastEventsImg} alt="Image" />
          </div>
          <div className="text">
            <h2>Past Events</h2>
            <h3>Advuth Orchestra 2022</h3>
            <ul>
              <li>When: October 1st, 2022</li>
              <li>Where: Iskon Temple, Houston</li>
              <li>Ticket Fee: Free</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='future'>
        <div className="future-content">
          <div className="image">
            <img src={orchestraImg} alt="Image" />
          </div>
          <div className="text">
            <h2>Future Events</h2>
            <h3>Advuth Orchestra</h3>
            <p>Coming Soon! Stay Tuned</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events