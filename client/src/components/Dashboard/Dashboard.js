import { useEffect, useState } from "react";
import "../../App";
import "./Dashboard.css";
import { BsFillArchiveFill, BsPeopleFill, BsGrid } from "react-icons/bs";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,PieChart, Pie, Cell, Legend,Bar,BarChart} from "recharts";
import { fetchAllUsers } from "../../api/UsersAPI";
import { fetchAllProducts } from "../../api/ProductsAPI";
import "../../App";
const COLORS = ["#4a8075", "#ef9025", "#6b9f00", "#6b9f00"];
function groupUsersByDate(users) {
    const countsPerDate = {};

    users.forEach((user) => {
      const date = user.registeredAt.slice(0, 10); //Take only the "YYYY-MM-DD" part
      countsPerDate[date] = (countsPerDate[date] || 0) + 1;
    });
    return Object.entries(countsPerDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); //sort by date
  }

function countUsersByRole(users){
    if(!Array.isArray(users))  return {};
    return users.reduce((acc,user)=>{
      acc[user.role]=(acc[user.role] || 0) + 1;
      return acc;
    }, {})
  }
 
// function createPriceBins(items,binSize=10){
//   const maxPrice= Math.max(...items.map(item => item.price));
//   const binsCOunt=Math.ceil(maxPrice/binSize);

//   const bins=Array.from({length: binsCOunt}, (_,i) => ({
//     range: `${i * binSize} - ${(i + 1) * binSize}`,
//     count: 0,
//   }));
//   items.forEach(item => {
//    const price=item.price || 0;
//    const binIndex=Math.min(Math.floor(price/binSize),binsCOunt - 1);
//    bins[binIndex].count++;
//   });
//   return bins;
// }

export default function Dashboard() {

  //define states
  const [usersCount, setUsersCount] = useState(0);
  const [registerDate, setRegisterDate] = useState([]);
  const [orders, setOrders] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  //const [itemsData, setItemsData] = useState([]);

  //fetch orderList from all users
useEffect(() => {
  fetchAllUsers().then((users) => {
    if (Array.isArray(users)) {
      const allOrders = users.flatMap(user => {
        //console.log(user.ordersList.length > 0 ? user : "no orders");
        return user.ordersList || [];
      
      });

      setOrders(allOrders);
      setUsersCount(users.length);
     // console.log(allOrders);
      const allDates = groupUsersByDate(users);
      setRegisterDate(allDates);

      const roleCounts = countUsersByRole(users);
      const chartData = Object.entries(roleCounts).map(([role, count]) => ({
        role,
        count,
      }));
      setRoleData(chartData);
    }
  });
}, []);

//fetch all products
useEffect(() => {
  fetchAllProducts().then((response) => {
    console.log(response);
    console.log(response.menu);
   
    const menu = response.menu;

    if (Array.isArray(menu)) {
      setCategoriesCount(menu.length);
      //console.log(menu.length);
      // const items = menu.flatMap(category => category.items);
      // setItemsCount(items.length);
    }
    
    // const totalItemsCount=menu.reduce((acc,category)=>{
    //   return acc+category.items.length
    // }, 0)
    // console.log(totalItemsCount);
    // setItemsCount(totalItemsCount);

    const allItems=menu.flatMap(category => category.items || []);
    setItemsCount(allItems.length);

  //   const chartData = allItems.map(item => ({
  //     name: item.name,
  //     count:item.availableCounter ?? 0 ,
  //   }
    
  // ));
// allItems.forEach(item => {
//   console.log(item.name, item.availableCounter);
// });
    //console.log(chartData);
   // setItemsData(chartData);

  });
}, []);


  //how many users registered on each date
  //returns a list sorted by date
 
  return (
    <div className="container">
    <div className="py-4 dashboardContainer" >
      <h2 className="pb-3">DASHBOARD</h2>
      <div className="row mb-4 ">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card text-white" style={{ backgroundColor: "#5d4037" }}>
            <div className="card-body">
              <div className="card-inner">
                <div className="card-title d-flex justify-content-between" >
                  <h3>Orders</h3>
                  <h3 className="card_icon ">
                    <BsFillArchiveFill />
                  </h3>
                </div>
                <p className="fs-2">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card text-white h-100" style={{ backgroundColor: "var(--secondary-color)"}}>
            <div className="card-body">
              <div className="card-inner">
                <div className="card-title d-flex justify-content-between">
                  <h3>Users</h3>
                  <h3 className="card_icon ">
                    <BsPeopleFill />
                  </h3>
                </div>
                <p className="fs-2">{usersCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card text-white h-100" style={{ backgroundColor: "#bdb5a7" }}>
            <div className="card-body">
              <div className="card-inner">
                <div className="card-title d-flex justify-content-between">
                  <h3>Menu Categories</h3>
                  <h3 className="card_icon ">
                    <BsGrid />
                  </h3>
                </div>
                <p className="fs-2">{categoriesCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card text-white h-100" style={{ backgroundColor: "#4a8075" }}>
            <div className="card-body">
              <div className="card-inner">
                <div className="card-title d-flex justify-content-between">
                  <h3>Menu Items</h3>
                  <h3 className="card_icon ">
                    <BsGrid />
                  </h3>
                </div>
                <p className="fs-2">{itemsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">

        <div className="col-12 col-md-8 col-lg-6 mb-4">
            <h3 className="pb-3 text-center graph-title">User Registrations Over Time</h3>
          <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={registerDate}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="count" stroke="#6b9f00" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>

         <div className="col-12 col-md-6">
          <h3 className="pb-3 text-center graph-title">Users by Role</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={roleData}
              dataKey="count"
              nameKey="role"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {roleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

         {/* <div className="col-12 col-md-6">
          <h3 className="pb-3 text-center">Available Items</h3>
           <BarChart data={itemsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
        </div> */}

      </div>
    
    </div>
    </div>
  );
}