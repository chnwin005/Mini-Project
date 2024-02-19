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
    const partyIds: { [key: string]: number } = {};
 
    for (const { party_id } of votes) {
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



  const getVotesByProvinceChartDataAndOptions = () => {
    const votesByProvince = getVotesByProvince();
    const provinces = Object.keys(votesByProvince);
    const votesData = Object.values(votesByProvince);
  
    // Define an array of colors for each province
    const provinceColors = [
      'rgba(75, 192, 192, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 0, 0, 1)',
      'rgba(0, 255, 0, 1)',
      'rgba(128, 0, 128, 1)',
      // Add more colors as needed
    ];
  
    const data = {
      labels: provinces,
      datasets: [
        {
          label: 'Votes by Province',
          data: votesData,
          backgroundColor: provinceColors, // Use the array of colors
          borderColor: provinceColors, // Use the array of colors
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return { data, options };
  };
  


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
      'rgba(255, 159, 64, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(0, 255, 0, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(128, 0, 128, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 0, 0, 1)',
      'rgba(255, 205, 86, 1)',
    ]; // Define your own color scheme or use Chart.js built-in color schemes
  
    const sharedColorMap = {}; // Shared color map for provinces
    uniqueProvinces.forEach((province, index) => {
      sharedColorMap[province] = colors[index % colors.length]; // Assign color to province
    });
  
    const data = {
      labels: partyList,
      datasets: uniqueProvinces.map((province) => ({
        label: province,
        data: parties.map((partyId) => getVotesByPartyAndProvince()[partyId][province] || 0),
        backgroundColor: parties.map((partyId) => sharedColorMap[province]), // Use color from shared color map
        borderColor: 'rgba(0, 0, 0, 1)',
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
            },
          },
        },
      },
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
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
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
    <div className="bg-[#F5F8FC]"> {/* Set background color for the entire page */}
      <div className="container mx-auto p-4"> {/* Added container class with padding */}
        <div className="flex flex-col items-center gap-4 pt-20 pb-30 flex-wrap">
          <div className="text-center my-0">
            <h2 className="text-3xl font-semibold"><u>Results</u></h2>
          </div>

          {/* Display Percentage of users voted and Total votes here */}
          <div className="text-center font-semibold italic">
            <h3 className="text-xl">
              Percentage of users voted:&nbsp;
              {
                // Calculate the percentage and round to two decimal places
                (Number((votes.length / voters.length * 100).toFixed(2)))
              } %
            </h3>
            <p className="text-xl">Total votes: {getTotalVotes()}</p>
          </div>

          {/* Display Votes by Party (Info and Graph) */}
          <section className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <section className="border shadow-lg rounded-lg p-4 w-full sm:w-[30rem] flex flex-col gap-1 justify-between">
              <h2 className="text-lg font-semibold"><u>Votes by Party</u></h2>
              {Object.entries(getVotesByParty()).map(([partyId, votes]) => (
                <p key={partyId}>{candidates[partyId]?.party}: {votes}</p>
              ))}
            </section>
            <div className="w-full sm:w-1/2">
              <Bar data={getBarChartDataAndOptions().data} options={getBarChartDataAndOptions().options}
                width={500} // Set your desired width
                height={300} // Set your desired height
              />
            </div>
          </section>

          {/* Display Votes by Province (Info and Graph) */}
          <section className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <section className="border shadow-lg rounded-lg p-4 w-full sm:w-[30rem] flex flex-col gap-1 justify-between">
              <h2 className="text-lg font-semibold"><u>Votes by Province</u></h2>
              {
                Object.entries(getVotesByProvince()).map(([province, votes]) => (
                  <p key={province}>{province}: {votes}</p>
                ))
              }
            </section>
            <div className="w-full sm:w-1/2">
              <Bar data={getVotesByProvinceChartDataAndOptions().data} options={getVotesByProvinceChartDataAndOptions().options}
                width={500} // Set your desired width
                height={300} // Set your desired height
              />
            </div>
          </section>

          {/* Display Votes by Party and Province (Info and Graph) */}
          <section className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <section className="border shadow-lg rounded-lg p-4 w-full sm:w-[30rem] flex flex-col gap-1 justify-between">
              <h2 className="text-lg font-semibold"><u>Votes by Party and Province</u></h2>
              {
                Object.entries(getVotesByPartyAndProvince()).map(([partyId, votesByProvince]) => (
                  <div key={partyId}>
                    <h3 className="font-semibold text-m">{candidates[partyId]?.party}:</h3>
                    {
                      Object.entries(votesByProvince).map(([province, votes]) => (
                        <p key={province}>{province}: {votes}</p>
                      ))
                    }
                  </div>
                ))
              }
            </section>
            <div className="w-full sm:w-1/2">
              <Bar data={getBarChartDataAndOptionsForStacked().data} options={getBarChartDataAndOptionsForStacked().options}
                width={500} // Set your desired width
                height={300} // Set your desired height
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );

}

export default Graphs;









