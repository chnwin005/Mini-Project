"use client";
import { AuthContext } from "@/provider/AuthProvider";
import { useState, useEffect } from "react";
import database from "@/util/database";

const BallotPage = () => {
  const { user }: any = AuthContext();
  // get all voters
  const [voters, setVoters] = useState([]);

  const fetchVoters = async () => {
    const voters = await database.getVoters();
    setVoters(voters);
  };

  useEffect(() => {
    fetchVoters();
  }, []);







  const userInfo = user.user;

  return (
    <div>
      {userInfo?.email}

      <h1> All Voters </h1>

      <ul>
        {voters.map((voter: any) => (
          <li key={voter.email}>{voter.email}</li>
        ))}
      </ul>
      
    </div>


  )
}

export default BallotPage