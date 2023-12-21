import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                console.log('user not logged in')
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
                    <a href='/dashboard'>
                        <span className='material-icons-sharp'>dashboard</span>
                        <h3>Dashboard</h3>
                    </a>
                    <a href='/users'>
                        <span className='material-icons-sharp'>person_outline</span>
                        <h3>Users</h3>
                    </a>
                    <a href='/history'>
                        <span className='material-icons-sharp'>receipt_long</span>
                        <h3>History</h3>
                    </a>
                    <a
                        href='/analytics'
                        className='active'
                    >
                        <span className='material-icons-sharp'>insights</span>
                        <h3>Analytics</h3>
                    </a>
                    <a href='/tickets'>
                        <span className='material-icons-sharp'>mail_outline</span>
                        <h3>Tickets</h3>
                        <span className='message-count'>27</span>
                    </a>
                    <Link to="/bookings">
                        <span className='material-icons-sharp'>inventory</span>
                        <h3>Bookings</h3>
                    </Link>
                    <a href='/reports'>
                        <span className='material-icons-sharp'>report_gmailerrorred</span>
                        <h3>Reports</h3>
                    </a>
                    <a href='/settings'>
                        <span className='material-icons-sharp'>settings</span>
                        <h3>Settings</h3>
                    </a>
                    <a href='/new-login'>
                        <span className='material-icons-sharp'>add</span>
                        <h3>New Login</h3>
                    </a>
                    <a href='/logout'>
                        <span className='material-icons-sharp'>logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
                </aside>

            <main>
                <h1>Analytics</h1>
                <div className='analyse'>
                    <div className='sales'>
                        <div className='status'>
                            <div className='info'>
                                <h3>Total Bookings</h3>
                                <h1>111</h1>
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

                <div className='new-users'>
                    <h2>New Users</h2>
                    <div className='user-list'>
                        <div className='user'>
                            <img
                                src='/images/profile-2.jpg'
                                alt=''
                            />
                            <h2>Jacob</h2>
                            <p>54 min ago</p>
                        </div>
                        <div className='user'>
                            <img
                                src='/images/profile-1.jpg'
                                alt=''
                            />
                            <h2>Benjamin</h2>
                            <p>2 min ago</p>
                        </div>
                        <div className='user'>
                            <img
                                src='/images/profile-3.jpg'
                                alt=''
                            />
                            <h2>Sarah</h2>
                            <p>3 hours ago</p>
                        </div>
                        <div className='user'>
                            <img
                                src='/images/profile-4.jpg'
                                alt=''
                            />
                            <h2>Josephine</h2>
                            <p>55 min ago</p>
                        </div>
                        <div className='user'>
                            <img
                                src='/images/plus.png'
                                alt=''
                            />
                            <h2>More</h2>
                            <p>New Users</p>
                        </div>
                    </div>
                </div>

                <div className='recent-orders'>
                    <h2>Recent Bookings</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Number</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <a href='/show-all'>Show all</a>
                </div>
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
