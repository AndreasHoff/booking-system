import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Bookings from '../components/Bookings';
import Settings from '../components/Settings';
import { auth, db } from '../firebase';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState('analytics');
    const [totalBookings, setTotalBookings] = useState(0);
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        const fetchTotalBookings = async () => {
            const bookingCollection = collection(db, 'bookings');
            const bookingSnapshot = await getDocs(bookingCollection);
            setTotalBookings(bookingSnapshot.size);
        };

        fetchTotalBookings();
    }, []);

    useEffect(() => {
        const fetchRecentBookings = async () => {
            const bookingCollection = collection(db, 'bookings');
            const bookingQuery = query(bookingCollection, orderBy('createdAt', 'desc'), limit(5));
            const bookingSnapshot = await getDocs(bookingQuery);
            const bookingList = bookingSnapshot.docs.map(doc => doc.data());
            setRecentBookings(bookingList);
        };

        fetchRecentBookings();
    }, []);

    const handleSectionChange = (section) => {
        setCurrentSection(section);
      };

      const activeMenuItem = (section) => {
        const isActive = currentSection === section
        return isActive ? 'active' : '';
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                console.log('user not logged in')
                toast.error('You must be logged in to access this page', { autoClose: 100 });
                navigate('/login');
            }
        }, []);

        return () => unsubscribe();
    }, [navigate]);

    const showMenu = () => {
        const sideMenu = document.querySelector('aside');
        sideMenu.style.display = 'block';
    };

    const closeMenu = () => {
        const sideMenu = document.querySelector('aside');
        sideMenu.style.display = 'none';
    };

    const darkLightMode = () => {
        document.body.classList.toggle('dark-mode-variables');
        const darkMode = document.querySelector('.dark-mode');
        darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
    };

    return (
        <div className='container'>
            {user ? (
                <>
                <aside>
                <div className='toggle'>
                    <Link to='/'>
                        <div className='logo'>
                            <img
                                src='/images/logo.png'
                                alt=''
                            />
                            <h2>PFA<span className='danger'>Pension</span></h2>
                        </div>
                    </Link>
                    <div
                        className='close'
                        id='close-btn'
                        onClick={closeMenu}
                    >
                        <span className='material-icons-sharp'>close</span>
                    </div>
                </div>

                <div className='sidebar'>
                    <button type="button" className={activeMenuItem('analytics')} onClick={() => handleSectionChange('analytics')}>
                        <span className='material-icons-sharp'>insights</span>
                        <h3>Analytics</h3>
                    </button>
                    <button type="button" className={activeMenuItem('users')}>
                        <span className='material-icons-sharp'>person_outline</span>
                        <h3>Users</h3>
                    </button>
                    <button type="button" className={activeMenuItem('history')}>
                        <span className='material-icons-sharp'>receipt_long</span>
                        <h3>History</h3>
                    </button>
                    <button type="button">
                        <span className='material-icons-sharp'>mail_outline</span>
                        <h3>Tickets</h3>
                        <span className='message-count'>27</span>
                    </button>
                    <button type="button" className={activeMenuItem('bookings')} onClick={() => handleSectionChange('bookings')}>
                        <span className='material-icons-sharp'>inventory</span>
                        <h3>Bookings</h3>
                    </button>
                    <button type="button">
                        <span className='material-icons-sharp'>report_gmailerrorred</span>
                        <h3>Reports</h3>
                    </button>
                    <button type="button" className={activeMenuItem('settings')} onClick={() => handleSectionChange('settings')}>
                        <span className='material-icons-sharp'>settings</span>
                        <h3>Settings</h3>
                    </button>
                    <button type="button">
                        <span className='material-icons-sharp'>logout</span>
                        <h3>Logout</h3>
                    </button>
                </div>
            </aside>

            <main>
            {currentSection === 'bookings' && (
              <Bookings />
            )}

            {currentSection === 'settings' && (
                <Settings />
            )}

            {currentSection === 'analytics' && (
                <>
                 <h1>Analytics</h1>
                 <div className='analyse'>
                     <div className='sales'>
                         <div className='status'>
                            <div className='info'>
                                <h3>Total Bookings</h3>
                                <h1>{totalBookings}</h1>
                            </div>
                             <div className='progress'>
                                 <svg>
                                     <circle
                                         cx='38'
                                         cy='38'
                                         r='38'
                                     ></circle>
                                 </svg>
                                 <div className='percentage'>
                                     <p>+81%</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className='visits'>
                         <div className='status'>
                             <div className='info'>
                                 <h3>Site Visits</h3>
                                 <h1>13,424</h1>
                             </div>
                             <div className='progress'>
                                 <svg>
                                     <circle
                                         cx='38'
                                         cy='38'
                                         r='38'
                                     ></circle>
                                 </svg>
                                 <div className='percentage'>
                                     <p>-48</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className='searches'>
                         <div className='status'>
                             <div className='info'>
                                 <h3>Searches</h3>
                                 <h1>14,342</h1>
                             </div>
                             <div className='progress'>
                                 <svg>
                                     <circle
                                         cx='38'
                                         cy='38'
                                         r='38'
                                     ></circle>
                                 </svg>
                                 <div className='percentage'>
                                     <p>+24%</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className='recent-bookings'>
                <h2>Recent Bookings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentBookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.service}</td>
                                <td>{booking.date}</td>
                                <td>{booking.fullName}</td>
                                <td>{booking.email}</td>
                                <td>{booking.comment}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <a href='/show-all'>Show all</a>
        </div>
                 </>
            )}
            </main>

            <div className='right-section'>
                <div className='nav'>
                    <button
                        onClick={showMenu}
                        id='menu-btn'
                    >
                        <span className='material-icons-sharp'>menu</span>
                    </button>
                    <div
                        onClick={darkLightMode}
                        className='dark-mode'
                    >
                        <span className='material-icons-sharp active'>light_mode</span>
                        <span className='material-icons-sharp'>dark_mode</span>
                    </div>

                    <div className='profile'>
                        <div className='info'>
                            <p>
                                Hey, <b>Reza</b>
                            </p>
                            <small className='text-muted'>Admin</small>
                        </div>
                        <div className='profile-photo'>
                            <img
                                src='/images/profile-1.jpg'
                                alt=''
                            />
                        </div>
                    </div>
                </div>

                <div className='user-profile'>
                    <div className='logo'>
                        <img
                            src='/images/logo.png'
                            alt=''
                        />
                        <h2>PFAPension</h2>
                        <p>Fullstack Web Developer</p>
                    </div>
                </div>

                <div className='reminders'>
                    <div className='header'>
                        <h2>Reminders</h2>
                        <span className='material-icons-sharp'>notifications_none</span>
                    </div>

                    <div className='notification'>
                        <div className='icon'>
                            <span className='material-icons-sharp'>volume_up</span>
                        </div>
                        <div className='content'>
                            <div className='info'>
                                <h3>Workshop</h3>
                                <small className='text_muted'>08:00 AM - 12:00 PM</small>
                            </div>
                            <span className='material-icons-sharp'>more_vert</span>
                        </div>
                    </div>
                    <div className='notification deactive'>
                        <div className='icon'>
                            <span className='material-icons-sharp'>edit</span>
                        </div>
                        <div className='content'>
                            <div className='info'>
                                <h3>Workshop</h3>
                                <small className='text_muted'>08:00 AM - 12:00 PM</small>
                            </div>
                            <span className='material-icons-sharp'>more_vert</span>
                        </div>
                    </div>
                    <div className='notification add-reminder'>
                        <div>
                            <span className='material-icons-sharp'>add</span>
                            <h3>Add Reminder</h3>
                        </div>
                    </div>
                </div>
            </div>
            </>
            ) : null}
        </div>
    );
};

export default Dashboard;
