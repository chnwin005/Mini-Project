
"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Confirmation from '@/components/modals/Confirmation';
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from 'next/navigation';
import useAuthentication from '@/hooks/useAuthentication';
import database from '@/util/database';
import { Vote } from '@/models/vote';
import { UUID } from 'crypto';
import { auth } from '@/util/firebase';
import { Voter } from '@/models/voter';
import { HOME_ROUTE } from '@/constants/routes';
import candidates from '@/constants/candidates';




// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");
  const [voter, setVoter] = useState<any>();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState('');
  const router = useRouter();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
       
        const userID = user.uid;
``
        const promisedVoter: Promise<Voter | undefined> = database.getVoter(userID);
 
        const allVotes = database.getVotes();
 
        allVotes.then((votes) => {
          votes.forEach((vote) => {
            if (vote.voter.user_id === userID) {
              // Perform your action here for the matching vote
              alert("You've already voted!")
              router.push("/");
            }
            // Add more code here if needed for non-matching votes
          });
        });
 
 
 
        promisedVoter.then((voter) => {
          if (voter) {
            setVoter(voter);
          }
        });
 
       
      }
    });
  }
  , []);

  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };
  // Define candidate data

  const handleSubmit = async () => {
    const selectedCandidateIndex = candidates.findIndex(candidate => candidate.id === checkedId);
    const thisVoter = voter;
    const vote: Vote = {
      // party id is a string
      party_id: candidates[selectedCandidateIndex].id,
      voter: thisVoter,
      // get random 6 digit
      vote_id: `v_${Math.floor(100000 + Math.random() * 900000)}`
    }

    try {
      await database.addVote(vote);
      console.log('Vote added: ', vote);
      alert('Succesfully');
      router.push(HOME_ROUTE);
    } catch (error) {
      console.error('Error adding vote: ', error);
    }
  }

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);


  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4 bg-[#F5F8FC] pt-10 pb-10 sm:pt-20 sm:pb-20">
      <h1 className="text-2xl font-bold mb-4 pt-8">Vote for your future leader</h1>

      {voter ? ( // Check if voter is found
        <div className="flex flex-col items-center">
          <p>
            Welcome, {voter.first_name} {voter.last_name} from {voter.province} province.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8 pt-10 pb-10">

            {/* Map over candidates and render Candidate components */}
            {candidates.map((candidate) => (
              <CandidateItem
                key={candidate.id}
                id={candidate.id}
                label={candidate.firstName}
                checked={checkedId === candidate.id}
                onChange={handleChange}
                candidate={candidate}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p> // Render loading message while waiting for voter to be found
      )}

      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} onSubmit={handleSubmit} />
      )}
    </div>
  )
}