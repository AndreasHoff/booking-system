import React from 'react';

const AdminDashboard = () => {
  return (
    <div class='container'>
      <aside>
        <div class='toggle'>
          <div class='logo'>
            <img
              src='images/logo.png'
              alt=''
            />
            <h2>
              PFA<span class='danger'>Pension</span>
            </h2>
          </div>
          <div
            class='close'
            id='close-btn'
          >
            <span class='material-icons-sharp'>close</span>
          </div>
        </div>

        <div class='sidebar'>
          <a href='/admin-dashboard'>
            <span class='material-icons-sharp'>dashboard</span>
            <h3>Dashboard</h3>
          </a>
          <a href='/users'>
            <span class='material-icons-sharp'>person_outline</span>
            <h3>Users</h3>
          </a>
          <a href='/history'>
            <span class='material-icons-sharp'>receipt_long</span>
            <h3>History</h3>
          </a>
          <a
            href='/analytics'
            class='active'
          >
            <span class='material-icons-sharp'>insights</span>
            <h3>Analytics</h3>
          </a>
          <a href='/tickets'>
            <span class='material-icons-sharp'>mail_outline</span>
            <h3>Tickets</h3>
            <span class='message-count'>27</span>
          </a>
          <a href='/sales'>
            <span class='material-icons-sharp'>inventory</span>
            <h3>Sale List</h3>
          </a>
          <a href='/reports'>
            <span class='material-icons-sharp'>report_gmailerrorred</span>
            <h3>Reports</h3>
          </a>
          <a href='/settings'>
            <span class='material-icons-sharp'>settings</span>
            <h3>Settings</h3>
          </a>
          <a href='/new-login'>
            <span class='material-icons-sharp'>add</span>
            <h3>New Login</h3>
          </a>
          <a href='/logout'>
            <span class='material-icons-sharp'>logout</span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>

      <main>
        <h1>Analytics</h1>
        <div class='analyse'>
          <div class='sales'>
            <div class='status'>
              <div class='info'>
                <h3>Total Sale</h3>
                <h1>$53,424</h1>
              </div>
              <div class='progress'>
                <svg>
                  <circle
                    cx='38'
                    cy='38'
                    r='38'
                  ></circle>
                </svg>
                <div class='percentage'>
                  <p>+81%</p>
                </div>
              </div>
            </div>
          </div>
          <div class='visits'>
            <div class='status'>
              <div class='info'>
                <h3>Site Visits</h3>
                <h1>13,424</h1>
              </div>
              <div class='progress'>
                <svg>
                  <circle
                    cx='38'
                    cy='38'
                    r='38'
                  ></circle>
                </svg>
                <div class='percentage'>
                  <p>-48</p>
                </div>
              </div>
            </div>
          </div>
          <div class='searches'>
            <div class='status'>
              <div class='info'>
                <h3>Searches</h3>
                <h1>14,342</h1>
              </div>
              <div class='progress'>
                <svg>
                  <circle
                    cx='38'
                    cy='38'
                    r='38'
                  ></circle>
                </svg>
                <div class='percentage'>
                  <p>+24%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='new-users'>
          <h2>New Users</h2>
          <div class='user-list'>
            <div class='user'>
              <img
                src='images/profile-2.jpg'
                alt=''
              />
              <h2>Jacob</h2>
              <p>54 min ago</p>
            </div>
            <div class='user'>
              <img
                src='images/profile-1.jpg'
                alt=''
              />
              <h2>Benjamin</h2>
              <p>2 min ago</p>
            </div>
            <div class='user'>
              <img
                src='images/profile-3.jpg'
                alt=''
              />
              <h2>Sarah</h2>
              <p>3 hours ago</p>
            </div>
            <div class='user'>
              <img
                src='images/profile-4.jpg'
                alt=''
              />
              <h2>Josephine</h2>
              <p>55 min ago</p>
            </div>
            <div class='user'>
              <img
                src='images/plus.png'
                alt=''
              />
              <h2>More</h2>
              <p>New Users</p>
            </div>
          </div>
        </div>

        <div class='recent-orders'>
          <h2>Recent Orders</h2>
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

      <div class='right-section'>
        <div class='nav'>
          <button id='menu-btn'>
            <span class='material-icons-sharp'>menu</span>
          </button>
          <div class='dark-mode'>
            <span class='material-icons-sharp active'>light_mode</span>
            <span class='material-icons-sharp'>dark_mode</span>
          </div>

          <div class='profile'>
            <div class='info'>
              <p>
                Hey, <b>Reza</b>
              </p>
              <small class='text-muted'>Admin</small>
            </div>
            <div class='profile-photo'>
              <img
                src='../images/'
                alt=''
              />
            </div>
          </div>
        </div>

        <div class='user-profile'>
          <div class='logo'>
            <img
              src='/images/logo.png'
              alt=''
            />
            <h2>PFAPension</h2>
            <p>Fullstack Web Developer</p>
          </div>
        </div>

        <div class='reminders'>
          <div class='header'>
            <h2>Reminders</h2>
            <span class='material-icons-sharp'>notifications_none</span>
          </div>

          <div class='notification'>
            <div class='icon'>
              <span class='material-icons-sharp'>volume_up</span>
            </div>
            <div class='content'>
              <div class='info'>
                <h3>Workshop</h3>
                <small class='text_muted'>08:00 AM - 12:00 PM</small>
              </div>
              <span class='material-icons-sharp'>more_vert</span>
            </div>
          </div>
          <div class='notification deactive'>
            <div class='icon'>
              <span class='material-icons-sharp'>edit</span>
            </div>
            <div class='content'>
              <div class='info'>
                <h3>Workshop</h3>
                <small class='text_muted'>08:00 AM - 12:00 PM</small>
              </div>
              <span class='material-icons-sharp'>more_vert</span>
            </div>
          </div>
          <div class='notification add-reminder'>
            <div>
              <span class='material-icons-sharp'>add</span>
              <h3>Add Reminder</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;