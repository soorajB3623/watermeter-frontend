import React from 'react';
import { useEffect,useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Tile from '../components/Tile';
import url from '../axios/url';

const AdminHome = (props) => {

    //State variable
    const [consumerData,setConsumerData]=useState([]);
    const [token,setToken]=useState();
    const [search,setSearch]=useState(0);

    useEffect(()=>{
        setToken(localStorage.getItem("dataToken"));
        console.log(token);
       },[]);

    useEffect(()=>{
        if(token)
        {
         const data={
            role: "admin"
         }
          axios
            .get(url+"/munci/getAllConsumer", data,{
              headers: {
                Authorization: "Bearers " + token,
              },
            })
            .then((res) => {
                console.log(res)
              setConsumerData(res.data.consumer);
              console.log(consumerData);
            })
            .catch((err) => {
              console.log(err);
            });
  
  
        }
       
      },[token]);

      const searchSingle=()=>{
        const data={consumer:search}
        console.log(data.consumer)
        axios.post(url+'/munci/getSingleConsumer',data).then(res=>{
            setConsumerData(res.data.result);
            console.log(consumerData)
        })
        .catch(err=>{
            console.log(err)
        })
      }
   

    return(<div>
        <Header item1="Home" item2="" item3="" item4="Contact"/>

        <div class="flex items-center justify-center mt-20">
        <div class="flex border-2 rounded-full border-gray-400 px-3">
            <input type="number" class="px-5 py-1 w-80" placeholder="Search..."
            onChange={(event)=>{
                setSearch(event.target.value);}}/>
            <button class="flex items-center justify-center px-4" type='button' onClick={searchSingle}>
                <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
            </button>
        </div>
    </div>

    <div class="flex flex-col mx-10 my-10 py-20 px-10">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center bg-gray-300">
                <thead class="border-b-0">
                  <tr>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 border-r-4">
                      <h2 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">Co.no
                      </h2>
                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 border-r-4">
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">Consumer ID</h3>

             
                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 border-r-4">
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">Current Consumption</h3>

                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 border-r-4">
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">Current Reading</h3>

                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 border-r-4">
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">Cost</h3>

                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4">
                        <h3 class="border-1 rounded-full border-gray-900 py-2 px-2 bg-white">Last Updated At</h3>

                    </th>
                  </tr>
                </thead>
               
                    {consumerData.map(each=>(
                     <Tile key={each['id']}id={each['id']} consumerId={each['fk_consumerId']}  
                     currentConsumption={each['currentWaterConsumption']} reading={each['currentMonthlyPrice']}
                     currentPrice={each['currentMeterReading']} updatedAt={each['updatedAt']}/>
                    ))}
                
                
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default AdminHome
