import React from "react";



function Help() {

    return(
        <div className='body-panel'>
            <HelpExample/>
        </div>
    )
}

function HelpExample () {
    return (
      <div className='conteiner-card-chart'>
        <div className='card-chart'>
          <h2>How To Create Secure Passwords</h2>
          <div className='infoPassword'>
            <h4>The best practices for creating secure passwords are:</h4>
            <ul>
              <li>A password should be 16 characters or more; our password-related research has found that 45 percent of Americans use passwords of eight characters or less, which are not as secure as longer passwords.</li>
              <li>A password should include a combination of letters, numbers, and characters.</li>
              <li>A password shouldn't be shared with any other account.</li>
              <li>A password shouldn't include any of the user's personal information like their address or phone number. It's also best not to include any information that can be accessed on social media like kids' or pets' names.</li>
              <li>A password shouldn't contain any consecutive letters or numbers.</li>
              <li>A password shouldn't be the word “password” or the same letter or number repeated.</li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Help;