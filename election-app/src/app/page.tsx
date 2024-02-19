"use client";

import React, { use } from 'react'

import { useState, useEffect } from "react";

import database from "@/util/database";
import { Vote } from "@/models/vote";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Voter } from '@/models/voter';
import candidates from '@/constants/candidates';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graphs = () => {

    const [votes, setVotes] = useState<Vote[]>([]);
    const [voters, setVoters] = useState<Voter[]>([]);

    useEffect(() => {
        fetchVotes();
        fetchVoters();
    }, []);

    async function fetchVotes() {
        const votes = await database.getVotes();
        setVotes(votes);
    }

    async function fetchVoters() {
        const voters = await database.getVoters();
        setVoters(voters)
    }

    const getTotalVotes = () => {
        return votes.length;
    }

    const getVotesByParty = () => {
        const partyIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
        for (const { party_id } of votes) { // Access 'votes' state variable
            partyIds[party_id] = (partyIds[party_id] || 0) + 1;
        }
        return partyIds; // Return the calculated result
    }






    const getPercentageOfVotesByParty = () => {
        const totalVotes = getTotalVotes();
        const votesByParty = getVotesByParty();
        const percentageByParty: { [key: string]: number } = {};

        for (const partyId in votesByParty) {
            percentageByParty[partyId] = (votesByParty[partyId] / totalVotes) * 100;
        }

        return percentageByParty;
    }








    const getVotesByProvince = () => {
        const provinceIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
        for (const { voter } of votes) { // Access 'votes' state variable
            provinceIds[voter.province] = (provinceIds[voter.province] || 0) + 1;
        }
        return provinceIds; // Return the calculated result
    }

    const getVotesByPartyAndProvince = () => {
        const partyAndProvinceIds: { [key: string]: { [key: string]: number } } = {}; // Add index signature to allow indexing with a string
        for (const { party_id, voter } of votes) { // Access 'votes' state variable
            partyAndProvinceIds[party_id] = partyAndProvinceIds[party_id] || {};
            partyAndProvinceIds[party_id][voter.province] = (partyAndProvinceIds[party_id][voter.province] || 0) + 1;
        }
        return partyAndProvinceIds; // Return the calculated result
    }

    const getBarChartDataAndOptionsForStacked = () => {
        const parties = Object.keys(getVotesByPartyAndProvince());
        const partyList = parties.map(index => candidates[index]?.party);
        const provinces = new Set(); // Using a set to collect unique provinces
        parties.forEach((partyId) => {
          Object.keys(getVotesByPartyAndProvince()[partyId]).forEach((province) => {
            provinces.add(province); // Add province to set
          });
        });
        const uniqueProvinces = Array.from(provinces); // Convert set to array
        const colors = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ]; // Define your own color scheme or use Chart.js built-in color schemes
     
        const colorMap = {}; // Map to store colors for each province
        uniqueProvinces.forEach((province, index) => {
          colorMap[province] = colors[index % colors.length]; // Assign color to province
        });
       
     
       
     
        const data = {
          labels: partyList,
          datasets: uniqueProvinces.map((province) => ({
            label: province,
            data: parties.map((partyId) => getVotesByPartyAndProvince()[partyId][province] || 0), // Fill in 0 for parties with no presence in the province
            backgroundColor: parties.map((partyId) => colorMap[province]), // Use color from color map
            borderColor: 'rgba(0, 0, 0, 1)', // Border color for bars
            borderWidth: 1,
          })),
        };
     
        const options = {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const totalVotes = getTotalVotes();
                  const dataIndex = context.dataIndex;
                  const value = context.dataset.data[dataIndex];
                  const percentage = ((value / totalVotes) * 100).toFixed(2);
                  return `${context.dataset.label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        };
     
        return { data, options };
      };
     
     
      const getBarChartDataAndOptions = () => {
        const parties = Object.keys(getVotesByParty());
        const partyList = parties.map(index => candidates[index]?.party);
        console.log(partyList);
     
        const data = {
          labels: partyList,
          datasets: [
            {
              label: 'Votes by Party',
              data: Object.values(getVotesByParty()),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
     
        const options = {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const totalVotes = getTotalVotes();
                  const dataIndex = context.dataIndex;
                  const value = context.dataset.data[dataIndex];
                  const percentage = ((value / totalVotes) * 100).toFixed(2);
                  return `${context.dataset.label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        };
     
        return { data, options };
      }
    


    return (
        <div className="flex flex-col items-center gap-4 bg-[#F5F8FC] pt-40 pb-40 flex-wrap">
            <div className='flex flex-row'>
                <div className="w-1/2 mr-4">
                    <section className='flex flex-row gap-10'>
                        <section className='border shadow-lg rounded-lg p-4 w-[20rem] flex flex-col gap-1  justify-between '>
                            <h2 className="text-lg font-semibold"><u>Results</u></h2>
                            <h3>
                                Percentage of users voted:
                                {
                                    // Calculate the percentage and round to two decimal places
                                    (Number((votes.length / voters.length * 100).toFixed(2)))
                                } %
                            </h3>
                            <p className="font-semibold italic">Total votes: {getTotalVotes()}</p>
                            <h2 className="font-semibold text-m">Votes by Party</h2>
                            {
                                Object.entries(getVotesByParty()).map(([partyId, votes]) => (
                                    <p key={partyId}>Party {partyId}: {votes}</p>
                                ))
                            }
                        </section>
                        <p><br></br></p>
                        <section className='border shadow-lg rounded-lg p-4 w-[20rem] flex flex-col gap-1  justify-between'>
                            <h2 className="text-lg font-semibold"><u>Votes by Province</u></h2>
                            {
                                Object.entries(getVotesByProvince()).map(([province, votes]) => (
                                    <p key={province}>{province}: {votes}</p>
                                ))
                            }
                        </section>
                    </section>
                    <p><br></br></p>
                    <section className='flex flex-row gap-10'>
                        <section className='border shadow-lg rounded-lg p-4 w-[20rem] h-[20rem] flex flex-col gap-1  justify-between'>
                            <h2 className="text-lg font-semibold"><u>Votes by Party (Percentage)</u></h2>
                            {
                                Object.entries(getPercentageOfVotesByParty()).map(([partyId, percentage]) => (
                                    <p key={partyId}>Party {partyId}: {percentage.toFixed(2)}%</p>
                                ))
                            }
                        </section>
                        <p><br></br></p>
                        <section className='border shadow-lg rounded-lg p-4 w-[20rem] flex flex-col gap-1  justify-between '>
                            <h2 className="text-lg font-semibold"><u>Votes by Party and Province</u></h2>
                            {
                                Object.entries(getVotesByPartyAndProvince()).map(([partyId, votesByProvince]) => (
                                    <div key={partyId}>
                                        <h3 className="font-semibold text-m">Party {partyId}:</h3>
                                        {
                                            Object.entries(votesByProvince).map(([province, votes]) => (
                                                <p key={province}>{province}: {votes}</p>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </section>
                    </section>
                </div>
                <div className="w-1/2">
                    <Bar data={getBarChartDataAndOptions().data} options={getBarChartDataAndOptions().options} />
                    <Bar data={getBarChartDataAndOptionsForStacked().data} options={getBarChartDataAndOptionsForStacked().options} />
                </div>
            </div>
        </div>
    );
}

export default Graphs






//     return (
//         <div style={{ paddingTop: '100px' }}> {/* Adjust the padding value as needed */}
//             <h2>Results</h2>

//             <p>Total votes: {getTotalVotes()}</p>
//             <h2>Results by Party</h2>
//             {
//                 Object.entries(getVotesByParty()).map(([partyId, votes]) => (
//                     <p key={partyId}>Party {partyId}: {votes}</p>
//                 ))
//             }
//             <h2>Results by Province</h2>
//             {
//                 Object.entries(getVotesByProvince()).map(([province, votes]) => (
//                     <p key={province}>{province}: {votes}</p>
//                 ))
//             }


//             <h2>Results by Party (Percentage)</h2>
//             {
//                 Object.entries(getPercentageOfVotesByParty()).map(([partyId, percentage]) => (
//                     <p key={partyId}>Party {partyId}: {percentage.toFixed(2)}%</p>
//                 ))
//             }





//             <Bar data={getBarChartDataAndOptions().data} options={getBarChartDataAndOptions().options} />

//             <h2>Results by Party and Province</h2>
//             {
//                 Object.entries(getVotesByPartyAndProvince()).map(([partyId, votesByProvince]) => (
//                     <div key={partyId}>
//                         <h3>Party {partyId}</h3>
//                         {
//                             Object.entries(votesByProvince).map(([province, votes]) => (
//                                 <p key={province}>{province}: {votes}</p>
//                             ))
//                         }
//                     </div>
//                 ))
//             }

//             <Bar data={getBarChartDataAndOptionsForStacked().data} options={getBarChartDataAndOptionsForStacked().options} />
//         </div>
//     )
// }

// export default Graphs

