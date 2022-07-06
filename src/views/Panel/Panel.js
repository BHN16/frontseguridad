import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { AES_Decrypt, hashPassword } from '../../utils/Encription';
import './Panel.css'

const GET_PASSWORD_URL = 'https://squid-app-4c5rx.ondigitalocean.app/creds/';
const PWD_1 = /^(?=.*[a-z])/;
const PWD_2 = /^(?=.*[A-Z])/;
const PWD_3 = /^(?=.*[0-9])/;
const PWD_4 = /^(?=.*[!@#$%])/;
const PWD_5 = /^.{8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const COLORS = ['#1b1b', '#D82148'];

function Panel () {

  let navigate = useNavigate();

  return (
    <div className='body-panel'>
      <PasswordSecurities navigate={navigate}/>
      <ChartExample/>
    </div>
  );
}

function ChartExample () {
  return (
    <div className='conteiner-card-chart'>
      <div className='card-chart'>
        <h2>Variables we check in strong password</h2>
        <div className='infoPassword'>
          <ul>
            <li>The password has a lowercase letter.</li>
            <li>The password has a capital letter.</li>
            <li>The password has a number.</li>
            <li>The password has special characters.</li>
            <li>The password has between 8 and 24 letters.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PasswordSecurities ({ navigate }) {
  const key = JSON.parse(window.localStorage.getItem('user-session')).password;
  const firstRender = useRef(true);
  const [myData, setMyData] = useState([
    { name: "Strong Passwords", value: 0 },
    { name: "Weak Passwords", value: 0 },
  ]);

  const [myDataChart, setMyDataChart] = useState([
    {
      name: '1',
      strength: 0,
    },
    {
      name: '2',
      strength: 0,
    },
    {
      name: '3',
      strength: 0,
    },
    {
      name: '4',
      strength: 0,
    },
    {
      name: '5',
      strength: 0,
    },
  ])

  useEffect(() => {
    if (firstRender.current) {
        firstRender.current = false;
        return;
    }
    getPasswords();
  }, []);

  const getPasswords = async (e) => {
    try {
        const response = await axios.get(GET_PASSWORD_URL,
            {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user-session')).token
                }
            });  
            getData(response.data);
    } catch(err) {
      if (!err?.response) {

      } else if (err.response?.status === 400) {
          console.log("bad request params");
      } else if (err.response?.status === 401) {
          window.localStorage.removeItem('user-session');
          let msg = 'Session expired';
          return navigate(`/${msg}`);
      } else {

      }
    }
  }

  const getData = async (e) => {
    let strong_pwd = 0;
    let weak_pwd = 0;
    let verifies = [0,0,0,0,0];
    e.map((item) => {
      let pwd = AES_Decrypt(item.bytes, key);
      const result = PWD_REGEX.test(pwd);
      const verify1 = PWD_1.test(pwd);
      const verify2 = PWD_2.test(pwd);
      const verify3 = PWD_3.test(pwd);
      const verify4 = PWD_4.test(pwd);
      const verify5 = PWD_5.test(pwd);
      if(result) strong_pwd++; else weak_pwd++;
      verifies[(verify1+verify2+verify3+verify4+verify5)-1]++;
    })
    setMyData([
      { name: "Strong Passwords", value: strong_pwd },
      { name: "Weak Passwords", value: weak_pwd },
    ])

    setMyDataChart([
    {
      name: '1',
      strength: verifies[0],
    },
    {
      name: '2',
      strength: verifies[1],
    },
    {
      name: '3',
      strength: verifies[2],
    },
    {
      name: '4',
      strength: verifies[3],
    },
    {
      name: '5',
      strength: verifies[4],
    },
  ])
  } 

  return (
    <div className='conteiner-card-chart'>
      <div className='card-chart'>
        <h2> Strong Passwords & Password Strength</h2>
        <div className='conteiner-chart'>
          <div className='dimension-chart'>
          <PieChart width={340} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={myData}
              outerRadius={100}
              label
            >
              {myData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              </Pie>
            <Tooltip />
          </PieChart>
          <ResponsiveContainer width={340} height={300}>
            <BarChart
              width={500}
              height={300}
              data={myDataChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="strength" fill="#1b1b" />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Panel;